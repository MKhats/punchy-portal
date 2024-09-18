using Punchcard.Core.Auth;
using Punchcard.Core.Server.DataModel;
using Punchcard.Core.Server.ServiceInterface.PunchcardCore;
using ServiceStack;
using ServiceStack.Auth;
using Microsoft.EntityFrameworkCore;
using ServiceStack.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace Punchcard.Core.Server.Auth
{
	public class B2CAuthProvider : AuthProvider, IAuthWithRequest
	{
		public static string Name = nameof(B2CAuthProvider);

		private readonly AzureAdB2CGraphApiSettings _authSettings;
		private readonly ServiceInterface.PunchcardCore.Authorization _authorizationSettings;

		public B2CAuthProvider()
		{
			Provider = Name;
		}

		public B2CAuthProvider(AzureAdB2CGraphApiSettings authSettings, ServiceInterface.PunchcardCore.Authorization authorizationSettings)
			: this()
		{
			_authSettings = authSettings;
			_authorizationSettings = authorizationSettings;
		}

		public override bool IsAuthorized(IAuthSession session, IAuthTokens tokens, Authenticate request = null)
		{
			return session != null && session.IsAuthenticated;
		}

		public object Authenticate(IServiceBase authService, IAuthSession session, Authenticate request)
		{
			throw new NotImplementedException("Authenticate() should not be called directly"); // TODO: test and fix
		}

		public async Task PreAuthenticateAsync(IRequest request, IResponse response)
		{
			if (request.OriginalRequest == null || !((Microsoft.AspNetCore.Http.HttpRequest)request.OriginalRequest).HttpContext.User.Identity.IsAuthenticated)
			{
				//throw new HttpError(HttpStatusCode.Unauthorized, "You need to be logged in!");
				response.StatusCode = (int)HttpStatusCode.Forbidden;
				response.StatusDescription = ErrorMessages.InvalidRole.Localize(request);
				response.EndRequest();
				return;
			}

			var claims = ((Microsoft.AspNetCore.Http.HttpRequest)request.OriginalRequest).HttpContext.User.Claims.ToList();

			var sub = claims.Single(x => x.Type == ClaimTypes.NameIdentifier).Value;
			var session = await request.GetCacheClientAsync().GetAsync<IAuthSession>(sub);

			if (session == null)
			{
				try
				{
					session = await CreateNewCustomUserSessionAsync(claims, sub);
				}
				catch(AuthenticationException ex)
				{
					response.WriteErrorToResponse(request, "", "", ex.Message, null, 401).GetResult();
					response.End();
					return;
				}
			}
			else
			{
				session = HostContext.AppHost.OnSessionFilter(request, session, session.Id);
			}

			request.Items[Keywords.Session] = session;

			//markZ: I don't know why the following 3 lines exist but it worked before....
			SessionFeature.AddSessionIdToRequestFilter(request, response, null); //Required to get req.GetSessionId()
			var newSession = request.GetSession();
			request.GetCacheClient().Set(sub, newSession, new TimeSpan(1, 0, 0));
		}

		private async Task<CustomAuthUserSession> CreateNewCustomUserSessionAsync(List<System.Security.Claims.Claim> claims, string sub)
		{
			var email = "";
			var emailClaim = claims.SingleOrDefault(x => x.Type == CustomClaimTypes.Emails);
			if (emailClaim != null)
			{
				email = emailClaim.Value;
			}

			var name = "";
			var nameClaim = claims.SingleOrDefault(x => x.Type == CustomClaimTypes.Name);
			if (nameClaim != null)
			{
				name = nameClaim.Value;
			}
			
			var claim = claims.SingleOrDefault(x => x.Type == ClaimTypes.GivenName);
			var firstName = claim == null ? "" : claim.Value;

			claim = claims.SingleOrDefault(x => x.Type == ClaimTypes.Surname);
			var lastName = claim == null ? "" : claim.Value;


			PunchcardUser dbUser = await GetDbUserAsync(sub, email, firstName, lastName);
			if(dbUser == null)
			{
				throw new AuthenticationException("unknown user");
			}

			var tenantId = dbUser.TenantId ?? -1;

			// Get Permissions from roles
			var permissions = new List<string>();
			var roleIds = await RolePermissionCache.GetRoleIdsAsync(sub);
			if (roleIds != null)
			{
				try
				{
					permissions = await RolePermissionCache.GetPermissionsFromCacheAsync(sub);
				}
				catch
				{
					permissions = new List<string>();
				}
			}

			return new CustomAuthUserSession
			{
				UserAuthId = sub,
				Id = sub,
				UserName = name,
				Email = email,
				Roles = roleIds.Select(r => r.ToString()).ToList(),
				IsAuthenticated = true,
				TenantId = tenantId,
				Permissions = permissions,
				FirstName = firstName,
				LastName = lastName,
				CreatedAt = DateTime.Now,
				LastModified = DateTime.Now
			};
		}

		private async Task<PunchcardUser> GetDbUserAsync(string sub, string email, string firstName, string lastName)
		{
			PunchcardUser dbUser;
				var dbfactory = HostContext.TryResolve<IDbContextFactory<DatabaseContext>>();
			using (var Db = await dbfactory.CreateDbContextAsync())
			{
				dbUser = await Db.PunchcardUsers.SingleOrDefaultAsync(u => u.AzureObjectId == sub);

				if (dbUser == null && _authorizationSettings.RegisterUnknownUsers)
				{
					dbUser = new PunchcardUser
					{
						AzureObjectId = sub,
						Email = email,
						FirstName = firstName,
						LastName = lastName,
						IsActive = true,
						TenantId = _authorizationSettings.UnknownUserTenantId
					};
					Db.PunchcardUsers.Add(dbUser);
					await Db.SaveChangesAsync();
				}
			}

			return dbUser;
		}

		public override Task<object> AuthenticateAsync(IServiceBase authService, IAuthSession session, Authenticate request, CancellationToken token = default)
		{
			throw new NotImplementedException();
		}

	}
}