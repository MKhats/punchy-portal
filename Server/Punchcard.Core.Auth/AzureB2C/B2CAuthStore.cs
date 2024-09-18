using Azure.Identity;
using Microsoft.Graph;
using Punchcard.Core.Auth.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Punchcard.Core.Auth
{
	public class B2CAuthStore : IAuthStore
	{
		private AzureAdB2CGraphApiSettings Settings { get; }
		const string graphUrl = "https://graph.microsoft.com";
		const string usersEndPoint = "/v1.0/users?";

		public B2CAuthStore(AzureAdB2CGraphApiSettings authSettings)
		{
			Settings = authSettings;
		}

		public async Task<string> AddUser(string firstName, string lastName, string email, string password, bool forceChange, int userId, int tenantId)
		{
			// Set up the Microsoft Graph service client with client credentials
			var displayName = firstName + " " + lastName.Trim();
			var clientSecretCredential = new ClientSecretCredential(Settings.Tenant, Settings.ClientId, Settings.ClientSecret);
			var graphClient = new GraphServiceClient(clientSecretCredential);

			try
			{
				var result = await graphClient.Users
				.Request()
				.AddAsync(new User
				{
					AccountEnabled = true,
					// CreationType
					DisplayName = displayName,
					GivenName = firstName.Trim(),
					Surname = lastName.Trim(),
					PasswordProfile = new PasswordProfile
					{
						Password = password,
						ForceChangePasswordNextSignIn = forceChange
					},
					PasswordPolicies = "DisablePasswordExpiration",
					Identities = new List<ObjectIdentity>
					{
						new ObjectIdentity
						{
							SignInType = "emailAddress",
							Issuer = Settings.Tenant,
							IssuerAssignedId = email.Trim()
						}
					}
				});

				return result.Id;
			}
			catch (Exception ex)
			{
				if (ex.Message.Contains("Another object with the same value for property userPrincipalName already exists"))
				{
					throw new Exceptions.DuplicateUserException("Found an existing user in the b2c store", ex);
				}
				else throw;
			}
		}

		public async Task UpdateUser(bool isActive, string firstName, string lastName, string email, int userId)
		{
			// I wrote this but we may not need it at all.  Is there a case we don't know the azure object id?
			// Set up the Microsoft Graph service client with client credentials
			var clientSecretCredential = new ClientSecretCredential(Settings.Tenant, Settings.ClientId, Settings.ClientSecret);
			var graphClient = new GraphServiceClient(clientSecretCredential);

			var result = await graphClient.Users
			   .Request()
			   .Filter($"identities/any(c:c/issuerAssignedId eq '{email}' and c/issuer eq '{Settings.Tenant}')")
			   .Select(u => u.Id)
			   .GetAsync();

			if (result.Count == 1)
			{
				var user = result.First();
				await UpdateUser(user.Id, isActive, firstName, lastName, email, userId);
			}
			else
			{
				throw new Exception("duplicates detected, space time collapsing");
			}
		}
		public async Task UpdateUser(string azureObjectId, bool isActive, string firstName, string lastName, string email, int userId)
		{
			// Set up the Microsoft Graph service client with client credentials
			var clientSecretCredential = new ClientSecretCredential(Settings.Tenant, Settings.ClientId, Settings.ClientSecret);
			var graphClient = new GraphServiceClient(clientSecretCredential);

			var displayName = firstName + " " + lastName.Trim();
			var result = await graphClient.Users[azureObjectId]
				.Request()
				.UpdateAsync(new User
				{
					AccountEnabled = isActive,
					GivenName = firstName.Trim(),
					Surname = lastName.Trim(),
					DisplayName = displayName,
					MailNickname = userId.ToString(),
					Identities = new List<ObjectIdentity>
					{
						new ObjectIdentity()
						{
							SignInType = "emailAddress",
							Issuer = Settings.Tenant,
							IssuerAssignedId = email
						}
					}
				}) ;
		}

		public async Task UpdateUserPassword(string azureObjectId, string password, bool forceChangePasswordNextLogin, bool isSelfServe = false)
		{
			// Set up the Microsoft Graph service client with client credentials
			var clientSecretCredential = new ClientSecretCredential(Settings.Tenant, Settings.ClientId, Settings.ClientSecret);
			var graphClient = new GraphServiceClient(clientSecretCredential);

			try
			{
				var result = await graphClient.Users[azureObjectId]
				.Request()
				.UpdateAsync(new User
				{
					PasswordProfile = new PasswordProfile
					{
						ForceChangePasswordNextSignIn = isSelfServe == true ? false : forceChangePasswordNextLogin,
						Password = password
					}
				});
			}
			catch
			{
				throw new Exception("Something went wrong while updating B2C password. Make sure the correct permissions are set.");
			}
		}

		public async Task DeleteUser(string azureObjectId)
		{
			// Set up the Microsoft Graph service client with client credentials
			var clientSecretCredential = new ClientSecretCredential(Settings.Tenant, Settings.ClientId, Settings.ClientSecret);
			var graphClient = new GraphServiceClient(clientSecretCredential);
			try
			{
				var request = graphClient.Users[azureObjectId]
					.Request();
				await request.DeleteAsync();
			} catch (Exception ex)
			{
				throw;
			}
		}

		public async Task<string> GetStoreIdByDisplayName(string displayName)
		{
			// Set up the Microsoft Graph service client with client credentials
			var clientSecretCredential = new ClientSecretCredential(Settings.Tenant, Settings.ClientId, Settings.ClientSecret);
			var graphClient = new GraphServiceClient(clientSecretCredential);

			var results = await graphClient.Users
				.Request()
				.Filter($"displayName eq '{displayName}'")
				.Select(u => u.Id)
				.GetAsync();

			if (results.Count() == 1)
			{
				return results.First().Id;
			}
			else
			{
				throw new ArgumentException($"{results.Count()} users found for name {displayName}, expected 1");
			}
		}
		public async Task<string> GetStoreIdByEmail(string email)
		{
			// Set up the Microsoft Graph service client with client credentials
			var clientSecretCredential = new ClientSecretCredential(Settings.Tenant, Settings.ClientId, Settings.ClientSecret);
			var graphClient = new GraphServiceClient(clientSecretCredential);

			var results = await graphClient.Users
				.Request()
				.Filter($"identities/any(c:c/issuerAssignedId eq '{email}' and c/issuer eq '{Settings.Tenant}')")
				.Select(u => u.Id)
				.GetAsync();

			if (results.Count() == 1)
			{
				return results.First().Id;
			}
			else
			{
				throw new ArgumentException($"{results.Count()} users found for login {email}, expected 1");
			}
		}
	}
}
