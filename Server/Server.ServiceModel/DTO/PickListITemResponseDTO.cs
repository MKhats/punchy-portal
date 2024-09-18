namespace Punchcard.Core.Server.ServiceModel.DTO
{
	public class PickListItemResponseDTO
	{
		public int Id { get; set; }
		public int PickListTypeId { get; set; }
		public string PickListTypeCode { get; set; }
		public string Code { get; set; }
		public string Description { get; set; }
		public int? ParentId { get; set; }
		public bool IsDefault { get; set; }
		public bool IsActive { get; set; }
		public string Value1 { get; set; }
		public string Value2 { get; set; }
		public int Sort { get; set; }
	}
}
