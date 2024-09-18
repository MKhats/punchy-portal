using Punchcard.Core.Server.ServiceModel.DTO;
using ServiceStack;

namespace Punchcard.Core.Server.ServiceModel.Requests
{
	[Route("/current-user", "GET")]
	public class CurrentUserRequest : IReturn<CurrentUserDTO>
	{
	}
}