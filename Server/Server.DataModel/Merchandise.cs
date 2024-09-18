using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Punchcard.Core.Server.DataModel
{
	public class Merchandise
	{
		[Key]
		public int Id { get; set; }
		public string ReceiptNumber { get; set; }
		public string ItemName { get; set; }
		public string LotId { get; set; }
		public string Description { get; set; }
		public string SpecialConditions { get; set; }
		public string CertificateInfo { get; set; }
		public bool HasCertificate { get; set; }
		[Column(TypeName = "decimal(18,2)")]
		public decimal RetailValue { get; set; }
		[Column(TypeName = "decimal(18,2)")]
		public decimal ReserveValue { get; set; }
		[Column(TypeName = "decimal(18,2)")]
		public decimal SalePrice { get; set; }
		[ForeignKey("Donor")]
		public int DonorId { get; set; }
		public DateTime DateAdded { get; set; }
		public bool Deleted { get; set; }

	}
}
