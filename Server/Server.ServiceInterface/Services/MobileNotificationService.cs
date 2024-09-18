using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.NotificationHubs;
using Punchcard.Core.Server.ServiceInterface.PunchcardCore;
using Server.ServiceModel.Requests.MobileNotifications;
using ServiceStack;

namespace Punchcard.Core.Server.ServiceInterface.Services
{
	public class MobileNotificationService : Service
	{
		private readonly MobileNotificationSettings _mobileNotificationSettings;

		public MobileNotificationService(MobileNotificationSettings mobileNotificationSettings)
		{
			_mobileNotificationSettings = mobileNotificationSettings;
		}

		public async Task Delete(MobileNotificationDeleteInstallation mobileNotificationDeleteInstallation)
		{
			if (string.IsNullOrWhiteSpace(mobileNotificationDeleteInstallation.InstallationId))
				throw new HttpError(HttpStatusCode.BadRequest,
					"Invalid request");
			var hub = NotificationHubClient.CreateClientFromConnectionString(
				_mobileNotificationSettings.NotificationHubConnectionString,
				_mobileNotificationSettings.NotificationHubName);
			try
			{
				await hub.DeleteInstallationAsync(mobileNotificationDeleteInstallation.InstallationId);
			}
			catch
			{
				throw new HttpError(HttpStatusCode.InternalServerError,
					"An error occured while calling Azure");
			}
		}
		public async Task Post(MobileNotificationInstallRequest deviceInstallation)
		{

			if (string.IsNullOrWhiteSpace(deviceInstallation?.InstallationId) ||
				string.IsNullOrWhiteSpace(deviceInstallation?.Platform) ||
				string.IsNullOrWhiteSpace(deviceInstallation?.PushChannel))
				throw new HttpError(HttpStatusCode.BadRequest,
					"Invalid request");

			var hub = NotificationHubClient.CreateClientFromConnectionString(
				_mobileNotificationSettings.NotificationHubConnectionString,
				_mobileNotificationSettings.NotificationHubName);

			var installationPlatform = new Dictionary<string, NotificationPlatform>
			{
				{ nameof(NotificationPlatform.Apns).ToLower(), NotificationPlatform.Apns },
				{ nameof(NotificationPlatform.Fcm).ToLower(), NotificationPlatform.Fcm }
			};

			var installation = new Installation
			{
				InstallationId = deviceInstallation.InstallationId,
				PushChannel = deviceInstallation.PushChannel,
				Tags = deviceInstallation.Tags
			};

			if (installationPlatform.TryGetValue(deviceInstallation.Platform, out var platform))
				installation.Platform = platform;
			else
				throw new HttpError(HttpStatusCode.InternalServerError,
					"Could not create request body to Azure");

			try
			{
				await hub.CreateOrUpdateInstallationAsync(installation); //3rd party endpoint from azure
			}
			catch
			{
				throw new HttpError(HttpStatusCode.InternalServerError,
					"An error occured while calling Azure");
			}
		}
		public async Task SendMobileNotification(MobileNotificationRequest notificationRequest)
		{
			if ((notificationRequest.Silent &&
				string.IsNullOrWhiteSpace(notificationRequest?.Action)) ||
				(!notificationRequest.Silent &&
				string.IsNullOrWhiteSpace(notificationRequest?.Text)))
				throw new HttpError(HttpStatusCode.BadRequest,
					"Invalid request");

			if ((notificationRequest.Silent &&
				string.IsNullOrWhiteSpace(notificationRequest?.Action)) ||
				(!notificationRequest.Silent &&
				(string.IsNullOrWhiteSpace(notificationRequest?.Text)) ||
				string.IsNullOrWhiteSpace(notificationRequest?.Action)))
				throw new HttpError(HttpStatusCode.BadRequest,
					"Invalid request");

			var hub = NotificationHubClient.CreateClientFromConnectionString(
				_mobileNotificationSettings.NotificationHubConnectionString,
				_mobileNotificationSettings.NotificationHubName);

			var androidPushTemplate = notificationRequest.Silent ?
				_mobileNotificationSettings.SilentAndroid :
				_mobileNotificationSettings.GenericAndroid;

			var iOSPushTemplate = notificationRequest.Silent ?
				_mobileNotificationSettings.SilentIOS :
				_mobileNotificationSettings.GenericIOS;

			var androidPayload = androidPushTemplate
				.Replace("$(alertMessage)", notificationRequest.Text, StringComparison.InvariantCulture)
				.Replace("$(alertAction)", notificationRequest.Action, StringComparison.InvariantCulture);

			var iOSPayload = iOSPushTemplate
				.Replace("$(alertMessage)", notificationRequest.Text, StringComparison.InvariantCulture)
				.Replace("$(alertAction)", notificationRequest.Action, StringComparison.InvariantCulture);

			try
			{
				if (notificationRequest.Tags.Length == 0)
				{
					// This will broadcast to all users registered in the notification hub
					await SendPlatformNotificationsAsync(androidPayload, iOSPayload, hub);
				}
				else if (notificationRequest.Tags.Length <= 20)
				{
					await SendPlatformNotificationsAsync(androidPayload, iOSPayload, notificationRequest.Tags, hub);
				}
				else
				{
					var notificationTasks = notificationRequest.Tags
						.Select((value, index) => (value, index))
						.GroupBy(g => g.index / 20, i => i.value)
						.Select(tags => SendPlatformNotificationsAsync(androidPayload, iOSPayload, tags, hub));

					await Task.WhenAll(notificationTasks);
				}
			}
			catch (Exception e)
			{
				throw new HttpError(HttpStatusCode.InternalServerError,
					"Unexpected error sending notification: " + e);
			}
		}
		public async Task Post(MobileNotificationRequest notificationRequest)
		{
			await SendMobileNotification(notificationRequest);
		}
		Task SendPlatformNotificationsAsync(string androidPayload, string iOSPayload, NotificationHubClient hub)
		{
			var sendTasks = new Task[]
			{
				hub.SendFcmNativeNotificationAsync(androidPayload),
				hub.SendAppleNativeNotificationAsync(iOSPayload)
			};

			return Task.WhenAll(sendTasks);
		}

		Task SendPlatformNotificationsAsync(string androidPayload, string iOSPayload, IEnumerable<string> tags, NotificationHubClient hub)
		{
			var sendTasks = new Task[]
			{
				hub.SendFcmNativeNotificationAsync(androidPayload, tags),
				hub.SendAppleNativeNotificationAsync(iOSPayload, tags)
			};

			return Task.WhenAll(sendTasks);
		}
	}
}

