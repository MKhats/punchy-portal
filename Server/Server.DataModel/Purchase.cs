using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Punchcard.Core.Server.DataModel
{
	public class Purchase
	{
		[Key]
		public int Id { get; set; }
		[ForeignKey("Bidder")]
		public int BidderId { get; set; }
		[ForeignKey("Merchandise")]
		public int MerchandiseId { get; set; }
		[Column(TypeName = "decimal(18,2)")]
		public decimal Price { get; set; }
		public DateTime? PurchaseDate { get; set; }
		public string Comment { get; set; }
		[ForeignKey("Payment")]
		public int PaymentId { get; set; }
	}
}
