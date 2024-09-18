using Server.ServiceModel.DTO;
using ServiceStack;
using System;

namespace Server.ServiceModel.Requests
{
	[Route("/Purchase/{Id}")]
	public class PurchaseRequest
	{
		public int Id { get; set; }
		public string BidderOption { get; set; }
		public string MerchandiseOption { get; set; }
		public decimal Price { get; set; }
		public DateTime? PurchaseDate { get; set; }
		public string Comment { get; set; }
		public int PaymentId { get; set; }
		public bool SendEmail { get; set; }
	}

	[Route("/Purchases")]
	public class PurchasesRequest
	{

	}
	[Route("/PurchaseDelete/{id}")]
	public class PurchaseDeleteRequest
	{
		public int Id { get; set; }
	}
}
