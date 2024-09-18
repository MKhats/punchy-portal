using System;

namespace Punchcard.Core.Notification
{
	public class NotificationFailureException : Exception
	{
		public NotificationFailureException(string message)
			: base(message)
		{
		}
	}
}
