using System;

namespace Punchcard.Core.Auth.Exceptions
{
	public class DuplicateUserException : Exception
	{
		public DuplicateUserException(string message)
			: base(message)
		{
		}
		public DuplicateUserException(string message, Exception InnerException) : base(message, InnerException) { }
	}
}
