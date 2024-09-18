
using ServiceStack;

namespace Punchcard.Core.Server.ServiceModel.Examples
{


	[Route("/examples/logging")]
	public class LoggingExampleRequest : IReturn<LoggingExampleResponse>
	{

	}
	public class LoggingExampleResponse
	{
		public string Result { get; set; }
	}

}
