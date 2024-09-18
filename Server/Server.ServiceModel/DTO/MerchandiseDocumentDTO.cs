using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.ServiceModel.DTO
{
	public  class MerchandiseDocumentDTO
	{
		public int Id { get; set; }
		public int MerchandiseId { get; set; }
		public string DocumentName { get; set; }
		public string DocumentURL { get; set; }
		public DateTime UploadDate { get; set; }
		public int UploadUserId { get; set; }
	}
}
