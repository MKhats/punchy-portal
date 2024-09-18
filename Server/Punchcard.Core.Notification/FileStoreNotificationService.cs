using Punchcard.Core.Notification.Interface;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Punchcard.Core.Notification
{
	public class FileStoreNotificationService : INotificationService
	{
		private string Location { get; }

		public FileStoreNotificationService(string storeDirectoryPath)
		{
			if (!Directory.Exists(storeDirectoryPath))
				Directory.CreateDirectory(storeDirectoryPath);
			Location = storeDirectoryPath;

		}

		public Task SendTemplateNotificationAsync(TemplateNotificationDetails notificationDetails, Dictionary<string, string> messageParameters)
		{
			return Task.Run(() =>
			{
				var path = Path.Combine(Location, $"{Guid.NewGuid()}.txt");
				var stream = new FileStream(path, FileMode.Create);
				var writer = new StreamWriter(stream);

				writer.WriteLine($"To: {notificationDetails.AddressTo}");
				writer.WriteLine($"From: {notificationDetails.AddressFrom}");
				writer.WriteLine($"Template ID: {notificationDetails.TemplateId}");
				foreach (var param in messageParameters)
				{
					writer.WriteLine($"{param.Key} : {param.Value}");
				}
				writer.Flush();
				stream.Close();

			});
		}

		public Task SendNotificationAsync(NotificationDetails notificationDetails, string messageBody)
		{
			return Task.Run(() =>
			{
				var stream = new FileStream($"{Guid.NewGuid()}.txt", FileMode.Create);
				var writer = new StreamWriter(stream);

				writer.WriteLine($"To: {notificationDetails.AddressTo}");
				writer.WriteLine($"From: {notificationDetails.AddressFrom}");
				writer.WriteLine(messageBody);

				stream.Flush();
				stream.Close();

			});
		}

		public Task SendDynamicTemplateNotificationAsync(TemplateNotificationDetails notificationDetails, object messageParameters)
		{
			throw new NotImplementedException();
		}
	}
}
