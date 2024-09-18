using Server.ServiceModel.DTO;
using ServiceStack;
using System;

namespace Server.ServiceModel.Requests
{
	[Route("/Merchandise/{Id}")]
	public class MerchandiseRequest
	{
		public int Id { get; set; }
		public string ReceiptNumber { get; set; }
		public string ItemName { get; set; }
		public string LotId { get; set; }
		public string Description { get; set; }
		public string SpecialConditions { get; set; }
		public string CertificateInfo { get; set; }
		public bool HasCertificate { get; set; }
		public decimal RetailValue { get; set; }
		public decimal ReserveValue { get; set; }
		public decimal SalePrice { get; set; }
		public int DonorId { get; set; }
		public bool Deleted { get; set; }
		public SelectOptionDTO DonorOption { get; set; }
		public DateTime DateAdded { get; set; }
	}

	[Route("/Merchandises")]
	public class MerchandisesRequest
	{

	}
	[Route("/deletemerchandise/{Id}", "POST")]
	public class PostDeleteMerchandiseRequest
	{
		public int id { get; set; }
	}
}
