using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Punchcard.Core.Server.DataModel;
using Punchcard.Core.Server.ServiceModel.DTO;
using Punchcard.Core.Server.ServiceModel.Requests;
using ServiceStack;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Punchcard.Core.Server.ServiceInterface.PunchcardCore
{
	public class RoleServices : Service
	{
		private readonly AppSettings _appSettings;
		private new readonly DatabaseContext Db;

		public RoleServices(AppSettings appSettings, DatabaseContext databaseContext)
		{
			_appSettings = appSettings;
			Db = databaseContext;
		}

		[RequiresAnyPermission("ReadRole")]
		public async Task<RoleDTO> Get(GetRoleRequest request)
		{
			var config = new MapperConfiguration(cfg => cfg.CreateMap<Role, RoleDTO>());
			var mapper = config.CreateMapper();

			var targetRole = await Db.Roles.SingleOrDefaultAsync(r => r.Id == request.Id);
			var returnedRole = mapper.Map<Role, RoleDTO>(targetRole);
			if (request.Id != -1)
			{
				var xrefPermissionIds = await Db.RoleXrefPermissions.Where(xref => xref.RoleId == request.Id).ToListAsync();
				returnedRole.PermissionIds = xrefPermissionIds.Select(x => x.PermissionId).ToList();
			}
			// if current user is not global admin but trying to access global admin role, deny the access
			if (!GetSession().IsGlobalAdmin())
			{
				var globalAdminPermission = await Db.Permissions.SingleAsync(p => p.Code == "GlobalAdmin");
				if (returnedRole.PermissionIds.Any(id => id == globalAdminPermission.Id))
				{
					throw new HttpError(HttpStatusCode.Unauthorized, "Access denied");
				}
			}
			return returnedRole;
		}

		[RequiresAnyPermission("WriteRole")]
		public async Task<RoleDTO> Post(PostRoleRequest request)
		{
			var role = await Db.Roles.SingleOrDefaultAsync(r => r.Id == request.Id);
			if(role == null)
			{
				role = new Role();
				Db.Add(role);
			}
			else
			{
				// Remove all permission assignments so we can add them again.
				var xrefs = Db.RoleXrefPermissions.Where(xref => xref.RoleId == request.Id);
				Db.RemoveRange(xrefs);
				await Db.SaveChangesAsync();
			}
			role.Name = request.Name;
			role.Description = request.Description;
			await Db.SaveChangesAsync();

			var newPermissions = request.PermissionIds.Select(x => new RoleXrefPermission { RoleId = role.Id, PermissionId = x }).ToList();
			Db.AddRange(newPermissions);
			
			await Db.SaveChangesAsync();

			RolePermissionCache.InvalidateCacheAndRegenerate();

			var config = new MapperConfiguration(cfg => cfg.CreateMap<Role, RoleDTO>());
			var mapper = config.CreateMapper();

			var returnedRole = mapper.Map<Role, RoleDTO>(role);
			returnedRole.PermissionIds = request.PermissionIds;
			return returnedRole;
		}

		[RequiresAnyPermission("ReadRole")]
		public async Task<List<RoleDTO>> Get(GetRolesRequest request)
		{
			var roles = await Db.Roles
				.Include(r => r.RoleXrefPermissions).ToListAsync();

			List<RoleDTO> returnedResult = new List<RoleDTO>();
			roles.ForEach(r => {
				returnedResult.Add(new RoleDTO { 
					Id = r.Id,
					Description = r.Description,
					IsDefault = r.IsDefault,
					Name = r.Name,
					PermissionIds = r.RoleXrefPermissions.Select(x => x.PermissionId).ToList()
				});
			});

			//todo: why? what is this doing?  I think we can remove as we don't use the global admin permission any more.			
			// if current user is not global admin, do not fetch global admin role
			if (!GetSession().IsGlobalAdmin())
			{
				var globalAdminPermission = await Db.Permissions.SingleAsync(p => p.Code == "GlobalAdmin");
				returnedResult.RemoveAll(r => r.PermissionIds.Any(id => id == globalAdminPermission.Id));
			}
			return returnedResult;
		}
	}
}
