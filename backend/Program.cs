using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace CitiesForMeBackend
{
    /// <summary>
    /// Represents the CitiesForMe program as a whole.
    /// </summary>
    public class Program
    {
        /// <summary>
        /// Runs the program with the given arguments.
        /// </summary>
        /// <param name="args">The arguments the program will be executed with.</param>
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        /// <summary>
        /// Creates a host builder with the given arguments.
        /// </summary>
        /// <param name="args">The arguments to configure the builder with.</param>
        /// <returns>The host builder.</returns>
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
