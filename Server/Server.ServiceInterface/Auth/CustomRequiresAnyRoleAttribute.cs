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
	public class CustomRequiresAnyRoleAttribute : AuthenticateAttribute
	{
		public List<string> RequiredRoles { get; set; }
		public CustomRequiresAnyRoleAttribute(ApplyTo applyTo, params string[] roles)
		{
			this.RequiredRoles = roles.ToList();
			this.ApplyTo = applyTo;
			this.Priority = (int)RequestFilterPriority.RequiredRole;
		}

		public CustomRequiresAnyRoleAttribute(params string[] roles)
			: this(ApplyTo.All, roles)
		{ }
		public override async Task ExecuteAsync(IRequest req, IResponse res, object requestDto)
		{
			if (HostContext.HasValidAuthSecret(req))
				return;

			await base.ExecuteAsync(req, res, requestDto); //first check if session is authenticated
			if (res.IsClosed)
				return; //AuthenticateAttribute already closed the request (ie auth failed)

			var session = req.GetSession();


			if (this.RequiredRoles.Any(role => session.Roles.Contains(role)))
			{

				return;
			}


			res.StatusCode = (int)HttpStatusCode.Forbidden;
			res.StatusDescription = ErrorMessages.InvalidRole.Localize(req);
			await HostContext.AppHost.HandleShortCircuitedErrors(req, res, requestDto);
		}
	}
}
