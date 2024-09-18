using Microsoft.EntityFrameworkCore;
using Punchcard.Core.Server.DataModel;
using ServiceStack;
using ServiceStack.Caching;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Punchcard.Core.Server.ServiceInterface.PunchcardCore
{
	public static class PickListHelper
	{
		private static readonly ICacheClient Cache = HostContext.TryResolve<ICacheClient>();
		private static readonly IDbContextFactory<DatabaseContext> DbFactory = HostContext.TryResolve<IDbContextFactory<DatabaseContext>>();
		private const string PickListItemCacheKeyName = "PickListItems";
		private const string PickListTypesCacheKeyName = "PickListTypes";

		/// <summary>
		/// Retrieves a <see cref="List{T}"/> of all <see cref="PickListItem"/> objects available in the database.
		/// </summary>
		/// <returns>
		///	A <see cref="List{T}"/> of <see cref="PickListItem"/> objects.
		/// </returns>
		/// <remarks>
		///	If the items have been previously cached from the database, then a cached version is returned.
		/// If the database contents have changed, then the cache may be out of date from the database.
		/// </remarks>
		public static async Task<List<PickListItem>> GetPickListItemsAsync()
		{
			var items = Cache.Get<List<PickListItem>>(PickListItemCacheKeyName);
			return items == null || items.Count == 0 ? await RegenerateCacheAsync() : items;
		}

		public static async Task<List<PickListType>> GetPickListTypesAsync()
		{
			var items = Cache.Get<List<PickListType>>(PickListTypesCacheKeyName);
			return items == null || items.Count == 0 ? await RegenerateTypeCacheAsync() : items;
		}

		/// <summary>
		/// Retrieves a <see cref="PickListItem"/> based upon its pick list type code and its own item code.
		/// </summary>
		/// <param name="pickListTypeCode">The pick list type code of the item to retrieve.</param>
		/// <param name="pickListItemCode">The pick list item code of the item to retrieve.</param>
		/// <returns>
		///	A <see cref="PickListItem"/> matching the provided parameters. May be null if no match exists.
		/// </returns>
		public static async Task<PickListItem> GetPickListItem(string pickListTypeCode, string pickListItemCode)
		{
			var items = await GetPickListItemsAsync();
			return items.FirstOrDefault(x => x.Code == pickListItemCode && x.PickListType.Code == pickListTypeCode);
		}

		public static async Task<PickListItem> GetPickListItemAsync(int pickListItemId)
		{
			var items = await GetPickListItemsAsync();
			return items.FirstOrDefault(x => x.Id == pickListItemId);
		}

		public static async Task<PickListItem> GetPickListItem(string pickListItemCode)
		{
			var items = await GetPickListItemsAsync();
			return items.FirstOrDefault(x => x.Code == pickListItemCode);
		}

		/// <summary>
		/// Retrieves the pick list type identifier based upon a provided pick list type code value.
		/// </summary>
		/// <param name="pickListTypeCode">The pick type code to retrieve the type identifier for.</param>
		/// <returns>
		///	A nullable integer value specifying the database identifier for the pick list type code provided.
		/// May be null if no matching pick list type code matches the provided <paramref name="pickListTypeCode"/>.
		/// </returns>
		public static async Task<int?> GetPickListTypeIdAsync(string pickListTypeCode)
		{
			var items = await GetPickListTypesAsync();
			return items.FirstOrDefault(x => x.Code == pickListTypeCode)?.Id;
		}

		/// <summary>
		/// Private helper method that populates the cached copy of all pick list items in the database.
		/// </summary>
		/// <returns>
		///	Returns the retrieved pick list items retrieved from the database that were added to the cache
		/// as a <see cref="List{T}"/> of <see cref="PickListItem"/>.
		/// </returns>
		public static async Task<List<PickListItem>> RegenerateCacheAsync()
		{
			using (var Db = await DbFactory.CreateDbContextAsync())
			{
				var pickListItems = await Db.PickListItems.ToListAsync();
				var picklistTypes = await Db.PickListTypes.ToListAsync();
				Cache.Remove(PickListItemCacheKeyName);
				Cache.Replace(PickListItemCacheKeyName, pickListItems);
				Cache.Remove(PickListTypesCacheKeyName);
				Cache.Replace(PickListTypesCacheKeyName, picklistTypes);
				return pickListItems;
			}
		}
		private static async Task<List<PickListType>> RegenerateTypeCacheAsync()
		{
			using (var Db = await DbFactory.CreateDbContextAsync())
			{
				var picklistTypes = await Db.PickListTypes.ToListAsync();
				Cache.Remove(PickListTypesCacheKeyName);
				Cache.Add(PickListTypesCacheKeyName, picklistTypes);
				return picklistTypes;
			}
		}
	}
}
