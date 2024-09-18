using ServiceStack;

namespace Punchcard.Core.Server.ServiceModel.Requests
{
	[Route("/pick-list-items", "GET")]
	[Route("/pick-list-items/type/{TypeCode}", "GET")]
	public class PickListItemsRequest
	{
		public int? Id { get; set; }
		public string TypeCode { get; set; }
	}
}