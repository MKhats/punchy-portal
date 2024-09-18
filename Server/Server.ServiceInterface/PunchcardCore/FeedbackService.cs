using Punchcard.Core.Server.DataModel;
using Punchcard.Core.Server.ServiceInterface.PunchcardCore;
using Server.ServiceModel.Requests;
using ServiceStack;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Microsoft.Extensions.Logging;
using Microsoft.TeamFoundation.WorkItemTracking.WebApi;
using Microsoft.TeamFoundation.WorkItemTracking.WebApi.Models;
using Microsoft.VisualStudio.Services.Common;
using Microsoft.VisualStudio.Services.WebApi.Patch.Json;
using Microsoft.VisualStudio.Services.WebApi.Patch;
using Microsoft.VisualStudio.Services.WebApi;
using Server.ServiceModel.DTO;
using Punchcard.Core.Notification.SendGrid;
using System.Collections.Generic;
using Microsoft.TeamFoundation.Common;
using System.IO;
using System.Net.Http;
using System.Reflection.Metadata;

namespace Punchcard.Core.Server.ServiceInterface.CoreProject
{
	public class FeedbackService : Service
	{
		private readonly FeedbackSetting _feedbackSetting;
		private new readonly DatabaseContext Db;
		private readonly SendGridSettings _sendGridSettings;

		public FeedbackService(FeedbackSetting feedbackSetting, DatabaseContext databaseContext, SendGridSettings sendGridSettings)
		{
			_feedbackSetting = feedbackSetting;
			_sendGridSettings = sendGridSettings;
			Db = databaseContext;
		}

		public async Task<FeedbackDTO> Post(PostFeedbackRequest request)
		{
			try
			{
				Feedback feedback = await Db.Feedbacks.FindAsync(request.Id);
				if (feedback == null) // this bidder record does not exist already
				{
					var session = GetSession();
					request.UserEmail = session.Email;
					request.UserName = session.DisplayName ?? $"{session.FirstName} {session.LastName}";
					request.SubmittedDate = DateTimeOffset.Now;
					feedback = request.ConvertTo<Feedback>();
					Db.Feedbacks.Add(feedback);
				}
				else if (GetSession().IsGlobalAdmin())
				{
					feedback = feedback.PopulateWith<Feedback, PostFeedbackRequest>(request);
				}
				else
				{
					throw new AuthenticationException();
				}
				await Db.SaveChangesAsync();
				return feedback.ConvertTo<FeedbackDTO>();
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}

		[RequiresAnyPermission("GlobalAdmin")]
		public async Task<FeedbackDTO> Get(GetFeedbackRequest request)
		{
			try
			{
				Feedback feedback = await Db.Feedbacks.Where(x => x.Id == request.Id).FirstOrDefaultAsync();
				FeedbackDTO feedbackDTO = feedback.ConvertTo<FeedbackDTO>();
				return feedbackDTO;

			}
			catch (Exception ex)
			{
				throw;
			}
		}

		[RequiresAnyPermission("GlobalAdmin")]
		public async Task<List<FeedbackDTO>> Get(GetFeedbacksRequest request)
		{
			try
			{
				List<FeedbackDTO> feedbacklist = await Db.Feedbacks
											.Where(x => x.Deleted == false)
											.Select(y => new FeedbackDTO()
											{
												Id = y.Id,
												Description = y.Description,

												UserName = y.UserName,
												UserEmail = y.UserEmail,

												// Administative Settings
												Priority = y.Priority,
												Severity = y.Severity,
												FeedbackType = y.FeedbackType,
												SubmittedDate = y.SubmittedDate,
												Deleted = y.Deleted,
												Dismissed = y.Dismissed,
												CompletedDate = y.CompletedDate,
												ElevatedDate = y.ElevatedDate,

												// Browser Settings
												Browser = y.Browser,
												BrowserVersion = y.BrowserVersion,
												ComputerOs = y.ComputerOs,
												ComputerOsVersion = y.ComputerOsVersion,
												Language = y.Language,

												// Mobile Settings
												DeviceOs = y.DeviceOs,
												DeviceVersion = y.DeviceVersion,
												DeviceLanguage = y.DeviceLanguage,
												AppVersion = y.AppVersion,
												BuildId = y.BuildId,
												BatteryPercentage = y.BatteryPercentage,
												IsLowPowerMode = y.IsLowPowerMode,
												PagesVisited = y.PagesVisited,
												AppPermissions = y.AppPermissions,
											}).ToListAsync();
				return feedbacklist;
			}
			catch (Exception ex)
			{
				throw;
			}

		}

		[RequiresAnyPermission("GlobalAdmin")]
		public async Task<string> Post(PostDismissFeedbackRequest request)
		{
			try
			{
				Feedback feedback = await Db.Feedbacks.FindAsync(request.Id);
				if (feedback != null)
				{
					feedback.Dismissed = true;
					await Db.SaveChangesAsync();
					return "Success";
				}
				return null;
			}
			catch (Exception ex)
			{
				throw;
			}
		}

		[RequiresAnyPermission("GlobalAdmin")]
		public async Task<string> Post(PostCompleteFeedbackRequest request)
		{
			try
			{
				Feedback feedback = await Db.Feedbacks.FindAsync(request.Id);
				if (feedback != null)
				{
					feedback.CompletedDate = DateTime.UtcNow;
					feedback.Dismissed = false;
					await Db.SaveChangesAsync();
					return "Success";
				}
				return null;
			}
			catch (Exception ex)
			{
				throw;
			}
		}

		[RequiresAnyPermission("GlobalAdmin")]
		public async Task<string> Post(PostElevateFeedbackRequest request)
		{
			try
			{
				Feedback feedback = await Db.Feedbacks.FindAsync(request.Id);
				if (feedback != null)
				{
					feedback.ElevatedDate = DateTime.UtcNow;
					await Db.SaveChangesAsync();
					await CreateFeedbackOnDevOpsBoard(feedback);
					return "Success";
				}
				return null;
			}
			catch (Exception ex)
			{
				throw;
			}
		}

		[RequiresAnyPermission("GlobalAdmin")]
		public async Task<string> Post(PostDeleteFeedbackRequest request)
		{
			try
			{
				Feedback feedback = await Db.Feedbacks.FindAsync(request.Id);
				if (feedback != null)
				{
					feedback.Deleted = true;
					await Db.SaveChangesAsync();
					return "Success";
				}
				return null;
			}
			catch (Exception ex)
			{
				throw;
			}
		}

		private async Task<WorkItem> CreateFeedbackOnDevOpsBoard(Feedback data)
		{
			Uri uri = new Uri(_feedbackSetting.FeedbackURL);
			VssBasicCredential credentials = new VssBasicCredential("", _feedbackSetting.PersonalAccessToken);
			JsonPatchDocument patchDocument = new JsonPatchDocument();
			patchDocument.Add(
				new JsonPatchOperation()
				{
					Operation = Operation.Add,
					Path = "/fields/System.Title",
					Value = "Test Bug"
				}
			);
			patchDocument.Add(
				new JsonPatchOperation()
				{
					Operation = Operation.Add,
					Path = "/fields/Microsoft.VSTS.Common.Severity",
					Value = data.Severity != null ? data.Severity : ""
				}
			);
			patchDocument.Add(
				new JsonPatchOperation()
				{
					Operation = Operation.Add,
					Path = "/fields/System.AreaPath",
					Value = _feedbackSetting.ProjectName + "\\" + _feedbackSetting.ProjectSprintBoard,
				}
			);
			patchDocument.Add(
				new JsonPatchOperation()
				{
					Operation = Operation.Add,
					Path = "/fields/Microsoft.VSTS.TCM.SystemInfo",
					Value = browserInfo(data) + deviceInfo(data) ,
				}
			);
			if (data.FeedbackType == FeedbackTypeEnum.Issue)
			{
				patchDocument.Add(
				new JsonPatchOperation()
				{
					Operation = Operation.Add,
					Path = "/fields/System.Description",
					Value = $@"<div>
						<h4>Request for new features</h4>
						{getFeedbackContent(data)}
					</div>
					"
				}
			);
			}
			if (data.FeedbackType == FeedbackTypeEnum.Bug)
			{
				patchDocument.Add(
				new JsonPatchOperation()
				{
					Operation = Operation.Add,
					Path = "/fields/Microsoft.VSTS.TCM.ReproSteps",
					Value = $@"<div>
						<h4>Feedback Description</h4>
						{getFeedbackContent(data)}
					</div>
					"
				}
			);
			}

			try
			{
				VssConnection connection = new VssConnection(uri, credentials);
				WorkItemTrackingHttpClient workItemTrackingHttpClient = await connection.GetClientAsync<WorkItemTrackingHttpClient>();
				WorkItem result = workItemTrackingHttpClient.CreateWorkItemAsync(patchDocument, _feedbackSetting.ProjectName, data.FeedbackType.ToString()).Result;
				return result;
			}
			catch (AggregateException ex)
			{
				throw;
			}
		}

		private string getFeedbackContent(Feedback feedback)
		{

			return $@"
<div>
	<p>{feedback.Description}</p>
	<p>Sumitted By:
	{feedback.UserName}  ({feedback.UserEmail})</p>
<p>Submitted: {feedback.SubmittedDate.ToString("g")}</p>

</div>
";
		}

		private string browserInfo(Feedback feedback)
		{
			if(feedback.Browser == null)
			{
				return "";
			}

			return $@"
<p>Browser {feedback.Browser}</p>
<p>Browser Version {feedback.BrowserVersion}</p>
<p>Computer OS {feedback.ComputerOs} {feedback.ComputerOsVersion}</p>
<p>Language {feedback.Language}</p>
";
		}

		private string deviceInfo(Feedback feedback)
		{
			if(feedback.DeviceOs == null)
			{
				return "";
			}

			return $@"
<p>Device OS {feedback.DeviceOs}</p>
<p>Device Language {feedback.DeviceLanguage}</p>
<p>Device Version {feedback.DeviceVersion}</p>
<p>App Version {feedback.AppVersion}</p>
<p>Build Id {feedback.BuildId}</p>
<p>Battery Percentage {feedback.BatteryPercentage}</p>
<p>Is Low Power Mode {feedback.IsLowPowerMode}</p>
<p>App Permissions {feedback.AppPermissions}</p>
";
		}
	}
}
