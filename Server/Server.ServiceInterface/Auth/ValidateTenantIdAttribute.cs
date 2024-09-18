using Punchcard.Core.Server.ServiceInterface.PunchcardCore;
using ServiceStack;
using ServiceStack.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Punchcard.Core.Server.ServiceInterface.Auth
{
	[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = true)]
	public class ValidateTenantIdAttribute : AuthenticateAttribute
	{
		public List<string> RequiredRoles { get; set; }
		public ValidateTenantIdAttribute(ApplyTo applyTo, params string[] roles)
		{
			this.RequiredRoles = roles.ToList();
			this.ApplyTo = applyTo;
			this.Priority = (int)RequestFilterPriority.RequiredRole;
		}

		public ValidateTenantIdAttribute() : this(ApplyTo.All)
		{ }

		/// <summary>
		/// This can be applied globally or on a service or method
		/// </summary>
		/// <param name="req"></param>
		/// <param name="res"></param>
		/// <param name="requestDto"></param>
		/// <returns></returns>
		public override async Task ExecuteAsync(IRequest req, IResponse res, object requestDto)
		{
			// Yes reflection can be slow, but not that slow this still performs quickly
			var tenantIdProp = requestDto.GetType().GetProperty("TenantId");
			var session = (CustomAuthUserSession)req.GetSession();
			// If there is no tenantId on the DTO then there is nothing for us to do
			if (tenantIdProp == null)
			{
				return;
			}
			// If you have the correct tenant Id or you are an admin then we are good
			else if (((int)tenantIdProp.GetValue(requestDto)) == session.TenantId || session.IsGlobalAdmin())
			{
				return;
			}
			// No teneant Id provided, set it to correct value
			else if (((int)tenantIdProp.GetValue(requestDto)) == 0)
			{
				tenantIdProp.SetValue(requestDto, session.TenantId);
				return;
			}

			res.StatusCode = (int)HttpStatusCode.Forbidden;
			res.StatusDescription = ErrorMessages.InvalidPermission.Localize(req);
			await HostContext.AppHost.HandleShortCircuitedErrors(req, res, requestDto);
		}
	}
}
