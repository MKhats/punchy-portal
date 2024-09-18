using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using Punchcard.Core.Server.ServiceInterface.Auth;
using Punchcard.Core.Server.ServiceInterface.PunchcardCore;
using Punchcard.Core.Server.ServiceModel;
using ServiceStack;
using ServiceStack.Messaging;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Punchcard.Core.Server.ServiceInterface
{
	public class AppSettingService : Service
	{
		private readonly ILogger<AppSettingService> _logger;
		private readonly AppSettings _appSettings;
		private readonly AzureAdB2CSettings _B2CSettings;

		public AppSettingService(ILogger<AppSettingService> log, AppSettings appSettings, AzureAdB2CSettings b2CSettings)
		{
			_logger = log;
			_appSettings = appSettings;
			_B2CSettings = b2CSettings;
		}

		public object Get(SettingsRequest request)
		{
			var payload = new Dictionary<string, object>();
			payload.Add("AllowUserPasswordChange", _appSettings.Authorization.AllowUserPasswordChange);
			payload.Add("version", "4.0.0");

			return payload.ToJson();
		}
		public WebSettings Get(WebSettingsRequest request)
		{
			var settings = new WebSettings
			{
				B2CClientId = _B2CSettings.ClientId,
				B2CSignInPolicyURL = _B2CSettings.SignInPolicyURL + _B2CSettings.SignUpSignInPolicyId,
				B2CKnownAuthorities = _B2CSettings.KnownAuthorities,
				B2CApiScopes = _B2CSettings.Scopes,
				AllowUserPasswordChange = _appSettings.Authorization.AllowUserPasswordChange,
			};
			return settings;
		}

		public MobileSettings Get(MobileSettingsRequest request)
		{
			return new MobileSettings
			{
				B2CAuthCallBack = _B2CSettings.MobileCallbackPath,
				B2CBaseUrl = _B2CSettings.Domain,
				B2CClientId = _B2CSettings.ClientId,
				B2CSignInFlow = _B2CSettings.SignUpSignInPolicyId,
				B2CTenantName = _B2CSettings.TenantName,
				B2CApiScopes = _B2CSettings.Scopes,
				AllowUserPasswordChange = _appSettings.Authorization.AllowUserPasswordChange,
			};
		}

		public async Task<MessageDTO> Get(SecureSettingsRequest request)
		{
			return new MessageDTO
			{
				Message = GetHelloAuthMessage()
			};
		}
		[Authenticate()]
		public string Any(ServiceStackAuthenticateSecureSettingsRequest request)
		{
			return GetHelloAuthMessage();
		}

		[Authorize()]
		public string Any(NetCoreAuthorizeSecureSettingsRequest request)
		{
			return GetHelloAuthMessage();
		}
		[RequiresAnyRole("Customer")]
		public string Get(HelloAuthCustomerRequest request)
		{
			return GetHelloAuthMessage();
		}

		[RequiresAnyPermission("nonexistant")]
		public string Get(HelloAuthAdminRequest request)
		{
			return GetHelloAuthMessage();
		}

		private string GetHelloAuthMessage()
		{
			var session = this.GetSession();
			return $"Hello, {session.DisplayName}. This is a secure channel. Your AuthId is {session.UserAuthId}.";
		}
	}

	public class MessageDTO
	{
		public string Message { get; set; }
	}
}
