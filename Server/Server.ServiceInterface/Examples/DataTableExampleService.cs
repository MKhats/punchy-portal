using Punchcard.Core.Server.ServiceModel.Examples;
using ServiceStack;
using System.Collections.Generic;

namespace Punchcard.Core.Server.ServiceInterface.Examples
{
	public class DataTableExampleService : Service
	{
		public List<DataTableExampleMovieDTO> Get(DataTableExampleMoviesListRequest request)
		{
			return new List<DataTableExampleMovieDTO>
			{
				new DataTableExampleMovieDTO
				{
					DirectorId = 1,
					Genre = "Science Fiction",
					Id = 1,
					MovieName = "Star Trek II: The Wrath of Khan",
					YearReleased = 1982,
					DirectorName = "Nicholas Meyer"
				},
				new DataTableExampleMovieDTO
				{
					DirectorId = 2,
					Genre = "Horror",
					Id = 2,
					MovieName = "Scream",
					YearReleased = 1996,
					DirectorName = "Wes Craven"
				},
				new DataTableExampleMovieDTO
				{
					DirectorId = 1,
					Genre = "Science Fiction",
					Id = 3,
					MovieName = "Star Trek VI: The Undiscovered Country",
					YearReleased = 1991,
					DirectorName = "Nicholas Meyer"
				}
			};
		}
	}
}
