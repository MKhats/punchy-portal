using System;
using System.Collections.Generic;
using System.Text;

namespace Punchcard.Core.Server.ServiceInterface.PunchcardCore
{
	public class MobileSettings
	{
		public string B2CBaseUrl { get; set; }
		public string B2CTenantName { get; set; }
		public string B2CSignInFlow { get; set; }
		public string B2CAuthCallBack { get; set; }
		public string B2CClientId { get; set; }
		public string StripeAPIUrl { get; set; }
		public string StripeAPIKey { get; set; }
		public string[] B2CApiScopes { get; set; }
		public bool AllowUserPasswordChange { get; set; }
	}
}
