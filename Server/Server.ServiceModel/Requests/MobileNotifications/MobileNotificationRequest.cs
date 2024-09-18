using System;
using System.Collections.Generic;
using ServiceStack;

namespace Server.ServiceModel.Requests.MobileNotifications
{
	[Route("/mobile/notification/installation/", "POST")]
	public class MobileNotificationInstallRequest
	{
		public string InstallationId { get; set; }
		public string Platform { get; set; }
		public string PushChannel { get; set; }

		public IList<string> Tags { get; set; } = Array.Empty<string>();
	}
	[Route("/mobile/notification/requests/", "POST")]
	public class MobileNotificationRequest
	{
		public string Text { get; set; }
		public string Action { get; set; }
		public string[] Tags { get; set; } = Array.Empty<string>();
		public bool Silent { get; set; }
	}
	[Route("/mobile/notification/installations/{installationId}", "DELETE")]
	public class MobileNotificationDeleteInstallation
	{
		public string InstallationId { get; set; }
	}
}

