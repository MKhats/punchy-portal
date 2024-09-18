using System.ComponentModel.DataAnnotations;
using System;

namespace Punchcard.Core.Server.DataModel
{
	public class Payment
	{
		[Key]
		public int Id { get; set; }
		public int BidderId { get; set; }
		public DateTime? PaymentDate { get; set; }
		public int PaymentMethodId { get; set; }
	}
}
