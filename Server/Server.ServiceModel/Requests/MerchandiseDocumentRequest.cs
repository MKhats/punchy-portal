using ServiceStack;
using System;

namespace Server.ServiceModel.Requests
{
	[Route("/document","POST")]
	public class DocumentRequest
	{
	}
	[Route("/documents/{parentId}/{parentType}")]
	public class DocumentsRequest
	{
		public int parentId { get; set; }	
		public string parentType { get; set; }
	}
	[Route("/documentdelete","POST")]
	public class DocumentDeleteRequest
	{
	}
}
