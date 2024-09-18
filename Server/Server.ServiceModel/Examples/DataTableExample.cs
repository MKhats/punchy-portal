using ServiceStack;

namespace Punchcard.Core.Server.ServiceModel.Examples
{
	[Route("/data-table-example-data/movies", "GET")]
	public class DataTableExampleMoviesListRequest
	{
	}

	public class DataTableExampleMovieDTO
	{
		public int Id { get; set; }

		public string MovieName { get; set; }

		public int YearReleased { get; set; }

		public string Genre { get; set; }

		public int? DirectorId { get; set; }

		public string DirectorName { get; set; }
	}
}
