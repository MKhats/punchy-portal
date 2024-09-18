using Punchcard.Core.Server.ServiceModel.DTO;
using ServiceStack;
using System.Collections.Generic;

namespace Punchcard.Core.Server.ServiceModel.Requests
{
	[Route("/tenant/{TenantId}/users", "POST")]
	public class UpsertTenantUserRequest : UserDetailsDTO
	{
	}
	[Route("/tenant/user-update-info", "POST")]
	public class UpdateTenantUserInfoRequest
	{
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; }
	}

	[Route("/tenant/user-update-password", "POST")]
	public class UpdateTenantUserPasswordRequest
	{
		public string Password { get; set; }
	}

	[Route("/tenant/{TenantId}/users", "DELETE")]
	public class DeleteTenantUserRequest
	{
		public int TenantId { get; set; }
		public int UserId { get; set; }
	}
	[Route("/user/delete", "DELETE")]
	public class DeleteUserRequest
	{
	}

	[Route("/tenant/{TenantId}/roles", "POST")]
	public class UpsertTenantRolesRequest
	{
		public int TenantId { get; set; }
		public int? RoleId { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public bool IsDefault { get; set; }
		public int RoleTypeId { get; set; }
		public List<int> PermissionIds { get; set; }
	}

	[Route("/tenant/{TenantId}/all-users", "GET")]
	public class GetAllTenantUsersRequest
	{
		public int? TenantId { get; set; }
	}

	[Route("/tenant/{TenantId}/users/{UserId}", "GET")]
	public class GetTenantUserRequest
	{
		public int TenantId { get; set; }
		public int UserId { get; set; }
	}

	[Route("/tenant/{TenantId}/all-roles", "GET")]
	public class GetTenantRolesRequest
	{
		public int TenantId { get; set; }
	}

	[Route("/tenant-names", "GET")]
	public class TenantNamesRequest
	{
	}

	[Route("/tenant/{TenantId}/roles/{RoleId}", "GET")]
	public class GetTenantRoleRequest
	{
		public int TenantId { get; set; }
		public int RoleId { get; set; }
	}

	[Route("/tenant/{TenantId}/user-emails", "GET")]
	public class GetTenantUserEmailsRequest
	{
		public int TenantId { get; set; }
	}

	[Route("/permissions", "GET")]
	public class GetTenantPermissions
	{

	}
}
