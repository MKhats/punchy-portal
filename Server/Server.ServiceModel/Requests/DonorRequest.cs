using ServiceStack;

namespace Server.ServiceModel.Requests
{
	[Route("/donor/{Id}")]
	public class DonorRequest
	{
		public int Id { get; set; }
		public string FullName { get; set; }
		public string ContactName { get; set; }
		public string Address { get; set; }
		public string PostalCode { get; set; }
		public string City { get; set; }
		public string Province { get; set; }
		public string HomePhone{ get; set; }
		public string MobilePhone { get; set; }
		public string Email { get; set; }
		public bool Deleted { get; set; }
	}

	[Route("/donors")]
	public class DonorsRequest
	{
		
	}
	[Route("/deletedonor/{Id}", "POST")]
	public class PostDeleteDonorRequest
	{
		public int id { get; set; }
	}
}
