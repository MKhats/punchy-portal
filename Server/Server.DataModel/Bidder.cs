using System.ComponentModel.DataAnnotations;
using System;

namespace Punchcard.Core.Server.DataModel
{
	public class Bidder
	{
		[Key]
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
		public bool Deleted { get; set; }
	}
}
