using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Punchcard.Core.Server.DataModel
{
	public class TannerOnboarding
	{
		[Key]
		public int Id { get; set; }
		public int NumericCol { get; set; }
		public DateTime? LastModified { get; set; }
		public string RestrictedCharInput { get; set; }
		public string UnRestrictedCharInput { get; set; }
	}
}