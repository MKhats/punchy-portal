using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Punchcard.Core.Server.DataModel;

public partial class ProductList
{
	[Key]
	public int Id { get; set; }
	[ForeignKey("TannerOnboarding")]
	[Column(Order=2)]
	public int TannerId { get; set; }
	public string ProductName { get; set; }
	public string ProductType { get; set; }
	
}