using ServiceStack;

namespace Server.ServiceModel.Requests
{
	[Route("/Bidder/{Id}")]
	public class BidderRequest
	{
		public int Id { get; set; }
		public int TableId { get; set; }
		public string FullName { get; set; }
		public string Address { get; set; }
		public string PostalCode { get; set; }
		public string City { get; set; }
		public string Province { get; set; }
		public string HomePhone { get; set; }
		public string MobilePhone { get; set; }
		public string Email { get; set; }
		public bool Deleted { get; set; }
	}

	[Route("/Bidders")]
	public class BiddersRequest
	{
	}

	[Route("/anon/BidderReport","GET")]
	public class BidderReportRequest
	{
	}

	[Route("/deletebidder/{Id}", "POST")]
	public class PostDeleteBidderRequest
	{
		public int id { get; set; }
	}

}
