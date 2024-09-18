using Punchcard.Core.Server.DataModel;
using Punchcard.Core.Server.ServiceInterface.PunchcardCore;
using Server.ServiceModel.DTO;
using Server.ServiceModel.Requests;
using ServiceStack;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace Punchcard.Core.Server.ServiceInterface.CoreProject
{
	public class DashboardService:Service
	{
		private readonly AppSettings _appSettings;
		private new readonly DatabaseContext Db;
		private readonly ILogger<DashboardService> _logger;
		public DashboardService(ILogger<DashboardService> log, AppSettings appSettings, DatabaseContext databaseContext)
		{
			_logger = log;
			Db = databaseContext;
			_appSettings = appSettings;
		}

		public async Task<DashboardDTO> Get(DashboardRequest request)
		{
			try
			{
				DashboardDTO dto = new DashboardDTO();
				// purchse list
				dto.purchases =  await (from p in Db.Purchases
								 join b in Db.Bidders on p.BidderId equals b.Id into bids
								 from bidder in bids.DefaultIfEmpty()
								 join m in Db.Merchandises on p.MerchandiseId equals m.Id
								 orderby p.Price descending
								 select new PurchaseDTO()
								 {
									 Id=p.Id,
									 FullName=bidder.FullName,
									 ItemName=m.ItemName,
									 Price = p.Price,
								 }).Take(10).ToListAsync();

				// merchandise list
				dto.merchandises = await (from m in Db.Merchandises
										  join d in Db.Donors on m.DonorId equals d.Id into donors
										  from donor in donors.DefaultIfEmpty()
										  orderby m.RetailValue
										  select new MerchandiseDTO()
										  {
											  Id = m.Id,
											  ItemName=m.ItemName,
											  FullName=donor.FullName,
											  RetailValue=m.RetailValue
										  }).Take(10).ToListAsync();
				// revenue total chart

				string purch = "select * FROM vCumulativePurchases"; // must return all fields in Purchases
				List<Purchase> purchase = await Db.Purchases.FromSqlRaw(purch).ToListAsync();
				dto.chartRevenueTotal = new ChartDTO();
				dto.chartRevenueTotal.Amounts = purchase.Map(x =>{return x.Price;});
				dto.chartRevenueTotal.YAxisLabels = purchase.Map(x => { return x.Id.ToString(); });

				var bidders = await (from b in Db.Bidders
										   join p in Db.Purchases on b.Id equals p.BidderId
										   where b.Deleted==false 
										   group new { b, p } by b.TableId into tablegroup
										   orderby tablegroup.Key
										   select new 
										   {
											   Name=tablegroup.Key.ToString(),
											   Amount= tablegroup.Sum(x=>x.p.Price)
										   }).ToListAsync();
				dto.chartTablesTotal = new ChartDTO();
				dto.chartTablesTotal.Amounts = bidders.Map(x => { return x.Amount; });
				dto.chartTablesTotal.YAxisLabels = bidders.Map(x => { return x.Name; });

				return dto;
			}
			catch (Exception ex)
			{
				_logger.LogError("Error - User:{userid} - Message:{message}", GetSession().UserName, ex.Message);
				throw;
			}

		}


	}
}



