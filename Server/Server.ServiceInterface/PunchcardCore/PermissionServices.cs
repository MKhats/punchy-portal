using AutoMapper;
using Punchcard.Core.Server.DataModel;
using Punchcard.Core.Server.ServiceModel.DTO;
using Server.ServiceModel.Requests;
using System.Collections.Generic;
using System.Threading.Tasks;
using ServiceStack;
using Microsoft.EntityFrameworkCore;

namespace Punchcard.Core.Server.ServiceInterface.PunchcardCore
{
	public class PermissionServices : Service
	{
		private readonly AppSettings _appSettings;

		private new readonly DatabaseContext Db;

		public PermissionServices(AppSettings appSettings, DatabaseContext databaseContext)
		{
			_appSettings = appSettings;
			Db = databaseContext;
		}

		public async Task<List<PermissionDTO>> Get(GetAllPermissionsRequest request)
		{
			var config = new MapperConfiguration(cfg => cfg.CreateMap<Permission, PermissionDTO>());
			var mapper = config.CreateMapper();
			var permissions = await Db.Permissions.ToListAsync();
			if (!GetSession().IsGlobalAdmin())
			{
				permissions.RemoveAll(p => p.Code == "GlobalAdmin");
			}
			return mapper.Map<List<Permission>, List<PermissionDTO>>(permissions);
		}
	}
}
