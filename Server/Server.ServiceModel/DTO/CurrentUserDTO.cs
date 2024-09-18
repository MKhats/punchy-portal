using System.Collections.Generic;

namespace Punchcard.Core.Server.ServiceModel.DTO
{
	public class CurrentUserDTO
	{
		public int? Id { get; set; }

		public int TenantId { get; set; }

		public string FirstName { get; set; }

		public string LastName { get; set; }

		public string Email { get; set; }

		public string FullName { get; set; }

		public bool isActive { get; set; }

		public List<string> Roles { get; set; }
		public List<string> Permissions { get; set; }
	}
}
