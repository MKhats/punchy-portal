using System;
using System.Collections.Generic;

namespace Punchcard.Core.Server.ServiceModel.DTO
{
	public class UserDetailsDTO
	{
		public int? Id { get; set; }

		public string FirstName { get; set; }

		public string LastName { get; set; }

		public string Email { get; set; }

		public List<int> RoleIds { get; set; }

		public int? TenantId { get; set; }

		public bool IsActive { get; set; }

		public string? Password { get; set; }
	}
}
