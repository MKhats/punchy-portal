using System.ComponentModel.DataAnnotations;
using System;

namespace Punchcard.Core.Server.DataModel
{
	public  class Document
	{
		[Key]
		public int Id { get; set; }
		public int ParentId { get; set; }
		public DocumentParentType ParentType { get; set; }
		public string DocumentName { get; set; }
		public string DocumentURL { get; set; }
		public DateTime UploadDate { get; set; }
		public string UploadUserId { get; set; }
		public bool Deleted { get; set; }
	}
	public enum DocumentParentType
	{
		Merchandise=1,
		Feedback=2,
		Tables=3,
	}
}
