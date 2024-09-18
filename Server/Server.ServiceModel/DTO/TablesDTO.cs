namespace Server.ServiceModel.DTO;

public class TablesDTO
{
	public int Id { get; set; }
	
	public int TableNumber { get; set; }
	public string TableName { get; set; }
	public int Capacity { get; set; }
	public int NumberOfBidders { get; set; }
	public string ServerName { get; set; }
	public bool AllowAlcohol { get; set; }
	
	public bool IsDeleted { get; set; }
}