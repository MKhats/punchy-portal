using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Punchcard.Core.Server.DataModel;

namespace Server.ServiceModel.DTO
{
	public class BidderDTO
	{
		public int Id { get; set; }
		public int TableId { get; set; }
		public string FullName { get; set; }
		public string Address { get; set; }
		public string City { get; set; }
		public string Province { get; set; }
		public string PostalCode { get; set; }
		public string HomePhone { get; set; }
		public string MobilePhone { get; set; }
		public string Email { get; set; }
		public DateTime? DateAdded { get; set; }
		public int? DateAddedYear { get
			{
				if (DateAdded != null)
				{
					return DateAdded.Value.Year;
				} else
				{
					return null;
				}
			} 
			private set { } }
		public bool Deleted { get; set; }	
	}
}
