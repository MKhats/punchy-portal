using ServiceStack;

namespace Server.ServiceModel.Requests
{
	[Route("/products")]
	public class ProductsRequest
	{
	}

	
	[Route("/products/{Id}")]
	public class ProductRequest
	{
		public int Id { get; set; }
		public int TannerId { get; set; }
		public string ProductName { get; set; }
		public string ProductType { get; set; }
	}
	
	
	[Route("/deleteProduct/{Id}", "POST")]
	public class PostDeleteProductRequest
	{
		public int Id { get; set; }
	}

	
	
}
