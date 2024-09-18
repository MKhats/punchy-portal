using Server.ServiceModel.DTO;
using ServiceStack;

namespace Server.ServiceModel.Requests
{
	[Route("/feedbacks", "GET")]
	public class GetFeedbacksRequest
	{
	}

	[Route("/feedback", "POST")]
	public class PostFeedbackRequest : FeedbackDTO
	{
	}

	[Route("/feedback/{Id}", "GET")]
	public class GetFeedbackRequest
	{
		public int Id { get; set; }
	}
	[Route("/dismissfeedback", "POST")]
	public class PostDismissFeedbackRequest
	{
		public int Id { get; set; }
	}
	[Route("/completefeedback", "POST")]
	public class PostCompleteFeedbackRequest
	{
		public int Id { get; set; }
	}
	[Route("/elevatefeedback", "POST")]
	public class PostElevateFeedbackRequest
	{
		public int Id { get; set; }
	}
	[Route("/deletefeedback", "POST")]
	public class PostDeleteFeedbackRequest
	{
		public int Id { get; set; }
	}	
}
