using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Punchcard.Core.Server.AutoMapperConfiguration;
using Punchcard.Core.Server.DataModel;
using Punchcard.Core.Server.ServiceInterface.PunchcardCore;
using ServiceStack;
using System;
using System.Linq;
using Microsoft.Identity.Web;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Punchcard.Core.Server
{
	public class Startup
	{
		public IConfiguration Configuration { get; }

		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		// This method gets called by the runtime. Use this method to add services to the container.
		// For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
				.AddMicrosoftIdentityWebApi(Configuration, "AzureAdB2C", subscribeToJwtBearerMiddlewareDiagnosticsEvents: true);

			services.AddControllers();

			services.AddLazyCache();

			services.AddApplicationInsightsTelemetry();


			//Add DbContext for use in web services.
			var connectionStrings = new ConnectionString();
			Configuration.GetSection("ConnectionStrings").Bind(connectionStrings);
			services.AddDbContext<DatabaseContext>(options => options.UseSqlServer(connectionStrings.SqlConnection));  //"name=ConnectionStrings:DefaultConnection"));
																													   //Add DbContactFactory for use in Caching and Auth services.
			services.AddDbContextFactory<DatabaseContext>(o => o.UseSqlServer(connectionStrings.SqlConnection), ServiceLifetime.Scoped);
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory, DatabaseContext dbContext)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
				Microsoft.IdentityModel.Logging.IdentityModelEventSource.ShowPII = true;

				//while in our local dev env we run the db migrations on app startup.
				var pendingMigrations = dbContext.Database.GetPendingMigrations();
				if (pendingMigrations.Count() > 0)
				{
					var pendingStr = pendingMigrations.Aggregate((sum, next) => sum += $", {next}");
					Console.WriteLine($"Applying Db migrations: {pendingStr}");
				}
				dbContext.Database.Migrate();
			}
			else
			{
				app.UseHsts();
				app.UseHttpsRedirection();
			}

			AutoMapperConfig.Configure();

			app.UseRouting();

			app.UseAuthentication();
			app.UseAuthorization();

			app.UseDefaultFiles();
			app.UseStaticFiles();

			app.UseServiceStack(new AppHost(Configuration)
			{
				AppSettings = new NetCoreAppSettings(Configuration)
			});
			app.UseSpa(spa =>
			{
				spa.Options.SourcePath = "wwwroot";
			});
		}
	}
}
