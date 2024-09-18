using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Runtime.InteropServices;

namespace Punchcard.Core.Server.DataModel
{
	public enum FeedbackTypeEnum
	{
		Bug = 0,
		Issue = 1,
	}
	public class Feedback
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		[Required]
		public string Description { get; set; }

		[Required]
		public string UserName { get; set; }
		[Required]
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
