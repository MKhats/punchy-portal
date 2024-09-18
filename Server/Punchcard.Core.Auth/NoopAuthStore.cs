using Punchcard.Core.Auth.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Punchcard.Core.Auth
{
	public class NoopAuthStore : IAuthStore
	{
		class User
		{
			public Guid Id { get; set; }
			public int UserId { get; set; }
			public string DisplayName { get; set; }
			public string FirstName { get; set; }
			public string LastName { get; set; }
			public string Email { get; set; }
			public int TenantId { get; set; }
			public string Roles { get; set; }
		}

		List<User> Users = new List<User>();

		public Task<string> AddUser(string firstName, string lastName, string email, string password, bool forceChange, int userId, int tenantId)
		{
			var tsk = new Task<string>(() =>
			{
				var displayName = firstName + " " + lastName.Trim();
				var usr = new User() { Id = Guid.NewGuid(), DisplayName = displayName, FirstName = firstName, LastName = lastName, Email = email, TenantId = tenantId, UserId = userId };
				Users.Add(usr);
				return usr.Id.ToString();
			});
			tsk.Start();
			return tsk;
		}

		public Task UpdateUser(string azureObjectId, bool isActive, string firstName, string lastName, string email, int userId)
		{
			var tsk = new Task(() =>
			{
				var displayName = firstName + " " + lastName.Trim();
				var id = Guid.Parse(azureObjectId);
				var user = Users.FirstOrDefault(u => u.Id == id);
				if (user == null)
					return;
				user.FirstName = firstName;
				user.LastName = lastName;
				user.DisplayName = displayName;
				user.Email = email;
				user.UserId = userId;
			});
			tsk.Start();
			return tsk;
		}

		public Task UpdateUserPassword(string azureObjectId, string password, bool forceChangePasswordNextLogin, bool isSelfServe)
		{
			throw new NotImplementedException();
		}

		public Task DeleteUser(string azureObjectId)
		{
			throw new NotImplementedException();
		}

		public Task<string> GetStoreIdByEmail(string email)
		{
			throw new NotImplementedException();
		}
	}
}
