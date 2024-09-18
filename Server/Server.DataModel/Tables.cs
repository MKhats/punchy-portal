using System.ComponentModel.DataAnnotations;

namespace Punchcard.Core.Server.DataModel;

public partial class Tables
{
	[Key]
	public int Id { get; set; }
	public int TableNumber { get; set; }
	public int Capacity { get; set; }
	[MaxLength(125)]
	public string TableName { get; set; }
	[MaxLength(125)]
	public string ServerName { get; set; }
	public bool AllowAlcohol { get; set; }
	
	//Adding Ability to Soft Delete a Table
	public bool IsDeleted { get; set; }
	
	
}