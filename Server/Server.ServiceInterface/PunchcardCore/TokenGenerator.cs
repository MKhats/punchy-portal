using System.Security.Cryptography;
using System.Text;

namespace Punchcard.Core.Server.ServiceInterface.PunchcardCore
{
	public static class TokenGenerator
	{
		public static string GetUniqueKey(int length)
		{
			char[] chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.-".ToCharArray();
			byte[] data = new byte[length];
			using (RNGCryptoServiceProvider crypto = new RNGCryptoServiceProvider())
			{
				crypto.GetBytes(data);
			}
			StringBuilder result = new StringBuilder(length);
			foreach (byte b in data)
			{
				result.Append(chars[b % (chars.Length)]);
			}
			return result.ToString();
		}
	}
}
