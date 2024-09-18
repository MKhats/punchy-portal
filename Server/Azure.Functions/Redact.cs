using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using System;
using System.Collections.Generic;
using System.Net.Http;

namespace Azure.Functions
{
	public static class Redact
	{
		// check redaction by daily
		[FunctionName("redact")]
		public static void Run([TimerTrigger("0 0 */24 * * *")]TimerInfo myTimer, TraceWriter log)
		{
			log.Info($"C# Timer trigger function executed at: {DateTime.Now}");
			var baseUrl = GetEnvironmentVariable("BASE_URL");

			using (var client = new HttpClient(new HttpClientHandler() { UseDefaultCredentials = true }))
			{
				var url = baseUrl + "/redact.json";
				var secret = GetEnvironmentVariable("SECRET");
				var values = new Dictionary<string, string>
				{
					{ "Secret", secret }
				};
				var content = new FormUrlEncodedContent(values);
				try
				{
					HttpResponseMessage response = client.PostAsync(url, content).Result;
					response.EnsureSuccessStatusCode();
					var message = response.Content.ReadAsStringAsync().Result;
					log.Info($"function finished with message '{message}'");
				}
				catch (Exception e)
				{
					log.Info(e.Message);
				}
			}
		}

		public static string GetEnvironmentVariable(string name)
		{
			return Environment.GetEnvironmentVariable(name, EnvironmentVariableTarget.Process);
		}
	}
}
