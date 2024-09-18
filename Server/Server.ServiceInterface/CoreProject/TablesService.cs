using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Punchcard.Core.Server.DataModel;
using Server.ServiceModel.DTO;
using Server.ServiceModel.Requests;
using ServiceStack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punchcard.Core.Server.ServiceInterface.CoreProject
{
	public class TableService : Service
	{
		private readonly DatabaseContext _dbContext;
		private readonly ILogger<TableService> _logger;

		public TableService(ILogger<TableService> logger, DatabaseContext dbContext)
		{
			_logger = logger;
			_dbContext = dbContext;
		}

		public async Task<List<TablesDTO>> Get(TablesRequest request)
		{
			try
			{
				List<TablesDTO> tablesList = await _dbContext.Tables
											.Where(w => w.IsDeleted == false)
											.Select(s => new TablesDTO()
												{
													Id = s.Id,
													TableName = s.TableName,
													Capacity = s.Capacity,
													ServerName = s.ServerName,
													AllowAlcohol = s.AllowAlcohol,
													NumberOfBidders = _dbContext.Bidders
														.Count(w => w.TableId == s.Id)
												})
											.ToListAsync();
				return tablesList;
			}
			catch (Exception ex)
			{
				_logger.LogError(
					ex,
					"Error - User: {userid} - Message: {message} - Function Name: GetTablesRequest",
					GetSession().UserName,
					ex.Message);
				throw;
			}
		}
		//Get Table by Id
		public async Task<TablesDTO> Get(TableRequest request)
		{
			try
			{
				Tables table = await _dbContext.Tables
					.Where(x => x.Id == request.Id && !x.IsDeleted)
					.FirstOrDefaultAsync();
				TablesDTO tableDTO = table.ConvertTo<TablesDTO>();
				return tableDTO;
			}
			catch (Exception ex)
			{
				_logger.LogError(
					ex,
					"Error - User:{userid} - Message:{message} - Function Name: GetTableRequest",
					GetSession().UserName,
					ex.Message);
				throw;
			}
		}

		public async Task<Tables> Post(TableRequest request)
		{
			try
			{
				Tables table = await _dbContext.Tables.FindAsync(request.Id);

				if (table == null) // this table record does not exist
				{
					table = request.ConvertTo<Tables>();
					_dbContext.Tables.Add(table);
				}
				else
				{
					table = table.PopulateWith<Tables, TableRequest>(request);
				}
				await _dbContext.SaveChangesAsync();
				return table;
			}
			catch (Exception ex)
			{
				_logger.LogError(
					ex,
					"Error - User: {userid} - Message: {message} - Function Name: PostTableRequest",
					GetSession().UserName,
					ex.Message);
				throw;
			}
		}
		
		public async Task<string> Post(PostDeleteTableRequest request)
		{
			try
			{
				Tables table = await _dbContext.Tables.FindAsync(request.Id);
				if (table != null)
				{
					table.IsDeleted = true;

					List<Bidder> bidders = await _dbContext.Bidders
						.Where(w => w.TableId == table.Id)
						.ToListAsync();

					bidders.ForEach(f => f.TableId = 0);

					await _dbContext.SaveChangesAsync();
					return "Success";
				}

				return null;
			}
			catch (Exception ex)
			{
				_logger.LogError(
					ex,
					"Error - User:{userid} - Message:{message} - Function Name: PostDeleteTableRequest",
					GetSession().UserName,
					ex.Message);
				throw;
			}
		}
	}
}
