using ServiceStack;

namespace Punchcard.Core.Server.ServiceModel.Requests
{
	[Route("/users/{Id}", "GET")]
	public class PunchcardUserDetailsRequest
	{
		public int Id { get; set; }
	}
}
