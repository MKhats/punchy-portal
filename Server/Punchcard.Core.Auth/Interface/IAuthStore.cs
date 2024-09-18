using System.Threading.Tasks;

namespace Punchcard.Core.Auth.Interface
{
	public interface IAuthStore
	{
		Task<string> AddUser(string firstName, string lastName, string email, string password, bool forceChange, int userId, int tenantId);
		Task UpdateUser(string azureObjectId, bool isActive, string firstName, string lastName, string email, int userId);
		Task UpdateUserPassword(string azureObjectId, string password, bool forceChangePasswordNextLogin, bool isSelfServe);
		Task DeleteUser(string azureObjectId);
		Task<string> GetStoreIdByEmail(string email);
	}
}
