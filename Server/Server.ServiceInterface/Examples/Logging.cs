using Microsoft.Extensions.Logging;
using Punchcard.Core.Server.ServiceModel.Examples;
using ServiceStack;
using System;

namespace Punchcard.Core.Server.ServiceInterface.Examples
{
	/// <summary>
	/// 
	/// The application.json determines the logging level (can be ovverridden by azure app settings)
	/// 
	/// "Logging": {
	///   "IncludeScopes": false,
	/// 
	///   "LogLevel": {
	///     "Default": "Trace",
	///     "System": "Information",
	///     "Microsoft": "Information"
	///   }
	/// }
	/// 
	/// ASP.NET Core defines the following log levels, ordered here from least to highest severity.
	/// 
	/// Trace = 0
	/// 
	/// For information that is valuable only to a developer debugging an issue. These messages may contain sensitive application data and so should not be enabled in a production environment. Disabled by default. Example: Credentials: {"User":"someuser", "Password":"P@ssword"}
	/// 
	/// Debug = 1
	/// 
	/// For information that has short-term usefulness during development and debugging. Example: Entering method Configure with flag set to true. You typically would not enable Debug level logs in production unless you are troubleshooting, due to the high volume of logs.
	/// 
	/// Information = 2
	/// 
	/// For tracking the general flow of the application. These logs typically have some long-term value. Example: Request received for path /api/todo
	/// 
	/// Warning = 3
	/// 
	/// For abnormal or unexpected events in the application flow. These may include errors or other conditions that do not cause the application to stop, but which may need to be investigated. Handled exceptions are a common place to use the Warning log level. Example: FileNotFoundException for file quotes.txt.
	/// 
	/// Error = 4
	/// 
	/// For errors and exceptions that cannot be handled. These messages indicate a failure in the current activity or operation (such as the current HTTP request), not an application-wide failure. Example log message: Cannot insert record due to duplicate key violation.
	/// 
	/// Critical = 5
	/// 
	/// For failures that require immediate attention. Examples: data loss scenarios, out of disk space.
	/// </summary>

	public class LoggingExample : Service
	{
		private readonly ILogger<LoggingExample> _logger;

		public LoggingExample(ILogger<LoggingExample> log)
		{
			_logger = log;
		}

		public object Get(LoggingExampleRequest request)
		{

			//Logging Levels, see summary for description of when to use
			_logger.LogTrace("Log Trace");
			_logger.LogDebug("Log debug");
			_logger.LogInformation("Log Info");
			_logger.LogWarning("Log Warn");
			_logger.LogError("Log Error");
			_logger.LogCritical("Log Crit");


			// Message Templates
			// Always use message templates, never inline the values (This allows semantic logging)
			var p1 = "Hello ";
			var p2 = 4;
			_logger.LogInformation("Parameter 1 {1}, P2 {2}", p1, p2);

			//Exception Logging
			try
			{
				throw new Exception("Error!");
			}
			catch (Exception ex)
			{
				_logger.LogWarning(ex, "An exception was thrown and handled!");
			}

			return new LoggingExampleResponse { Result = "Log Test Complete" };
		}
	}
}
