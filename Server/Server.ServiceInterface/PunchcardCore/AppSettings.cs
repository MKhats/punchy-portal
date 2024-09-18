
using System.ComponentModel;

namespace Punchcard.Core.Server.ServiceInterface.PunchcardCore
{
	public class ConnectionString
	{
		public string SqlConnection { get; set; } = "none";
	}

	public class AppSettings
	{
		public string[] AllowedOrigins { get; set; }
		public bool UseInMemorySql { get; set; }
		public string ServiceStackLicenseKey { get; set; }

		public string SendGridAPIKey { get; set; }
		public string BaseURL { get; set; }
		public string EmailNotificationOverride { get; set; }
		public string MailerSendFrom { get; set; }
		public string AzureWebhookSecret { get; set; }

		public string AzureStorageConnectionString { get; set; }

		public Authorization Authorization { get; set; }
		public string RedactionText { get; set; }
		public string BiddersExportEmail { get; set; }
	}
	
	public class WebSettings
	{
		public string B2CClientId { get; set; }
		public string B2CSignInPolicyURL { get; set; }
		public string[] B2CKnownAuthorities { get; set; }
		public string[] B2CApiScopes { get; set; }
		public bool AllowUserPasswordChange { get; set; }

	}
	public class Authorization
	{
		[Description("GlobalAdminRoleName has permission to perform all actions on all tenants")]
		public string GlobalAdminRoleName { get; set; }
		[Description("Not fully baked yet")]
		public bool SendPasswordToNewUser { get; set; }
		[Description("This doesn't work well in current version of AzureB2C, we will force a password reset instead")]
		public bool ForceChangePasswordNextLogin { get; set; }

		[Description("If true will create developer@punchcard.io as a global admin")]
		public bool CreatePunchcardDeveloperAsGlobalAdmin { get; set; }
		[Description("Unknown users who login will be registered in the database")]
		public bool RegisterUnknownUsers { get; set; }
		public int UnknownUserTenantId { get; set; }
		public bool AllowUserPasswordChange { get; set; }
	}

	public class Features
	{
		[Description("When true turns on MVC Authentication")]
		public bool EnableMvcAuthentication { get; set; }
		[Description("If this is turned on then all serviceStack calls will validate that the session tenantId matches the request tenantId or they are an admin")]
		public bool ApiAlwaysValidatesTenantId { get; set; }
	}

	public class AzureAdB2CSettings
	{
		public string Instance { get; set; }
		public string ClientId { get; set; }
		public string TenantName { get; set; }
		public string CallbackPath { get; set; }
		public string MobileCallbackPath { get; set; }
		public string Domain { get; set; }
		public string SignUpSignInPolicyId { get; set; }
		public string EditProfilePolicyId { get; set; }
		public string SignInPolicyURL { get; set; }
		public string[] KnownAuthorities { get; set; }
		/// <summary>
		/// Set of scopes to be used to request an access token on the web or mobile app.
		/// </summary>
		public string[] Scopes { get; set; }
	}
	public class MobileNotificationSettings
	{
		public string NotificationHubConnectionString { get; set; }
		public string NotificationHubName { get; set; }
		public string GenericAndroid { get; set; }
		public string SilentAndroid { get; set; }
		public string GenericIOS { get; set; }
		public string SilentIOS { get; set; }
	}
	public class FeedbackSetting
	{
		public string Organiaztion { get; set; }
		public string ProjectName { get; set; }
		public string ProjectSprintBoard { get; set; }
		public string FeedbackBoard { get; set; }
		public string PersonalAccessToken { get; set; }
		public string FeedbackURL { get; set; }
	}
}
