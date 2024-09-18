using Punchcard.Core.Server.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.ServiceModel.DTO
{
	public class PurchaseDTO
	{
		public int Id { get; set; }
		public SelectOptionDTO BidderOption { get; set; }
		public string FullName { get; set; }    // bidder name
		public SelectOptionDTO MerchandiseOption { get; set; }	
		public string ItemName { get; set; }
		public decimal Price { get; set; }
		public DateTime? PurchaseDate { get; set; }
		public string Comment { get; set; }
		public int PaymentId { get; set; }
		public string SendEmail { get; set; }

	}
	public class PurchasesDTO
	{
		public List<PurchaseDTO> PurchaseList { get; set; }
		public List<MerchandiseDTO> MerchandiseList { get; set; }
		public List<BidderDTO> BidderList { get; set; }
	}
	
}
