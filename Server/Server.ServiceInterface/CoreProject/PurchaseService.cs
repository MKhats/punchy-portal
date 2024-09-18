
using Punchcard.Core.Server.DataModel;
using Punchcard.Core.Server.ServiceInterface.PunchcardCore;
using Server.ServiceModel.DTO;
using Server.ServiceModel.Requests;
using ServiceStack;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Microsoft.Extensions.Logging;
using Punchcard.Core.Notification.SendGrid;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Collections.Generic;

namespace Punchcard.Core.Server.ServiceInterface.CoreProject
{
	


	public class PurchaseService : Service
	{
		private readonly AppSettings _appSettings;
		private new readonly DatabaseContext Db;
		private readonly ILogger<PurchaseService> _logger;
		private readonly SendGridSettings _sendGridSettings;
		public PurchaseService(ILogger<PurchaseService> log, AppSettings appSettings, DatabaseContext databaseContext, SendGridSettings sendGridSettings)
		{
			_logger = log;
			_appSettings = appSettings;
			_sendGridSettings = sendGridSettings;
			Db = databaseContext;
		}
		public async Task<PurchasesDTO> Get(PurchasesRequest request)
		{
			PurchasesDTO purch = new PurchasesDTO();
			try
			{
				purch.PurchaseList = await (from p in Db.Purchases
									  join b in Db.Bidders on p.BidderId equals b.Id into bidders
									  from bidder in bidders.DefaultIfEmpty()
									  join m in Db.Merchandises on p.MerchandiseId equals m.Id into merches
									  from merch in merches.DefaultIfEmpty()
									  orderby p.PurchaseDate descending
									select new PurchaseDTO()
									{
										Comment=p.Comment,
										FullName=bidder.FullName,
										Id=p.Id,
										ItemName=merch.ItemName,
										PaymentId=p.PaymentId,
										Price=p.Price,
										PurchaseDate=p.PurchaseDate,
									}
									  ).ToListAsync();

				purch.MerchandiseList = await Db.Merchandises
											.Where(x => x.Deleted == false)
											.OrderBy(y => y.ItemName)
											.Select(z => new MerchandiseDTO()
											{
												Id = z.Id,
												ItemName = z.ItemName,
											}).ToListAsync();
				purch.BidderList = await Db.Bidders
											.Where(x => x.Deleted == false)
											.OrderBy(y => y.FullName)
											.Select(z => new BidderDTO()
											{
												Id = z.Id,
												FullName = z.FullName,
											}).ToListAsync();
				return purch;
			}
			catch (Exception ex)
			{
				_logger.LogError("Error - User:{userid} - Message:{message}", GetSession().UserName, ex.Message);
				throw;
			}

		}
		public async Task<Purchase> Post(PurchaseRequest request)
		{
			try
			{
				Purchase purchase = request.ConvertTo<Purchase>();
				purchase.BidderId = Int32.Parse(request.BidderOption);
				purchase.MerchandiseId = Int32.Parse(request.MerchandiseOption);
				
				Purchase pur = await Db.Purchases.FindAsync(request.Id);
				if (pur == null)
				{
					pur = new Purchase()
					{
						PurchaseDate = DateTime.Now
					};
					Db.Purchases.Add(pur);
				}
				pur.BidderId=purchase.BidderId;
				pur.MerchandiseId=purchase.MerchandiseId;
				pur.Price = purchase.Price;
				pur.Comment = purchase.Comment;
				pur.PaymentId=purchase.PaymentId;

				await Db.SaveChangesAsync();
				if (request.SendEmail == true)
				{
					SendPurchaseEmail(pur);
				}
				return purchase;
			}
			catch (Exception ex)
			{
				_logger.LogError("Error - User:{userid} - Message:{message}", GetSession().UserName, ex.Message);
				throw;
			}
		}
		 private async Task<bool> SendPurchaseEmail(Purchase purchase)
		{
			try
			{
				Dictionary<string, string> messageParameters = new Dictionary<string, string>();
				var sendgridClient = new SendGridClient(_sendGridSettings.APIKey);
				var email = new SendGridMessage
				{
					From = new EmailAddress(_sendGridSettings.AddressFrom),
					TemplateId = _sendGridSettings.PurchaseTemplateId,
				};
				string itemname = Db.Merchandises.Where(x => x.Id == purchase.MerchandiseId).Select(y => y.ItemName).FirstOrDefault();
				messageParameters.Add("itemname",itemname);
				messageParameters.Add("price", purchase.Price.ToString("C"));
				email.SetTemplateData(messageParameters);
				string emailaddress = Db.Bidders.Where(x=>x.Id==purchase.BidderId).Select(y=>y.Email).FirstOrDefault();
				if (emailaddress!= null)
				{
					email.AddTo(emailaddress);
				}
				var response = await sendgridClient.SendEmailAsync(email);
				return true;
			}
			catch (Exception ex)
			{
				_logger.LogError("Error - User:{userid} - Message:{message}", GetSession().UserName, ex.Message);
				throw;
			}
		}
		public async Task<bool> Post(PurchaseDeleteRequest request)
		{
			try
			{
				Purchase purchase = await Db.Purchases.Where(x => x.Id == request.Id).FirstOrDefaultAsync();
				if(purchase != null)
				{
					Db.Purchases.Remove(purchase);
					Db.SaveChanges();
				}
				return true;
			}
			catch (Exception ex)
			{
				_logger.LogError("Error - User:{userid} - Message:{message}", GetSession().UserName, ex.Message);
				throw;
			}
		}
		public async Task<PurchaseDTO> Get(PurchaseRequest request)
		{
			try
			{
				Purchase purchase = await Db.Purchases.Where(x => x.Id == request.Id).FirstOrDefaultAsync();
				PurchaseDTO purchaseDTO = purchase.ConvertTo<PurchaseDTO>();
				return purchaseDTO;
			}
			catch (Exception ex)
			{
				_logger.LogError("Error - User:{userid} - Message:{message}", GetSession().UserName, ex.Message);
				throw;
			}
		}
	}
}
