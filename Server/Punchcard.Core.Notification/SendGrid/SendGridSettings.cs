namespace Punchcard.Core.Notification.SendGrid
{
	public class SendGridSettings
	{
		public static string AppSettingsKey { get; } = "SendGridSettings";
		public string APIKey { get; set; }
		public string NewUserTemplateId { get; set; }
		public string AddressFrom { get; set; }
		public string PurchaseTemplateId { get; set; }
		public string BidderListTemplateId { get; set; }
	}
}
