using Funq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Punchcard.Core.Auth;
using Punchcard.Core.Auth.Interface;
using Punchcard.Core.Notification.Interface;
using Punchcard.Core.Notification.SendGrid;
using Punchcard.Core.Server.Auth;
using Punchcard.Core.Server.DataModel;
using Punchcard.Core.Server.ServiceInterface;
using Punchcard.Core.Server.ServiceInterface.Auth;
using Punchcard.Core.Server.ServiceInterface.PunchcardCore;
using ServiceStack;
using ServiceStack.Api.Swagger;
using ServiceStack.Auth;
using ServiceStack.Caching;
using ServiceStack.Text;
using ServiceStack.Web;
using System;
using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;

namespace Punchcard.Core.Server
{
	public class AppHost : AppHostBase
	{
		private IConfiguration Configuration { get; set; }

		public AppHost(IConfiguration config) : base("servicestack.web", typeof(AppSettingService).Assembly)
		{
			Configuration = config;
		}

		public override void Configure(Container container)
		{
			var isDev = HostingEnvironment.IsDevelopment();
			//get configuration sections
			var appSettings = new AppSettings();
			Configuration.GetSection("AppSettings").Bind(appSettings);
			container.Register(appSettings);

			var connectionStrings = new ConnectionString();
			Configuration.GetSection("ConnectionStrings").Bind(connectionStrings);

			var b2cSettings = new AzureAdB2CSettings();
			Configuration.GetSection("AzureAdB2C").Bind(b2cSettings);
			container.Register(b2cSettings);

			var mobileNotificationSettings = new MobileNotificationSettings();
			Configuration.GetSection("MobileNotifications").Bind(mobileNotificationSettings);
			container.Register(mobileNotificationSettings);

			var feedbackSettings = new FeedbackSetting();
			Configuration.GetSection("FeedbackSetting").Bind(feedbackSettings);
			container.Register(feedbackSettings);

			var azureAdB2CGraphApiSettings = new AzureAdB2CGraphApiSettings();
			Configuration.GetSection("AzureAdB2CGraphApi").Bind(azureAdB2CGraphApiSettings);


			var b2cAuthProvider = new B2CAuthStore(azureAdB2CGraphApiSettings);
			container.Register<IAuthStore>(b2cAuthProvider);

			var sgSettings = new SendGridSettings();
			Configuration.GetSection(SendGridSettings.AppSettingsKey).Bind(sgSettings);
			container.Register(sgSettings);

			var notificationService = new SendGridNotificationService(sgSettings.APIKey);
			container.Register<INotificationService>(notificationService);

			var features = new Features();
			Configuration.GetSection("Features").Bind(features);
			container.Register<Features>(features);

			//change service stack to host under /api
			SetConfig(new HostConfig { HandlerFactoryPath = "api" });

			
			Plugins.Add(new CorsFeature(allowCredentials: true, allowedHeaders: "Content-Type, Allow, Authorization"));
			Plugins.Add(new PostmanFeature());

			Plugins.Add(new SwaggerFeature());

			Plugins.Add(new AuthFeature(() => new AuthUserSession(),
			new IAuthProvider[]
			{
					new B2CAuthProvider(azureAdB2CGraphApiSettings, appSettings.Authorization) {},
			})
			{
				HtmlRedirect = "/",
				IncludeRegistrationService = false,
			});

			SetupDefaultUserAsync(b2cAuthProvider, appSettings, sgSettings).GetResult();

			container.Register<ICacheClient>(new MemoryCacheClient());
			var cache = container.Resolve<ICacheClient>();
			JsConfig.AssumeUtc = true;
			JsConfig.DateHandler = DateHandler.ISO8601;

			// If you need to cache anything from the database do it here
			// Make sure you have a cache invalidation strategy
			_ = PickListHelper.GetPickListItemsAsync();
			RolePermissionCache.InvalidateCacheAndRegenerate();
			
			GlobalRequestFiltersAsync.Add(async (req, res, requestDto) =>
			{
				if (IsAuthRequired(((HttpRequest)req.OriginalRequest).HttpContext, isDev))
				{
					var userIdentity = ((HttpRequest)req.OriginalRequest).HttpContext.User.Identity;
					if (userIdentity is { IsAuthenticated: false })
					{
						//not authenticated and should be end request with a 401
						res.StatusCode = 401;
						res.StatusDescription = "You must be authenticated first";
						res.EndRequest();
					}
				}
			});
			
		}
		
		private async Task SetupDefaultUserAsync(IAuthStore authProvider, AppSettings appSettings, SendGridSettings sendGridSettings)
		{
			if (!appSettings.Authorization.CreatePunchcardDeveloperAsGlobalAdmin) return;

			var dbfactory = HostContext.TryResolve<IDbContextFactory<DatabaseContext>>();
			await using var Db = await dbfactory.CreateDbContextAsync();
			var us = new UserService(authProvider, null, appSettings, sendGridSettings, Db);

			if (us.GetUserByEmailAsync("developer@punchcard.io").Result != null)
				return;

			var defaultTenant = new Tenant { Name = "Default Tenant", IsActive = true };
			var createdTenantId = await us.AddDefaultTenant(defaultTenant);

			var defaultAdminUser = new PunchcardUser { IsActive = true, Email = "developer@punchcard.io", FirstName = "Punchcard", LastName = "Admin", TenantId = createdTenantId, AzureObjectId = "" };
			Db.Add(defaultAdminUser);
			Db.Add(new PunchcardUserXrefRole { RoleId = 1, User = defaultAdminUser });
			await Db.SaveChangesAsync();

			await us.AddUserToAuthStoreAsync(defaultAdminUser, "punchP@ss1");
		}
		private static bool IsAuthRequired(HttpContext context, bool isDev)
		{
			//auth is required if we are not authenticated and are trying to hit a protected resource.
			//rather than list protected resources we list anon resources so anything else is protected by default.
			if (context.User.Identity.IsAuthenticated == true)
			{
				//aleady authenticated
				return false;
			}
			if (
				IsPathAnonApi(context.Request.Path.Value)
				|| IsPathRequiredToLogin(context.Request.Path.Value)
				|| context.Request.Method == Microsoft.AspNetCore.Http.HttpMethods.Options
				)
			{
				return false;
			}
			else if (IsPathForClientSite(context.Request.Path.Value, isDev))
			{
				return false;
			}

			return true;
		}

		private static bool IsPathRequiredToLogin(string path)
		{
			return path.Contains(".auth")
				|| path.Contains("/AzureADB2C");
		}

		private static bool IsPathAnonApi(string path)
		{
			return path.Contains("/api/webhooks")
				   || path.Contains("/api/anon")
				   || path.Contains("/api/types")
				   || path.Contains("/api/auth");
		}

		private static bool IsPathForClientSite(string path, bool isDev)
		{
			return (!isDev && path == "/")
				|| path.StartsWith("/static/")
				|| path == "/manifest.json"
				|| path.StartsWith("/favico");
		}
	}
}
