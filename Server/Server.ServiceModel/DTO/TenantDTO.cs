using ServiceStack;

namespace Punchcard.Core.Server.ServiceModel.DTO
{

	[Route("/tenant", "POST")]
	[Route("/tenant/{Id}")]
	public class TenantUpdateRequest
	{
		public int? Id { get; set; }

		public string Name { get; set; }
		public bool IsActive { get; set; }
	}

	[Route("/tenant", "GET")]
	public class TenantsRequest
	{
	}

	[Route("/tenant/{Id}", "GET")]
	public class TenantRequest
	{
		public int Id { get; set; }
	}

	public class TenantListResponseDTO
	{
		public int? Id { get; set; }

		public string Name { get; set; }

		public bool IsActive { get; set; }
	}

}
