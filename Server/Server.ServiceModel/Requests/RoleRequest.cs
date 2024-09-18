using Punchcard.Core.Server.ServiceModel.DTO;
using ServiceStack;
using System;
using System.Collections.Generic;
using System.Text;

namespace Punchcard.Core.Server.ServiceModel.Requests
{
	[Route("/roles", "GET")]
	public class GetRolesRequest
	{
	}

	[Route("/roles", "POST")]
	public class PostRoleRequest
	{
		public int? Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public List<int> PermissionIds { get; set; }
	}

	[Route("/roles/{Id}", "GET")]
	public class GetRoleRequest
	{
		public int Id { get; set; }
	}
}
