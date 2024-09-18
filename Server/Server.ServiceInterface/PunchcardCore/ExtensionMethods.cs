using System;
using System.Collections.Generic;
using System.Text;

namespace Punchcard.Core.Server.ServiceInterface.PunchcardCore
{
	public static class ExtensionMethods
	{
		private static readonly string GlobalAdmin = "GlobalAdmin";
		//public static bool IsGlobalAdmin(this ServiceStack.Service service)
		//{
		//	var session = service.GetSession();
		//	if (session.Permissions == null)
		//		return false;
		//	return session.Permissions.Contains(GlobalAdmin);
		//}

		public static bool IsGlobalAdmin(this ServiceStack.Auth.IAuthSession session)
		{
			if (session == null || session.Permissions == null)
				return false;
			return session.Permissions.Contains(GlobalAdmin);
		}
	}
}
