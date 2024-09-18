using ServiceStack;
using System.Runtime.Serialization;

namespace Punchcard.Core.Server.ServiceInterface.PunchcardCore
{
	[DataContract]
	public class CustomAuthUserSession : AuthUserSession
	{
		[DataMember]
		public int TenantId { get; set; }
		public bool isNewUser { get; set; }
	}
}
