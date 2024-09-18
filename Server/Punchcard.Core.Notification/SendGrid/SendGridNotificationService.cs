using Punchcard.Core.Notification.Interface;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace Punchcard.Core.Notification.SendGrid
{

	public class SendGridNotificationService : INotificationService
	{
		private ISendGridClient Client { get; }

		public SendGridNotificationService(string apiKey)
		{
			Client = new SendGridClient(apiKey);
		}

		public SendGridNotificationService(ISendGridClient client)
		{
			Client = client;
		}

		public async Task SendTemplateNotificationAsync(TemplateNotificationDetails notificationDetails, Dictionary<string, string> messageParameters)
		{
			if (string.IsNullOrEmpty(notificationDetails.AddressFrom))
				throw new ArgumentException(nameof(notificationDetails.AddressFrom));
			if (string.IsNullOrEmpty(notificationDetails.AddressTo))
				throw new ArgumentException(nameof(notificationDetails.AddressTo));
			if (string.IsNullOrEmpty(notificationDetails.TemplateId))
				throw new ArgumentException(nameof(notificationDetails.TemplateId));

			var message = new SendGridMessage()
			{
				From = new EmailAddress(notificationDetails.AddressFrom),
				TemplateId = notificationDetails.TemplateId,
			};
			message.AddSubstitutions(messageParameters);
			message.AddTo(notificationDetails.AddressTo);

			var response = await Client.SendEmailAsync(message);
			await AssertSuccessResponseAsync(response);

		}

		public async Task SendNotificationAsync(NotificationDetails notificationDetails, string messageBody)
		{
			if (string.IsNullOrEmpty(notificationDetails.AddressFrom))
				throw new ArgumentException(nameof(notificationDetails.AddressFrom));
			if (string.IsNullOrEmpty(notificationDetails.AddressTo))
				throw new ArgumentException(nameof(notificationDetails.AddressTo));

			var message = new SendGridMessage()
			{
				From = new EmailAddress(notificationDetails.AddressFrom),

			};
			message.PlainTextContent = messageBody;
			message.AddTo(notificationDetails.AddressTo);

			var response = await Client.SendEmailAsync(message);
			await AssertSuccessResponseAsync(response);
		}

		public async Task SendDynamicTemplateNotificationAsync(TemplateNotificationDetails notificationDetails, object messageParameters)
		{
			if (string.IsNullOrEmpty(notificationDetails.AddressFrom))
				throw new ArgumentException(nameof(notificationDetails.AddressFrom));
			if (string.IsNullOrEmpty(notificationDetails.AddressTo))
				throw new ArgumentException(nameof(notificationDetails.AddressTo));
			if (string.IsNullOrEmpty(notificationDetails.TemplateId))
				throw new ArgumentException(nameof(notificationDetails.TemplateId));

			var message = new SendGridMessage()
			{
				From = new EmailAddress(notificationDetails.AddressFrom),
				TemplateId = notificationDetails.TemplateId,
			};
			message.SetTemplateData(messageParameters);
			message.AddTo(notificationDetails.AddressTo);

			var response = await Client.SendEmailAsync(message);
			await AssertSuccessResponseAsync(response);
		}

		private async Task AssertSuccessResponseAsync(Response response)
		{
			if (response.StatusCode != HttpStatusCode.Accepted)
			{
				var errorMessage = response.Body != null ? await response.Body.ReadAsStringAsync() : "Unknown error";
				throw new NotificationFailureException(errorMessage);
			}
		}
	}
}
