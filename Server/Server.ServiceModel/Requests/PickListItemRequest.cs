using ServiceStack;

namespace Punchcard.Core.Server.ServiceModel.Requests
{
	[Route("/pick-list-items", "POST")]
	public class PickListItemRequest
	{
		public int? Id { get; set; }
		public int PickListTypeId { get; set; }
		public string Code { get; set; }
		public string Description { get; set; }
		public bool IsActive { get; set; }
		public bool isDefault { get; set; }
		public int ParentId { get; set; }
	}

	[Route("/pick-list-items/{Id}")]
	public class PickListItemSingleRequest
	{
		public int Id { get; set; }
	}
}