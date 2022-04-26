using CitiesForMeBackend.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace CitiesForMeBackend
{
    /// <summary>
    /// Represents the startup configuration for the CitiesForMe program.
    /// </summary>
    public class Startup
    {
        /// <summary>
        /// Creates a new Startup object.
        /// </summary>
        /// <param name="configuration">The configuration for the program.</param>
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        /// <summary>
        /// The program's configuration.
        /// </summary>
        public IConfiguration Configuration { get; }

        /// <summary>
        /// Called at runtime to add services to the container.
        /// </summary>
        /// <param name="services">The collection of services to add to.</param>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<CitiesForMeDbContext>(opt => opt.UseNpgsql(Configuration.GetConnectionString("DbString"))); // dependency injection
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "CitiesForMeBackend", Version = "v1" });
            });

        }

        /// <summary>
        /// Called at runtime to configure the HTTP request pipeline.
        /// </summary>
        /// <param name="app">The application builder to configure.</param>
        /// <param name="env">The web hosting environment the application is running in.</param>
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //if (env.IsDevelopment())
            //{
            //app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "CitiesForMeBackend v1"));
            //}

            app.UseDeveloperExceptionPage();
            app.UseCors(opts =>
            {
                opts.WithOrigins("*");

                opts.AllowAnyHeader();
                opts.AllowAnyMethod();
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
