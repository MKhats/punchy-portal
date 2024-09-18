using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json.Linq;
using Punchcard.Core.Notification.SendGrid;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using ISendGridClient = SendGrid.ISendGridClient;

namespace Punchcard.Core.Notification.Test
{
	class TestSendGridClient : ISendGridClient
	{
		public Func<SendGridMessage, Response> OnMessage { get; }
		public string UrlPath { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
		public string Version { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
		public string MediaType { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

		public TestSendGridClient(Func<SendGridMessage, Response> onMessage)
		{
			OnMessage = onMessage;
		}

		public AuthenticationHeaderValue AddAuthorization(KeyValuePair<string, string> header)
		{
			throw new NotImplementedException();
		}

		public Task<Response> MakeRequest(HttpRequestMessage request, CancellationToken cancellationToken = default(CancellationToken))
		{
			throw new NotImplementedException();
		}

		public Task<Response> RequestAsync(SendGridClient.Method method, string requestBody = null, string queryParams = null, string urlPath = null, CancellationToken cancellationToken = default(CancellationToken))
		{
			throw new NotImplementedException();
		}

		public Task<Response> SendEmailAsync(SendGridMessage message, CancellationToken cancellationToken = default(CancellationToken))
		{
			return Task.Run(() => { return OnMessage(message); }, cancellationToken);
		}
	};


	[TestClass]
	public class TestSendGridNotificationService
	{

		/// <summary>
		/// Test the template email service succeeds, when an OK response
		/// </summary>
		[TestMethod]
		public void TestSendTemplateEmailAsyncSuccess()
		{
			var notificationService = new SendGridNotificationService(new TestSendGridClient((message) =>
			{
				return new Response(System.Net.HttpStatusCode.Accepted, null, null);
			}));

			var notificationDetails = new TemplateNotificationDetails()
			{
				AddressFrom = "test@punchcard.io",
				AddressTo = "test@punchcard.io",
				TemplateId = "abcd"
			};

			notificationService.SendTemplateNotificationAsync(notificationDetails, null).GetAwaiter().GetResult();
		}

		[TestMethod]
		public void TestSendTemplateEmailVerifyParameters()
		{
			var notificationService = new SendGridNotificationService(new TestSendGridClient((message) =>
			{
				// Ensure correct recipient
				Assert.AreEqual(1, message.Personalizations.Count);
				var personalization = message.Personalizations[0];
				Assert.AreEqual(1, personalization.Tos.Count);
				Assert.AreEqual("to@punchcard.io", personalization.Tos[0].Email);

				// Ensure correct from
				Assert.AreEqual("from@punchcard.io", message.From.Email);

				// Ensure template is correct
				Assert.AreEqual("abcd", message.TemplateId);

				return new Response(System.Net.HttpStatusCode.Accepted, null, null);
			}));

			var notificationDetails = new TemplateNotificationDetails()
			{
				AddressFrom = "from@punchcard.io",
				AddressTo = "to@punchcard.io",
				TemplateId = "abcd"
			};

			notificationService.SendTemplateNotificationAsync(notificationDetails, null).GetAwaiter().GetResult();
		}

		[TestMethod]
		[ExpectedException(typeof(NotificationFailureException))]
		public void TestSendTemplateEmailAsyncFailure()
		{

			var notificationService = new SendGridNotificationService(new TestSendGridClient((message) =>
			{
				return new Response(System.Net.HttpStatusCode.InternalServerError, new StringContent("Something bad happend", System.Text.Encoding.ASCII), null);
			}));

			var notificationDetails = new TemplateNotificationDetails()
			{
				AddressFrom = "from@punchcard.io",
				AddressTo = "to@punchcard.io",
				TemplateId = "abcd"
			};

			notificationService.SendTemplateNotificationAsync(notificationDetails, null).GetAwaiter().GetResult();
		}

		[TestMethod]
		public void TestSendTemplateEmailAsyncBadAddressTo()
		{
			var notificationService = new SendGridNotificationService(new TestSendGridClient((message) =>
			{
				return new Response(System.Net.HttpStatusCode.InternalServerError, null, null);
			}));

			// Assert empty to
			Assert.ThrowsException<ArgumentException>(() =>
			{
				notificationService.SendTemplateNotificationAsync(new TemplateNotificationDetails()
				{
					AddressFrom = "from@punchcard.io",
					AddressTo = "",
					TemplateId = "abcd"
				}, null).GetAwaiter().GetResult();
			});
			// Assert null to
			Assert.ThrowsException<ArgumentException>(() =>
			{
				notificationService.SendTemplateNotificationAsync(new TemplateNotificationDetails()
				{
					AddressFrom = "from@punchcard.io",
					AddressTo = null,
					TemplateId = "abcd"
				}, null).GetAwaiter().GetResult();
			});
		}

		[TestMethod]
		public void TestSendTemplateEmailAsyncBadAddressFrom()
		{
			var notificationService = new SendGridNotificationService(new TestSendGridClient((message) =>
			{
				return new Response(System.Net.HttpStatusCode.InternalServerError, null, null);
			}));

			// Assert empty from
			Assert.ThrowsException<ArgumentException>(() =>
			{
				notificationService.SendTemplateNotificationAsync(new TemplateNotificationDetails()
				{
					AddressFrom = "",
					AddressTo = "to@punchcard.io",
					TemplateId = "abcd"
				}, null).GetAwaiter().GetResult();
			});
			// Assert null from
			Assert.ThrowsException<ArgumentException>(() =>
			{
				notificationService.SendTemplateNotificationAsync(new TemplateNotificationDetails()
				{
					AddressFrom = null,
					AddressTo = "to@punchcard.io",
					TemplateId = "abcd"
				}, null).GetAwaiter().GetResult();
			});
		}

		[TestMethod]
		public void TestSendTemplateEmailAsyncBadTemplateId()
		{
			var notificationService = new SendGridNotificationService(new TestSendGridClient((message) =>
			{
				return new Response(System.Net.HttpStatusCode.InternalServerError, null, null);
			}));

			// Assert empty from
			Assert.ThrowsException<ArgumentException>(() =>
			{
				notificationService.SendTemplateNotificationAsync(new TemplateNotificationDetails()
				{
					AddressFrom = "from@punchcard.io",
					AddressTo = "to@punchcard.io",
					TemplateId = ""
				}, null).GetAwaiter().GetResult();
			});
			// Assert null from
			Assert.ThrowsException<ArgumentException>(() =>
			{
				notificationService.SendTemplateNotificationAsync(new TemplateNotificationDetails()
				{
					AddressFrom = "from@punchcard.io",
					AddressTo = "to@punchcard.io",
					TemplateId = null
				}, null).GetAwaiter().GetResult();
			});
		}

		[TestMethod]
		public void TestSendTemplateEmailVerifySubstitutions()
		{
			var notificationService = new SendGridNotificationService(new TestSendGridClient((message) =>
			{
				// Ensure correct recipient
				Assert.AreEqual(1, message.Personalizations.Count);
				var personalization = message.Personalizations[0];
				Assert.AreEqual(1, personalization.Tos.Count);
				Assert.AreEqual("to@punchcard.io", personalization.Tos[0].Email);

				// Ensure correct from
				Assert.AreEqual("from@punchcard.io", message.From.Email);

				// Ensure template is correct
				Assert.AreEqual("abcd", message.TemplateId);

				// We need to serialize the to get the substitutions
				var tokens = JObject.Parse(message.Serialize());
				var personalizations = tokens["personalizations"];
				var subs = personalizations[0]["substitutions"].ToObject<Dictionary<string, string>>();

				Assert.AreEqual(2, subs.Count);
				Assert.IsTrue(subs.ContainsKey("{{value2}}"));
				Assert.AreEqual("Value 2", subs["{{value2}}"]);

				return new Response(System.Net.HttpStatusCode.Accepted, null, null);
			}));

			var notificationDetails = new TemplateNotificationDetails()
			{
				AddressFrom = "from@punchcard.io",
				AddressTo = "to@punchcard.io",
				TemplateId = "abcd"
			};

			var substitutions = new Dictionary<string, string>
			{
				{"{{value1}}", "Value 1" },
				{"{{value2}}", "Value 2" }
			};

			notificationService.SendTemplateNotificationAsync(notificationDetails, substitutions).GetAwaiter().GetResult();
		}

		[TestMethod]
		public void TestSendEmailVerifyParameters()
		{

			var notificationService = new SendGridNotificationService(new TestSendGridClient((message) =>
			{
				// Ensure correct recipient
				Assert.AreEqual(1, message.Personalizations.Count);
				var personalization = message.Personalizations[0];
				Assert.AreEqual(1, personalization.Tos.Count);
				Assert.AreEqual("to@punchcard.io", personalization.Tos[0].Email);

				// Ensure correct from
				Assert.AreEqual("from@punchcard.io", message.From.Email);

				// Ensure template is correct
				Assert.AreEqual("This is the messageBody", message.PlainTextContent);

				return new Response(System.Net.HttpStatusCode.Accepted, null, null);
			}));

			var notificationDetails = new NotificationDetails()
			{
				AddressFrom = "from@punchcard.io",
				AddressTo = "to@punchcard.io",
			};

			notificationService.SendNotificationAsync(notificationDetails, "This is the messageBody").GetAwaiter().GetResult();
		}

		[TestMethod]
		[ExpectedException(typeof(NotificationFailureException))]
		public void TestSendEmailAsyncFailure()
		{

			var notificationService = new SendGridNotificationService(new TestSendGridClient((message) =>
			{
				return new Response(System.Net.HttpStatusCode.InternalServerError, new StringContent("Something bad happend", System.Text.Encoding.ASCII), null);
			}));

			var notificationDetails = new NotificationDetails()
			{
				AddressFrom = "from@punchcard.io",
				AddressTo = "to@punchcard.io",
			};

			notificationService.SendNotificationAsync(notificationDetails, null).GetAwaiter().GetResult();
		}

		[TestMethod]
		public void TestSendEmailAsyncBadAddressTo()
		{
			var notificationService = new SendGridNotificationService(new TestSendGridClient((message) =>
			{
				return new Response(System.Net.HttpStatusCode.InternalServerError, null, null);
			}));

			// Assert empty to
			Assert.ThrowsException<ArgumentException>(() =>
			{
				notificationService.SendNotificationAsync(new NotificationDetails()
				{
					AddressFrom = "from@punchcard.io",
					AddressTo = "",
				}, null).GetAwaiter().GetResult();
			});
			// Assert null to
			Assert.ThrowsException<ArgumentException>(() =>
			{
				notificationService.SendNotificationAsync(new NotificationDetails()
				{
					AddressFrom = "from@punchcard.io",
					AddressTo = null
				}, null).GetAwaiter().GetResult();
			});
		}

		[TestMethod]
		public void TestSendEmailAsyncBadAddressFrom()
		{
			var notificationService = new SendGridNotificationService(new TestSendGridClient((message) =>
			{
				return new Response(System.Net.HttpStatusCode.InternalServerError, null, null);
			}));

			// Assert empty from
			Assert.ThrowsException<ArgumentException>(() =>
			{
				notificationService.SendNotificationAsync(new NotificationDetails()
				{
					AddressFrom = "",
					AddressTo = "to@punchcard.io",
				}, null).GetAwaiter().GetResult();
			});
			// Assert null from
			Assert.ThrowsException<ArgumentException>(() =>
			{
				notificationService.SendNotificationAsync(new NotificationDetails()
				{
					AddressFrom = null,
					AddressTo = "to@punchcard.io",
				}, null).GetAwaiter().GetResult();
			});
		}

		[TestMethod]
		public void TestSendDynamicTemplateEmailAsyncSuccess()
		{
			var notificationService = new SendGridNotificationService(new TestSendGridClient((message) =>
			{
				return new Response(System.Net.HttpStatusCode.Accepted, null, null);
			}));

			var notificationDetails = new TemplateNotificationDetails()
			{
				AddressFrom = "test@punchcard.io",
				AddressTo = "test@punchcard.io",
				TemplateId = "abcd"
			};

			notificationService.SendDynamicTemplateNotificationAsync(notificationDetails, null).GetAwaiter().GetResult();
		}

		[TestMethod]
		public void TestSendDynamicTemplateEmailVerifyParameters()
		{
			var notificationService = new SendGridNotificationService(new TestSendGridClient((message) =>
			{
				// Ensure correct recipient
				Assert.AreEqual(1, message.Personalizations.Count);
				var personalization = message.Personalizations[0];
				Assert.AreEqual(1, personalization.Tos.Count);
				Assert.AreEqual("to@punchcard.io", personalization.Tos[0].Email);

				// Ensure correct from
				Assert.AreEqual("from@punchcard.io", message.From.Email);

				// Ensure template is correct
				Assert.AreEqual("abcd", message.TemplateId);

				return new Response(System.Net.HttpStatusCode.Accepted, null, null);
			}));

			var notificationDetails = new TemplateNotificationDetails()
			{
				AddressFrom = "from@punchcard.io",
				AddressTo = "to@punchcard.io",
				TemplateId = "abcd"
			};

			notificationService.SendDynamicTemplateNotificationAsync(notificationDetails, null).GetAwaiter().GetResult();
		}

		[TestMethod]
		[ExpectedException(typeof(NotificationFailureException))]
		public void TestSendDynamicTemplateEmailAsyncFailure()
		{

			var notificationService = new SendGridNotificationService(new TestSendGridClient((message) =>
			{
				return new Response(System.Net.HttpStatusCode.InternalServerError, new StringContent("Something bad happend", System.Text.Encoding.ASCII), null);
			}));

			var notificationDetails = new TemplateNotificationDetails()
			{
				AddressFrom = "from@punchcard.io",
				AddressTo = "to@punchcard.io",
				TemplateId = "abcd"
			};

			notificationService.SendDynamicTemplateNotificationAsync(notificationDetails, null).GetAwaiter().GetResult();
		}

		[TestMethod]
		public void TestSendDynamicTemplateEmailAsyncBadAddressTo()
		{
			var notificationService = new SendGridNotificationService(new TestSendGridClient((message) =>
			{
				return new Response(System.Net.HttpStatusCode.InternalServerError, null, null);
			}));

			// Assert empty to
			Assert.ThrowsException<ArgumentException>(() =>
			{
				notificationService.SendDynamicTemplateNotificationAsync(new TemplateNotificationDetails()
				{
					AddressFrom = "from@punchcard.io",
					AddressTo = "",
					TemplateId = "abcd"
				}, null).GetAwaiter().GetResult();
			});
			// Assert null to
			Assert.ThrowsException<ArgumentException>(() =>
			{
				notificationService.SendDynamicTemplateNotificationAsync(new TemplateNotificationDetails()
				{
					AddressFrom = "from@punchcard.io",
					AddressTo = null,
					TemplateId = "abcd"
				}, null).GetAwaiter().GetResult();
			});
		}

		[TestMethod]
		public void TestSendDynamicTemplateEmailAsyncBadAddressFrom()
		{
			var notificationService = new SendGridNotificationService(new TestSendGridClient((message) =>
			{
				return new Response(System.Net.HttpStatusCode.InternalServerError, null, null);
			}));

			// Assert empty from
			Assert.ThrowsException<ArgumentException>(() =>
			{
				notificationService.SendDynamicTemplateNotificationAsync(new TemplateNotificationDetails()
				{
					AddressFrom = "",
					AddressTo = "to@punchcard.io",
					TemplateId = "abcd"
				}, null).GetAwaiter().GetResult();
			});
			// Assert null from
			Assert.ThrowsException<ArgumentException>(() =>
			{
				notificationService.SendDynamicTemplateNotificationAsync(new TemplateNotificationDetails()
				{
					AddressFrom = null,
					AddressTo = "to@punchcard.io",
					TemplateId = "abcd"
				}, null).GetAwaiter().GetResult();
			});
		}

		[TestMethod]
		public void TestSendDynamicTemplateEmailAsyncBadTemplateId()
		{
			var notificationService = new SendGridNotificationService(new TestSendGridClient((message) =>
			{
				return new Response(System.Net.HttpStatusCode.InternalServerError, null, null);
			}));

			// Assert empty from
			Assert.ThrowsException<ArgumentException>(() =>
			{
				notificationService.SendDynamicTemplateNotificationAsync(new TemplateNotificationDetails()
				{
					AddressFrom = "from@punchcard.io",
					AddressTo = "to@punchcard.io",
					TemplateId = ""
				}, null).GetAwaiter().GetResult();
			});
			// Assert null from
			Assert.ThrowsException<ArgumentException>(() =>
			{
				notificationService.SendDynamicTemplateNotificationAsync(new TemplateNotificationDetails()
				{
					AddressFrom = "from@punchcard.io",
					AddressTo = "to@punchcard.io",
					TemplateId = null
				}, null).GetAwaiter().GetResult();
			});
		}

		[TestMethod]
		public void TestSendDynamicTemplateEmailVerifySubstitutions()
		{
			var notificationService = new SendGridNotificationService(new TestSendGridClient((message) =>
			{
				// Ensure correct recipient
				Assert.AreEqual(1, message.Personalizations.Count);
				var personalization = message.Personalizations[0];
				Assert.AreEqual(1, personalization.Tos.Count);
				Assert.AreEqual("to@punchcard.io", personalization.Tos[0].Email);

				// Ensure correct from
				Assert.AreEqual("from@punchcard.io", message.From.Email);

				// Ensure template is correct
				Assert.AreEqual("abcd", message.TemplateId);

				// We need to serialize the to get the substitutions
				var tokens = JObject.Parse(message.Serialize());
				var personalizations = tokens["personalizations"];
				var subs = personalizations[0]["dynamic_template_data"];

				Assert.AreEqual(2, subs.Children().Count());
				Assert.IsNotNull(subs["value1"]);
				Assert.AreEqual("Value 1", subs["value1"]);
				Assert.IsNotNull(subs["value2"]);
				Assert.AreEqual("Value 2", subs["value2"]);

				return new Response(System.Net.HttpStatusCode.Accepted, null, null);
			}));

			var notificationDetails = new TemplateNotificationDetails()
			{
				AddressFrom = "from@punchcard.io",
				AddressTo = "to@punchcard.io",
				TemplateId = "abcd"
			};

			var substitutions = new
			{
				value1 = "Value 1",
				value2 = "Value 2"
			};

			notificationService.SendDynamicTemplateNotificationAsync(notificationDetails, substitutions).GetAwaiter().GetResult();
		}

	}
}
