using ServiceStack;

namespace Punchcard.Core.Server.ServiceModel.Requests
{
	[Route("/pick-list-types", "POST")]
	public class PickListTypeRequest
	{
		public int? Id { get; set; }
		public string Code { get; set; }
		public string Description { get; set; }
		public int? ParentId { get; set; }
		public bool IsActive { get; set; }
	}

	[Route("/pick-list-types/{Id}", "GET")]
	public class PickListTypeSingleRequest
	{
		public int Id { get; set; }
	}
}