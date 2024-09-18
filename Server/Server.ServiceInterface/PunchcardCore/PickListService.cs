using Punchcard.Core.Server.DataModel;
using Punchcard.Core.Server.ServiceModel.Requests;
using ServiceStack;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Punchcard.Core.Server.ServiceInterface.PunchcardCore
{
	public class PickListService : Service
	{
		private readonly AppSettings _appSettings;
		private new readonly DatabaseContext Db;

		public PickListService(AppSettings appSettings, DatabaseContext databaseContext)
		{
			_appSettings = appSettings;
			Db = databaseContext;
		}

		public async Task<PickListItem> Get(PickListItemSingleRequest request)
		{
			var item = await PickListHelper.GetPickListItemAsync(request.Id);
			return item;
		}

		public async Task<List<PickListItem>> Get(PickListItemsRequest request)
		{

			var results = new List<PickListItem>();

			var picklistitems = await PickListHelper.GetPickListItemsAsync();
			if (request.Id != null)
			{
				results.AddRange(picklistitems.FindAll(x => x.PickListTypeId == request.Id));

			}
			else if (!request.TypeCode.IsNullOrEmpty())
			{
				results.AddRange(picklistitems.FindAll(x => x.PickListType.Code == request.TypeCode));

			}
			else
			{
				results.AddRange(picklistitems);
			}

			var session = GetSession();
			if (!session.IsGlobalAdmin())
			{
				var adminOnlyItem = results.Where(r => r.Code == "SystemRoleType").SingleOrDefault();
				if (adminOnlyItem != null)
				{
					results.Remove(adminOnlyItem);
				}
			}

			return results;
		}
		public async Task<PickListType> Get(PickListTypeSingleRequest request)
		{
			var types = await GetPickListTypesAsync();
			var id = request.Id;
			var type = types.Where(x => x.Id == id).FirstOrDefault();
			return type;
		}

		public async Task<List<PickListType>> Get(PickListTypesRequest request)
		{
			var types = await GetPickListTypesAsync();
			return types;
		}
		private async Task<List<PickListType>> GetPickListTypesAsync()
		{
			var types = await PickListHelper.GetPickListTypesAsync();
			return types;
		}

		[RequiresAnyPermission("WritePickList")]
		public async Task<PickListType> Post(PickListTypeRequest request)
		{
			PickListType type = null;

			if (request.Id == null)
			{
				type = new PickListType();
				Db.Add(type);
			}
			else
			{
				type = await Db.PickListTypes.SingleOrDefaultAsync(p => p.Id == request.Id) ?? new PickListType();
			}

			type.IsActive = request.IsActive;
			type.Code = request.Code;
			type.Description = request.Description;
			type.ParentId = request.ParentId;

			await Db.SaveChangesAsync();

			await PickListHelper.RegenerateCacheAsync();
			return type;
		}

		[RequiresAnyPermission("WritePickList")]
		public async Task<PickListItem> Post(PickListItemRequest request)
		{
			var item = await Db.PickListItems.SingleOrDefaultAsync(item => item.Id == request.Id);
			if (item == null)
			{
				item = new PickListItem();
				Db.Add(item);
			}

			item.IsActive = request.IsActive;
			item.Code = request.Code;
			item.Description = request.Description;
			item.IsDefault = request.isDefault;
			item.PickListTypeId = request.PickListTypeId;

			if (request.ParentId != 0)
			{
				item.ParentId = request.ParentId;
			}

			await Db.SaveChangesAsync();
			await PickListHelper.RegenerateCacheAsync();
			return item;
		}
	}
}
