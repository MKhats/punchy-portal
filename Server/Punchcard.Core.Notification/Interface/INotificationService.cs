using System.Collections.Generic;
using System.Threading.Tasks;

namespace Punchcard.Core.Notification.Interface
{
	public interface INotificationService
	{
		Task SendDynamicTemplateNotificationAsync(TemplateNotificationDetails notificationDetails, object messageParameters);
		Task SendTemplateNotificationAsync(TemplateNotificationDetails notificationDetails, Dictionary<string, string> messageParameters);
		Task SendNotificationAsync(NotificationDetails notificationDetails, string messageBody);
	}
}
