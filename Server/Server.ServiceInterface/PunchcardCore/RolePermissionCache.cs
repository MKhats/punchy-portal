using LazyCache;
using Microsoft.EntityFrameworkCore;
using Punchcard.Core.Server.DataModel;
using ServiceStack;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Punchcard.Core.Server.ServiceInterface.PunchcardCore
{
	public static class RolePermissionCache
	{
		private static readonly IAppCache Cache = HostContext.TryResolve<IAppCache>();
		private static readonly IDbContextFactory<DatabaseContext> DbFactory = HostContext.TryResolve<IDbContextFactory<DatabaseContext>>();
		private const string NormalRolePermissionCacheKeyName = "NormalRolePermissions";
		private const string NormalRoleIdsCacheKeyName = "NormalRoleIds";


		public static void InvalidateCacheAndRegenerate()
		{
			Cache.Remove(NormalRolePermissionCacheKeyName);
			Cache.Remove(NormalRoleIdsCacheKeyName);
		}

		public static async Task<Dictionary<int, List<Permission>>> GetNormalRolePermissionsAsync()
		{
			Func<Task<Dictionary<int, List<Permission>>>> getCache = async () => await RegenerateNormalRoleCache();
			return await Cache.GetOrAddAsync(NormalRolePermissionCacheKeyName, getCache);
		}

		public static async Task<List<int>> GetRoleIdsAsync(string authSub)
		{
			Func<Task<List<int>>> getCache = async () => await FindRoleIdsAsync(authSub);
			return await Cache.GetOrAddAsync(NormalRoleIdsCacheKeyName + authSub, getCache);
		}

		private static async Task<List<int>> FindRoleIdsAsync(string authSub)
		{
			var results = new List<int>();
			using (var Db = await DbFactory.CreateDbContextAsync())
			{
				var query = from xref in Db.PunchcardUserXrefRoles
							where xref.User.AzureObjectId == authSub
							select xref.RoleId;

				results = query.ToList();
			}

			return results;
		}

		public static async Task<List<string>> GetPermissionsFromCacheAsync(string authSub)
		{
			var results = new List<string>();
			var normalPermissions = await GetNormalRolePermissionsAsync();
			var roleIds = await GetRoleIdsAsync(authSub);
			foreach (var roleId in roleIds)
			{
				List<Permission> permissionlist;

				if (normalPermissions.TryGetValue(roleId, out permissionlist))
				{
					results.AddRange(permissionlist.Select(x => x.Code));
				}
			}
			return results.Distinct().ToList();
		}

		private static async Task<Dictionary<int, List<Permission>>> RegenerateNormalRoleCache()
		{
			var results = new Dictionary<int, List<Permission>>();
			using (var Db = await DbFactory.CreateDbContextAsync())
			{
				var roles = await Db.Roles.ToListAsync();
				roles.Each((role) =>
				{
					var q = from xref in Db.RoleXrefPermissions
							where xref.RoleId == role.Id
							select xref.Permission;

					results.Add(role.Id, q.ToList());
				});
			}
			return results;
		}

	}
}