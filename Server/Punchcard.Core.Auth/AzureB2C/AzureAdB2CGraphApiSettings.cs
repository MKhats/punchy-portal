using System;
using System.ComponentModel;

namespace Punchcard.Core.Auth
{
	public class AzureAdB2CGraphApiSettings
	{
		public string Tenant { get; set; }
		public string ClientId { get; set; }
		public string ClientSecret { get; set; }
		public string RolesAzureB2CUserProfileFieldName { get; set; }
		public string DatasetRolesAzureB2CUserProfileFieldName { get; set; }

		[Obsolete]
		[Description("NOT Recommended. If this is filled out we will use a static default password")]
		public string DefaultPassword { get; set; }
	}
}
