using Punchcard.Core.Server.DataModel;

namespace Punchcard.Core.Server.ServiceModel.DTO
{
	public class PermissionDTO
	{
		public int Id { get; set; }

		public string Code { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
	}
}
