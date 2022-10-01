using System;
using Example.API.Configuration.Provider;
using Example.API.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using Serilog;

namespace Example.API
{
    public static class Program
    {
        #region METHODS

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            var configurationProvider = new ConfigurationProvider();
            var service = configurationProvider.AppSettings.Service;

            return Host.CreateDefaultBuilder(args).ConfigureWebHostDefaults(webBuilder => webBuilder
                .UseStartup<Startup>()
                .UseUrls($"http://*:{service.Port}")
                .UseConfiguration(configurationProvider.GetConfiguration())
                .UseSerilog());
        }

        public static void Main(string[] args)
        {
            var configurationProvider = new ConfigurationProvider();
            var service = configurationProvider.AppSettings.Service;

            Log.Logger = new LoggerConfiguration()
                .AddLoggerConfiguration(service.Name, service.LogLevel)
                .CreateLogger();

            try
            {
                Log.Information($"Initializing 'Example API' service on port '{service.Port}'");

                var webHost = CreateHostBuilder(args).Build();
                webHost.SeedDatabase();
                webHost.Run();
            }
            catch (Exception exception)
            {
                Log.Error($"Service unexpectedly terminated: '{exception.Message}'");
                Log.Error($"Exception details => {JsonConvert.SerializeObject(exception)}");
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }

        #endregion METHODS
    }
}
