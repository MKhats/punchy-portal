using Punchcard.Core.Server.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.ServiceModel.DTO
{
	public class FeedbackDTO
	{
		public int Id { get; set; }
		public string Description { get; set; }

		public string UserName { get; set; }
		public string UserEmail { get; set; }

		// Administative Settings
		public int Priority { get; set; }
		public string Severity { get; set; }
		public FeedbackTypeEnum FeedbackType { get; set; }
		public DateTimeOffset SubmittedDate { get; set; }
		public DateTimeOffset? CompletedDate { get; set; }
		public DateTimeOffset? ElevatedDate { get; set; }
		public bool Deleted { get; set; }
		public bool Dismissed { get; set; }
		public string StatusName
		{
			get
			{
				string status = string.Empty;
				if (Dismissed == true)
				{
					status = "Dismissed";
				}
				else if (CompletedDate != null)
				{
					status = "Completed";
				}
				else if (ElevatedDate != null)
				{
					status = "Elevated";
				}
				else
				{
					status = "Pending";
				}
				return status;
			}
			set { }
		}

		// Browser Settings
		public string Browser { get; set; }
		public string BrowserVersion { get; set; }
		public string ComputerOs { get; set; }
		public string ComputerOsVersion { get; set; }
		public string Language { get; set; }

		// Mobile Settings
		public string DeviceOs { get; set; }
		public string DeviceVersion { get; set; }
		public string DeviceLanguage { get; set; }
		public string AppVersion { get; set; }
		public string BuildId { get; set; }
		public float BatteryPercentage { get; set; }
		public bool IsLowPowerMode { get; set; }
		public string PagesVisited { get; set; }
		public string AppPermissions { get; set; }
	}

}
