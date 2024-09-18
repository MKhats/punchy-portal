
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
using AutoMapper;
using Microsoft.Extensions.Logging;
using SendGrid;
using Punchcard.Core.Notification.SendGrid;
using SendGrid.Helpers.Mail;
using System.Text;

namespace Punchcard.Core.Server.ServiceInterface.CoreProject
{
	public class BidderService : Service
	{
		private readonly AppSettings _appSettings;
		private new readonly DatabaseContext Db;
		private readonly ILogger<BidderService> _logger;
		private readonly SendGridSettings _sendGridSettings;
		public BidderService(ILogger<BidderService> log, AppSettings appSettings, DatabaseContext databaseContext, SendGridSettings sendGridSettings)
		{
			_logger = log;
			_appSettings = appSettings;
			_sendGridSettings = sendGridSettings;
			Db = databaseContext;
			
		}

		public async Task<List<BidderDTO>> Get(BiddersRequest request)
		{
			try
			{
				List<BidderDTO> bidderlist = await Db.Bidders
											.Where(x => x.Deleted == false)
											.Select(y => new BidderDTO()
											{
												Id = y.Id,
												TableId = y.TableId,
												DateAdded = Db.Purchases.Where(x => x.BidderId== y.Id).Max(z => z.PurchaseDate),
												Email = y.Email,
												FullName = y.FullName,
												HomePhone = y.HomePhone,
											}).ToListAsync();
				return bidderlist;
			}
			catch (Exception ex)
			{
				_logger.LogError("Error - User:{userid} - Message:{message}", GetSession().UserName, ex.Message);
				throw;
			}
			
		}
		public async Task<Bidder> Post(BidderRequest request)
		{
			try
			{
				Bidder bidder =await Db.Bidders.FindAsync(request.Id);	
				if (bidder==null)	// this bidder record does not exist already
				{
					bidder = request.ConvertTo<Bidder>();
					Db.Bidders.Add(bidder);
				} else
				{
					bidder = bidder.PopulateWith<Bidder, BidderRequest>(request);
				}
				await Db.SaveChangesAsync();
				return bidder;
			}
			catch (Exception ex)
			{
				_logger.LogError("Error - User:{userid} - Message:{message}", GetSession().UserName, ex.Message);
				throw;
			}
		}
		public async Task<BidderDTO> Get(BidderRequest request)
		{
			try
			{
				Bidder bidder =   await Db.Bidders.Where(x => x.Id == request.Id).FirstOrDefaultAsync();
				BidderDTO bidderDTO = bidder.ConvertTo<BidderDTO>();
				return bidderDTO;

			}
			catch (Exception ex)
			{
				_logger.LogError("Error - User:{userid} - Message:{message}", GetSession().UserName, ex.Message);
				throw;
			}
		}
		public async Task<string> Get(BidderReportRequest request)
		{
			try
			{
				string reportRecipient = _appSettings.BiddersExportEmail;
				if (reportRecipient != null && reportRecipient != "")
				{
					List<Bidder> bidders = await Db.Bidders.Where(x => x.Deleted == false).OrderBy(y => y.FullName).ToListAsync();
					if (bidders != null && bidders.Count > 0)
					{
						await SendBidderEmail(bidders.ToCsv());
						return "Email Sent";
					}
				} 
				return "Email not sent";

			}
			catch (Exception ex)
			{
				_logger.LogError("Error - User:{userid} - Message:{message}", GetSession().UserName, ex.Message);
				throw;
			}
		}

		private async Task<bool> SendBidderEmail(string biddersCSV)
		{
			try
			{
				Dictionary<string, string> messageParameters = new Dictionary<string, string>();
				messageParameters.Add("listdate", DateTime.Now.ToString("MMM dd yyyy"));
				var sendgridClient = new SendGridClient(_sendGridSettings.APIKey);
				var email = new SendGridMessage
				{
					From = new EmailAddress(_sendGridSettings.AddressFrom),
					TemplateId = _sendGridSettings.BidderListTemplateId,
				};

				byte[] biddersCSVBytes = Encoding.ASCII.GetBytes(biddersCSV);
				var encodedCSV = System.Convert.ToBase64String(biddersCSVBytes);

				email.SetTemplateData(messageParameters);
				var fileName = DateTime.Now.ToString("yyyyMMdd") + "_BidderList.csv";
				email.AddAttachment(fileName, encodedCSV, "text/csv", "attachment", "banner");
				email.AddTo(_appSettings.BiddersExportEmail);

				var response = await sendgridClient.SendEmailAsync(email);
				

				return true;
			}
			catch (Exception ex)
			{
				_logger.LogError("Error - User:{userid} - Message:{message}", GetSession().UserName, ex.Message);
				throw;
			}
		}
		public async Task<string> Post(PostDeleteBidderRequest request)
		{
			try
			{
				Bidder bidder = await Db.Bidders.FindAsync(request.id);
				if (bidder != null)
				{
					bidder.Deleted = true;
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
