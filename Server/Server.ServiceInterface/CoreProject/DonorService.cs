
using Punchcard.Core.Auth.Interface;
using Punchcard.Core.Notification.Interface;
using Punchcard.Core.Server.DataModel;
using Punchcard.Core.Server.ServiceInterface.PunchcardCore;
using Server.ServiceModel.DTO;
using Server.ServiceModel.Requests;
using ServiceStack;
//using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Punchcard.Core.Server.ServiceInterface.CoreProject
{
	public class DonorService:Service
	{
		private readonly AppSettings _appSettings;
		private new readonly DatabaseContext Db;
		private readonly ILogger<DonorService> _logger;
		public DonorService(ILogger<DonorService> log, AppSettings appSettings, DatabaseContext databaseContext)
		{
			_logger = log;	
			Db = databaseContext;
			_appSettings = appSettings;
		}
		public async Task<List<DonorDTO>> Get(DonorsRequest request)
		{
			try
			{
				//// Get the list of donors that are not flagged as deleted and also contains the date of the last merchandise item they added.
				List<DonorDTO> donorlist = await Db.Donors
											.Where(x=>x.Deleted==false)
											.Select(y => new DonorDTO()
											{
												Id = y.Id,
												DateAdded = Db.Merchandises.Where(x => x.DonorId== y.Id).Max(z => z.DateAdded),
												Email = y.Email,
												FullName = y.FullName,
												HomePhone = y.HomePhone,
												ContactName = y.ContactName,
											}).ToListAsync();
				return donorlist;
			}
			catch (Exception ex)
			{
				string message = $"Error - User:{GetSession().UserName} - Message:{ex.Message} - Function Name:DonorsRequest";
				_logger.LogError(ex,message);
				throw;
			}
		}
		public async Task<Donor> Post(DonorRequest request)
		{
			try
			{
				Donor donor = await Db.Donors.FindAsync(request.Id);
				if (donor == null) // this donor record does not exist already
				{
					donor = request.ConvertTo<Donor>();
					Db.Donors.Add(donor);
				}
				else
				{
					donor = donor.PopulateWith<Donor, DonorRequest>(request);
				}
				await Db.SaveChangesAsync();
				return donor;
			}
			catch (Exception ex)
			{
				_logger.LogError("Error - User:{userid} - Message:{message}", GetSession().UserName, ex.Message);
				throw;
			}
		}
		public async Task<DonorDTO> Get(DonorRequest request)
		{
			try
			{
				Donor donor = await Db.Donors.Where(x => x.Id == request.Id).FirstOrDefaultAsync();
				DonorDTO donorDTO = donor.ConvertTo<DonorDTO>();
				return donorDTO;
			}
			catch (Exception ex)
			{
				_logger.LogError("Error - User:{userid} - Message:{message}", GetSession().UserName, ex.Message);
				throw;
			}
		}
		public async Task<string> Post(PostDeleteDonorRequest request)
		{
			try
			{
				Donor donor = await Db.Donors.FindAsync(request.id);
				if (donor != null)
				{
					donor.Deleted = true;
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
