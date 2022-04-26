using Microsoft.EntityFrameworkCore;

namespace CitiesForMeBackend.Models
{
    /// <summary>
    /// A session with the CitiesForMe database. Responsible for retrieving and inserting cities and criteria.
    /// </summary>
    public class CitiesForMeDbContext : DbContext
    {
        /// <summary>
        /// Creates a new CitiesForMeDbContext object with the given options.
        /// </summary>
        /// <param name="options">The options for this session with the database.</param>
        public CitiesForMeDbContext(DbContextOptions<CitiesForMeDbContext> options)
            : base(options)
        {

        }

        /// <summary>
        /// Responsible for retrieving and inserting cities in the database.
        /// </summary>
        public DbSet<City> Cities { get; set; }

        /// <summary>
        /// Responsible for retrieving and inserting criteria in the database.
        /// </summary>
        public DbSet<Criterion> Criteria { get; set; }
    }
}
