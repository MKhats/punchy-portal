using System.Collections.Generic;

namespace Punchcard.Core.Server.ServiceModel.DTO
{
	public class RoleDTO
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public bool IsDefault { get; set; }
		public List<int> PermissionIds { get; set; }
	}
}