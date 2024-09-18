
using Punchcard.Core.Server.DataModel;
using Punchcard.Core.Server.ServiceInterface.PunchcardCore;
using Server.ServiceModel.Requests;
using ServiceStack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Azure.Storage.Blobs;
using System.IO;
using Microsoft.Extensions.Logging;

namespace Punchcard.Core.Server.ServiceInterface.CoreProject
{
	public class DocumentService : Service
	{
		private readonly AppSettings _appSettings;
		private new readonly DatabaseContext Db;
		private readonly ILogger<DocumentService> _logger;

		public DocumentService(ILogger<DocumentService> log, AppSettings appSettings, DatabaseContext databaseContext)
		{
			_logger = log;	
			_appSettings = appSettings;
			Db = databaseContext;
		}
		public async Task<Document> Post(DocumentDeleteRequest request)
		{
			try
			{
				Document fileDetails = await Db.Documents.Where(ud => ud.Id == Convert.ToInt32(Request.FormData["id"])).FirstOrDefaultAsync();
				fileDetails.Deleted = true;
				await Db.SaveChangesAsync();
				return fileDetails;
			}
			catch (Exception ex)
			{
				_logger.LogError("Error - User:{userid} - Message:{message}", GetSession().UserName, ex.Message);
				throw;
			}
		}
		public async Task<int> Post(DocumentRequest request)
		{
			try
			{
				string connectionString = _appSettings.AzureStorageConnectionString;
				var currentUser = (CustomAuthUserSession)GetSession();
				int questid = Convert.ToInt32(Request.FormData["parentId"]);
				DocumentParentType parenttype = (DocumentParentType)Enum.Parse(typeof(DocumentParentType), Request.FormData["parentType"]);
				// Create a BlobServiceClient object which will be used to create a container client
				BlobServiceClient blobServiceClient = new BlobServiceClient(connectionString);
				
				BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient("documents");    
				await containerClient.CreateIfNotExistsAsync();     // this will create the folder if it doesn't exist
				if (Request.Files.Length > 0)
				{
					foreach (var file in Request.Files)
					{

						var timestamp = DateTime.Now.ToString("yyyyMMddHHmmss");
						var fileName = string.Concat(
							Path.GetFileNameWithoutExtension(file.FileName),
							"_",
							timestamp,
							Path.GetExtension(file.FileName)
						);
						BlobClient blobClient = containerClient.GetBlobClient( fileName);
						// Upload file data
						await blobClient.UploadAsync(file.InputStream);
						var uri = blobClient.GenerateSasUri(Azure.Storage.Sas.BlobSasPermissions.Read, DateTimeOffset.UtcNow.AddYears(10));
						if (questid == 0)
						{
							if (parenttype == DocumentParentType.Merchandise)
							{
								Merchandise merch = new Merchandise();
								merch.DateAdded = DateTime.UtcNow;
								Db.Merchandises.Add(merch);
								Db.SaveChanges();
								questid = merch.Id;
							} else if (parenttype == DocumentParentType.Feedback)
							{
								Feedback feedback = new Feedback();
								feedback.SubmittedDate = DateTime.UtcNow;
								feedback.UserEmail = GetSession().Email;
								feedback.UserName = GetSession().UserName;
								Db.Feedbacks.Add(feedback);
								Db.SaveChanges();
								questid = feedback.Id;
							}
						}
						Document doc = new Document()
						{
							Id = 0,
							ParentId = questid,
							ParentType=parenttype,
							UploadUserId = currentUser.Id,
							Deleted = false,
							DocumentName = file.FileName,
							DocumentURL = uri.AbsoluteUri,
							UploadDate = DateTime.UtcNow

						};
						Db.Documents.Add(doc);
						await Db.SaveChangesAsync();
						return questid;
					}
				}
			}
			catch (Exception ex)
			{
				_logger.LogError("Error - User:{userid} - Message:{message}", GetSession().UserName, ex.Message);
				throw;
			}
			return 0;
		}
		public async Task<List<Document>> Get(DocumentsRequest request)
		{
			try
			{
				int parentid = request.parentId;
				DocumentParentType parenttype = (DocumentParentType)Enum.Parse(typeof(DocumentParentType), request.parentType);
				List<Document> docs = await Db.Documents
								.Where(x => x.ParentId== parentid && x.ParentId!=0 && x.Deleted == false && x.ParentType==parenttype).ToListAsync();
				return docs;
			}
			catch (Exception ex)
			{
				_logger.LogError("Error - User:{userid} - Message:{message}", GetSession().UserName, ex.Message);
				throw;
			}
		}

		
	}
}
