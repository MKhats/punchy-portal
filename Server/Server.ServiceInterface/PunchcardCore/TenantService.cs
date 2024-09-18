using Microsoft.EntityFrameworkCore;
using Punchcard.Core.Server.DataModel;
using Punchcard.Core.Server.ServiceModel.DTO;
using Punchcard.Core.Server.ServiceModel.Requests;
using ServiceStack;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Punchcard.Core.Server.ServiceInterface.PunchcardCore
{
	public class TenantService : Service
	{
		private readonly AppSettings _appSettings;

		private new readonly DatabaseContext Db;
		public TenantService(AppSettings appSettings, DatabaseContext databaseContext)
		{
			_appSettings = appSettings;
			Db = databaseContext;
		}
		[RequiresAnyPermission("ReadTenant")]
		public Tenant Get(TenantRequest request)
		{
			return Db.Tenants.SingleOrDefault(t => t.Id == request.Id);
		}
		[RequiresAnyPermission("ReadTenant")]
		public List<Tenant> Get(TenantsRequest request)
		{
			return Db.Tenants.Where(x => x.IsActive).ToList();
		}
		[RequiresAnyPermission("WriteTenant")]
		public async Task<Tenant> Post(TenantUpdateRequest request)
		{
			var currentUser = (CustomAuthUserSession)GetSession();
			var tenant = Db.Tenants.SingleOrDefault(t => t.Id == request.Id);
			if(tenant == null) 
			{
				tenant = new Tenant();
				Db.Tenants.Add(tenant);
			} else
			{
				tenant = await Db.Tenants.SingleOrDefaultAsync(p => p.Id == request.Id) ?? new Tenant();
			}
			tenant.Name = request.Name;
			tenant.IsActive = request.IsActive;
			tenant.LastModifiedBy = currentUser.UserName ?? "";
			await Db.SaveChangesAsync();
			return tenant;
		}

		[RequiresAnyPermission("ReadTenant")]
		public async Task<List<string>> Get(TenantNamesRequest request)
		{
			var allTenants = await Db.Tenants.ToListAsync();
			var tenantNames = new List<string>();

			foreach (var tenant in allTenants)
			{
				var name = tenant.Name;
				tenantNames.Add(name);
			}

			return tenantNames;
		}
	}
}
