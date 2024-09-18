using Punchcard.Core.Server.DataModel;
using Punchcard.Core.Server.ServiceInterface.PunchcardCore;
using Server.ServiceModel.DTO;
using Server.ServiceModel.Requests;
using ServiceStack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Microsoft.Extensions.Logging;

namespace Punchcard.Core.Server.ServiceInterface.CoreProject
{
	public class MerchandiseService : Service
	{
		private readonly AppSettings _appSettings;
		private new readonly DatabaseContext Db;
		private readonly ILogger<MerchandiseService> _logger;
		public MerchandiseService(ILogger<MerchandiseService> log, AppSettings appSettings, DatabaseContext databaseContext)
		{
			_logger = log;	
			_appSettings = appSettings;
			Db = databaseContext;
		}
		public async Task<List<MerchandiseDTO>> Get(MerchandisesRequest request)
		{
			List<MerchandiseDTO> Merchandiselist = new List<MerchandiseDTO>();
			try
			{
				List<MerchandiseDTO> merchlist = await (from m in Db.Merchandises
													 join d in Db.Donors on m.DonorId equals d.Id into donors   // left outer join
													 from donor in donors
													 where m.Deleted == false
													 orderby m.DateAdded descending
													 select new MerchandiseDTO()
													 {
														 Id = m.Id,
														 FullName = donor.FullName,
														 ItemName = m.ItemName,
														 ReserveValue = m.ReserveValue,
														 RetailValue = m.RetailValue,
														 LotId = m.LotId,
													 }).ToListAsync();
				return merchlist;
			}
			catch (Exception ex)
			{
				_logger.LogError("Error - User:{userid} - Message:{message}", GetSession().UserName, ex.Message);
				throw;
			}
			return Merchandiselist;
		}
		public async Task<Merchandise> Post(MerchandiseRequest request)
		{
			try
			{
				Merchandise merchandise= await Db.Merchandises.FindAsync(request.Id);
				if (merchandise == null) // this merchandise record does not exist already
				{
					merchandise= request.ConvertTo<Merchandise>();
					merchandise.DateAdded = DateTime.Now;
					Db.Merchandises.Add(merchandise);
				}
				else
				{
					merchandise = merchandise.PopulateWith<Merchandise, MerchandiseRequest>(request);
				}
				await Db.SaveChangesAsync();
				return merchandise;
			}
			catch (Exception ex)
			{
				_logger.LogError("Error - User:{userid} - Message:{message}", GetSession().UserName, ex.Message);
				throw;
			}
		}
		public async Task<MerchandiseDTO> Get(MerchandiseRequest request)
		{
			try
			{
				MerchandiseDTO merchandiseDTO = await (from m in Db.Merchandises
												 join d in Db.Donors on m.DonorId equals d.Id into donors
												 from don in donors.DefaultIfEmpty()
												 where m.Id == request.Id
												 select new MerchandiseDTO()
												 {
													CertificateInfo = m.CertificateInfo,
													DateAdded = DateTime.Now,
													Description = m.Description,
													DonorId=m.DonorId,
													FullName=don.FullName,
													HasCertificate =m.HasCertificate,
													Id =m.Id,
													ItemName=m.ItemName,
													LotId=m.LotId,	
													ReceiptNumber=m.ReceiptNumber,
													ReserveValue=m.ReserveValue,
													RetailValue=m.RetailValue,
													SalePrice=m.SalePrice,
													SpecialConditions=m.SpecialConditions,
												 }
												 ).FirstOrDefaultAsync();

				if (merchandiseDTO == null)
				{
					merchandiseDTO = new MerchandiseDTO();
				}
				// get list of donors for the select list on the Merchandise page
				merchandiseDTO.DonorList = await Db.Donors
											.Where(x => x.Deleted == false)
											.OrderByDescending(y=>y.FullName)
											.Select(z=>new DonorDTO()
											{
												FullName =z.FullName,
												Id = z.Id,	
											})
											.ToListAsync();
				return merchandiseDTO;
			}
			catch (Exception ex)
			{
				_logger.LogError("Error - User:{userid} - Message:{message}", GetSession().UserName, ex.Message);
				throw;
			}
		}
		public async Task<string> Post(PostDeleteMerchandiseRequest request)
		{
			try
			{
				Merchandise merchandise = await Db.Merchandises.FindAsync(request.id);
				if (merchandise != null)
				{
					merchandise.Deleted = true;
					await Db.SaveChangesAsync();
					return "Success";
				}
				return null;
			}
			catch (Exception ex)
			{
				_logger.LogError("Error - User:{userid} - Message:{message}", GetSession().UserName, ex.Message);
				throw;
			}
		}
	}
}
