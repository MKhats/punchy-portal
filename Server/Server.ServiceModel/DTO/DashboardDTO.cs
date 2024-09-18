using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.ServiceModel.DTO
{
	public class DashboardDTO
	{
		public List<PurchaseDTO> purchases { get; set; }
		public List<MerchandiseDTO> merchandises { get; set; }
		public ChartDTO chartRevenueTotal { get; set; }
		public ChartDTO chartTablesTotal { get; set; }
	}
	public class ChartDTO
	{
		public List<decimal> Amounts { get; set; }
		public List<string> YAxisLabels { get; set; }
	}
	
}
