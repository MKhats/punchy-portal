using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Punchcard.Core.Server.DataModel;

namespace Server.ServiceModel.DTO
{
	
	public class MerchandiseDTO
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
		public string FullName { get; set; }	// donor name
		public SelectOptionDTO DonorOption { 
			get
			{
				return new SelectOptionDTO()
				{
					value = DonorId.ToString(),
					label = FullName,
				};
			}
			set { } }
		public DateTime DateAdded { get; set; }
		public bool Deleted { get; set; }
		public List<DonorDTO> DonorList { get; set; }
	}
}
