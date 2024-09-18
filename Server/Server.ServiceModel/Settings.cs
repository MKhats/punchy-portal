using ServiceStack;

namespace Punchcard.Core.Server.ServiceModel
{
	[Route("/anon/settings")]
	public class SettingsRequest
	{
	}
	[Route("/anon/mobile/settings")]
	public class MobileSettingsRequest { }

	[Route("/anon/web/settings")]
	public class WebSettingsRequest { }

	[Route("/settings")]
	public class SecureSettingsRequest
	{
	}
	[Route("/mobile/settings")]
	public class MobileSecureSettingsRequest
	{
	}
	[Route("/settings/ss-authenticate")]
	public class ServiceStackAuthenticateSecureSettingsRequest
	{
	}
	[Route("/settings/core-authorizze")]
	public class NetCoreAuthorizeSecureSettingsRequest
	{
	}
	[Route("/helloAuth/customeronly")]
	public class HelloAuthCustomerRequest
	{
		public string Name { get; set; }
	}
	[Route("/helloAuth/adminonly")]
	public class HelloAuthAdminRequest
	{
		public string Name { get; set; }
	}
}
