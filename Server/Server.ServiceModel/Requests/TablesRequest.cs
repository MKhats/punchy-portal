using ServiceStack;

namespace Server.ServiceModel.Requests
{
	[Route("/tables")]
	public class TablesRequest
	{
	
	}
	
	[Route("/tables/{Id}")]
	public class TableRequest
	{
		public int Id { get; set; }
		public string TableName { get; set; }
		public int Capacity { get; set; }
		public string ServerName { get; set; }
		public bool AllowAlcohol { get; set; }
		public bool IsDeleted { get; set; }
	}
	
	[Route("/deleteTable/{Id}", "POST")]
	public class PostDeleteTableRequest
	{
		public int Id { get; set; }
	}
}