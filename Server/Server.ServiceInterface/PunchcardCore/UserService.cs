using AutoMapper;
using Punchcard.Core.Auth.Exceptions;
using Punchcard.Core.Auth.Interface;
using Punchcard.Core.Notification;
using Punchcard.Core.Notification.Interface;
using Punchcard.Core.Notification.SendGrid;
using Punchcard.Core.Server.DataModel;
using Punchcard.Core.Server.ServiceModel.DTO;
using Punchcard.Core.Server.ServiceModel.Requests;
using ServiceStack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Punchcard.Core.Server.ServiceInterface.PunchcardCore
{
	public class UserService: Service
	{
		public IAuthStore AuthStore { get; }
		public INotificationService NotificationService { get; }
		private readonly AppSettings _appSettings;
		private new readonly DatabaseContext Db;
		private readonly SendGridSettings _sendGridSettings;

		public UserService(IAuthStore authProvider, INotificationService notificationService, AppSettings appSettings, SendGridSettings sendGridSettings, DatabaseContext database)
		{
			AuthStore = authProvider;
			NotificationService = notificationService;

			_appSettings = appSettings;
			Db=database;
			_sendGridSettings = sendGridSettings;
		}

		public async Task<PunchcardUser> Get(PunchcardUserDetailsRequest request)
		{
			var session = (CustomAuthUserSession)GetSession();
			if (session.Permissions.Contains(_appSettings.Authorization.GlobalAdminRoleName))
			{
				return await Db.PunchcardUsers.SingleOrDefaultAsync(ud => ud.Id == request.Id);
			}

			return await Db.PunchcardUsers.SingleOrDefaultAsync(ud => ud.Id == request.Id && ud.TenantId == session.TenantId);
		}

		public async Task<CurrentUserDTO> Get(CurrentUserRequest request)
		{
			try
			{
				var currentUser = (CustomAuthUserSession)GetSession();
				var user = await Db.PunchcardUsers.SingleOrDefaultAsync(u => u.AzureObjectId == currentUser.UserAuthId);

				if (user == null)
				{
					throw new HttpError(HttpStatusCode.NotFound,
						"No matching database record exists for the current user.");
				}
				CurrentUserDTO userDTO = await GetCurrentUserDTO(user, currentUser.Roles);
				return userDTO;
			}
			catch (Exception e)
			{
				throw;
			}
		}

		public async Task<CurrentUserDTO> GetCurrentUserDTO(PunchcardUser user, List<string> roles)
		{
			var config = new MapperConfiguration(cfg => cfg.CreateMap<PunchcardUser, CurrentUserDTO>());
			var mapper = config.CreateMapper();

			var response = mapper.Map<PunchcardUser, CurrentUserDTO>(user);
			response.Roles = roles;
			// note that when we decide to use RolePermission cache, each role has to have a proper roleTypeId;
			// otherwise it won't work
			var roleIds = await RolePermissionCache.GetRoleIdsAsync(user.AzureObjectId);
			if (roleIds != null)
			{
				try
				{
					response.Permissions = await RolePermissionCache.GetPermissionsFromCacheAsync(user.AzureObjectId);
				}
				catch
				{
					response.Permissions = new List<string>();
				}
			}
			return response;
		}
		public async Task<CurrentUserDTO> Post(UpdateTenantUserInfoRequest request)
		{
			var currentUser = (CustomAuthUserSession)GetSession();
			var userDetails = await Db.PunchcardUsers.SingleOrDefaultAsync(ud => ud.AzureObjectId == currentUser.Id);

			userDetails.FirstName = request.FirstName;
			userDetails.LastName = request.LastName;
			userDetails.Email = request.Email;
			userDetails.LastModifiedBy = currentUser.DisplayName;

			await UpdateUserAsync(userDetails, null, true);
			CurrentUserDTO userDTO = await GetCurrentUserDTO(userDetails, currentUser.Roles);
			await Db.SaveChangesAsync();
			return userDTO;

		}

		public async Task<CurrentUserDTO> Post(UpdateTenantUserPasswordRequest request)
		{
			var currentUser = (CustomAuthUserSession)GetSession();
			var userDetails = await Db.PunchcardUsers.SingleOrDefaultAsync(ud => ud.AzureObjectId == currentUser.Id);

			userDetails.LastModifiedBy = currentUser.DisplayName;

			await UpdateUserAsync(userDetails, request.Password, true);
			CurrentUserDTO userDTO = await GetCurrentUserDTO(userDetails, currentUser.Roles);
			return userDTO;

		}

		[RequiresAnyPermission("WriteUser")]
		public async Task<PunchcardUser> Post(UpsertTenantUserRequest request)
		{
			var currentUser = (CustomAuthUserSession)GetSession();
			var validatedRoleIds = new List<string>();
			var password = "";
			foreach (var roleId in request.RoleIds)
			{
				validatedRoleIds.Add(roleId.ToString());
			}

			// Only Global admins can change tenants
			var validatedTenantId = currentUser.TenantId;
			if (request.TenantId.HasValue && currentUser.Permissions.Contains(_appSettings.Authorization.GlobalAdminRoleName))
			{
				validatedTenantId = request.TenantId.Value;
			}
			var userDetails = await Db.PunchcardUsers.SingleOrDefaultAsync(ud => ud.Id == request.Id && ud.TenantId == validatedTenantId);

			// Adding new organizationUser
			if (userDetails == null)
			{
				userDetails = new PunchcardUser();
				Db.Add(userDetails);
				var config = new MapperConfiguration(cfg => cfg.CreateMap<UserDetailsDTO, PunchcardUser>()
					.ForMember(u => u.Id, act => act.Ignore()));
				var mapper = config.CreateMapper();

				mapper.Map<UserDetailsDTO, PunchcardUser>(request, userDetails);

				userDetails.AzureObjectId = "";
				userDetails.TenantId = validatedTenantId;
				userDetails.LastModifiedBy = currentUser.DisplayName;
				userDetails.RolesList = validatedRoleIds.Join(",");

				// @1 to ensure we pass password complexity rules
				password = TokenGenerator.GetUniqueKey(8) + "@1";
				// Add the user to the AuthStore
				await AddUserToAuthStoreAsync(userDetails, password);

				// send welcome email to user
				if (NotificationService != null)
				{
					var messageDetails = new TemplateNotificationDetails()
					{
						AddressTo = userDetails.Email,
						AddressFrom = _sendGridSettings.AddressFrom,
						// This should be factored out. I just don't know to where.
						TemplateId = _sendGridSettings.NewUserTemplateId
					};
					var messageParams = new
					{
						firstName = userDetails.FirstName,
						password
					};
					try
					{
						await NotificationService.SendDynamicTemplateNotificationAsync(messageDetails, messageParams);
					}
					catch
					{
						// Ignore a notification error
					}
				}
			}
			else
			{
				var config = new MapperConfiguration(cfg => cfg.CreateMap<UserDetailsDTO, PunchcardUser>());
				var mapper = config.CreateMapper();

				mapper.Map<UserDetailsDTO, PunchcardUser>(request, userDetails);
				userDetails.TenantId = validatedTenantId;
				userDetails.LastModifiedBy = currentUser.DisplayName;
				userDetails.RolesList = validatedRoleIds.Join(",");
				await UpdateUserAsync(userDetails, request.Password);
			}

			var xrefs = Db.PunchcardUserXrefRoles.Where(xref => xref.UserId == userDetails.Id);
			Db.RemoveRange(xrefs);
			await Db.SaveChangesAsync();
			
			var newRoles = request.RoleIds.Select(id => new PunchcardUserXrefRole { RoleId = id, UserId = userDetails.Id }).ToList();
			Db.AddRange(newRoles);
			await Db.SaveChangesAsync();
			
			await UpdateUserAsync(userDetails, request.Password);
			RolePermissionCache.InvalidateCacheAndRegenerate();
			return userDetails;
		}

		public async Task<Boolean> Delete(DeleteUserRequest request)
		{
			var currentUser = (CustomAuthUserSession)GetSession();
			var userDetails = await Db.PunchcardUsers.SingleOrDefaultAsync(u => u.AzureObjectId == currentUser.Id);

			return await DeleteUser(userDetails, userDetails.FirstName + ' ' + userDetails.LastName);
		}

		[RequiresAnyPermission("WriteUser")]
		public async Task<Boolean> Delete(DeleteTenantUserRequest request)
		{
			var currentUser = (CustomAuthUserSession)GetSession();
			var userDetails = await Db.PunchcardUsers.SingleOrDefaultAsync(u => u.Id == request.UserId);
			var deletedBy = await Db.PunchcardUsers.SingleOrDefaultAsync(u => u.AzureObjectId == currentUser.Id);

			return await DeleteUser(userDetails, deletedBy.FirstName + ' ' + deletedBy.LastName);
		}

		private async Task<Boolean> DeleteUser(PunchcardUser userDetails, string deletedBy)
		{
			// remove b2c account
			await AuthStore.DeleteUser(userDetails.AzureObjectId);
			var xrefs = Db.PunchcardUserXrefRoles.Where(xref => xref.UserId == userDetails.Id);
			Db.RemoveRange(xrefs);

			// update fields to empty
			userDetails.AzureObjectId = "";
			userDetails.FirstName = "Deleted";
			userDetails.LastName = "User";
			userDetails.IsActive = false;
			userDetails.LastModifiedBy = deletedBy;
			userDetails.Email = "";
			await Db.SaveChangesAsync();
			return true;
		}


		[RequiresAnyPermission("ReadUser")]
		public async Task<List<PunchcardUser>> Get(GetAllTenantUsersRequest request)
		{
			var session = (CustomAuthUserSession)GetSession();
			var tenantId = session.TenantId;

			if (request.TenantId.HasValue && session.Permissions.Contains(_appSettings.Authorization.GlobalAdminRoleName))
			{
				tenantId = request.TenantId.Value;
			}

			var users = await Db.PunchcardUsers
				.Where(x => x.TenantId == tenantId)
				.OrderByDescending(x => x.LastName)
				.ToListAsync();

			return users;
		}

		[RequiresAnyPermission("ReadUser")]
		public async Task<UserDetailsDTO> Get(GetTenantUserRequest request)
		{
			var session = (CustomAuthUserSession)GetSession();
			if (!GetSession().IsGlobalAdmin() && ((CustomAuthUserSession)GetSession()).TenantId != request.TenantId)
			{
				throw new Exception("Permission Denied");
			}
			// Find the organizations user
			var user = await Db.PunchcardUsers.SingleOrDefaultAsync(u => u.TenantId == request.TenantId && u.Id == request.UserId);

			if (user == null)
				throw new Exception("User does not exist");

			// Get the xref for user roles
			var userRoles = await Db.PunchcardUserXrefRoles.Where(xref => xref.UserId == request.UserId).ToListAsync();

			var config = new MapperConfiguration(cfg => cfg.CreateMap<PunchcardUser, UserDetailsDTO>());
			var mapper = config.CreateMapper();
			var userDto = mapper.Map<PunchcardUser, UserDetailsDTO>(user);

			// Add normal type permissions into user object.
			if (userRoles != null)
				userDto.RoleIds = userRoles.Select(x => x.RoleId).ToList();

			return userDto;
		}

		[RequiresAnyPermission("ReadUser")]
		public async Task<List<string>> Get(GetTenantUserEmailsRequest request)
		{
			var session = (CustomAuthUserSession)GetSession();
			if (!GetSession().IsGlobalAdmin() && ((CustomAuthUserSession)GetSession()).TenantId != request.TenantId)
			{
				throw new Exception("Permission Denied");
			}
			var tenantUserEmails = await Db.PunchcardUsers
				.Where(x => x.TenantId == request.TenantId)
				.Select(x => x.Email)
				.ToListAsync();

			return tenantUserEmails;
		}

		// TODO: These need to be factored into their own class, where the story of
		// adding / updating users in the AuthStore and our DB can be better seen.
		// with the change to EFCore this method feels even more hacky.
		/// <summary>
		/// 
		/// </summary>
		/// <param name="userDetails">Expected to be tracked by EF already.</param>
		/// <param name="password"></param>
		/// <returns></returns>
		public async Task AddUserToAuthStoreAsync(PunchcardUser userDetails, string password)
		{
			try
			{
				//save to ensure Id
				await Db.SaveChangesAsync();
				var objectId = await AuthStore.AddUser(userDetails.FirstName, userDetails.LastName, userDetails.Email, password, false, userDetails.Id, userDetails.TenantId.Value);
				// save the resulting authstore id
				userDetails.AzureObjectId = objectId;
				await Db.SaveChangesAsync();
			}
			catch (DuplicateUserException)
			{
				try
				{
					// If it already exists then we need to lookup  azureObjectId and save it to the database
					var storeId = AuthStore.GetStoreIdByEmail(userDetails.Email).Result;
					if (storeId != null)
					{
						userDetails.AzureObjectId = storeId;
						await Db.SaveChangesAsync();
					}
				}
				catch
				{
					Db.Remove(userDetails);
					await Db.SaveChangesAsync();
					throw;
				}
			}
			catch
			{
				Db.Remove(userDetails);
				await Db.SaveChangesAsync();
				throw;
			}
		}

		public async Task<int> AddDefaultTenant(Tenant tenant)
		{
			var savedTenant = await Db.Tenants.SingleOrDefaultAsync(t => t.Name == tenant.Name);
			if (savedTenant == null)
			{
				Db.Add(tenant);
				await Db.SaveChangesAsync();
				savedTenant = await Db.Tenants.SingleOrDefaultAsync(t => t.Name == tenant.Name);
			}
			return savedTenant.Id;
		}

		public async Task<PunchcardUser> GetUserByEmailAsync(string email)
		{
			return await Db.PunchcardUsers.SingleOrDefaultAsync(usr => usr.Email == email);
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="userDetails">Expected to be tracked by EF already</param>
		/// <returns></returns>
		public async Task UpdateUserAsync(PunchcardUser userDetails, string password, bool isSelfServe=false)
		{
			await AuthStore.UpdateUser(userDetails.AzureObjectId, userDetails.IsActive, userDetails.FirstName, userDetails.LastName, userDetails.Email, userDetails.Id);
			if (password != null && _appSettings.Authorization.AllowUserPasswordChange == true)
			{
				bool forceChangePasswordNextLogin = _appSettings.Authorization.ForceChangePasswordNextLogin;
				await AuthStore.UpdateUserPassword(userDetails.AzureObjectId, password, forceChangePasswordNextLogin, isSelfServe);
			}
			await Db.SaveChangesAsync();
		}
	}
}