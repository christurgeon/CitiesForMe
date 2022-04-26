using CitiesForMeBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace CitiesForMeBackend.Controllers
{
    /// <summary>
    /// A controller for fetching city data from the database.
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class CitiesController : ControllerBase
    {
        private readonly CitiesForMeDbContext _context;

        /// <summary>
        /// Creates a new CitiesController object with the given database context.
        /// </summary>
        /// <param name="context">The database context for this controller.</param>
        public CitiesController(CitiesForMeDbContext context)
        {
            _context = context;
        }
        /*
        /// <summary>
        /// Fetches the city represented by the zipcode string from the database.
        /// </summary>
        /// <param name="zipcode">The zipcode to fetch.</param>
        /// <returns>The city.</returns>
        [HttpGet("{zipcode}")]
        public async Task<ActionResult<City>> GetCityData(string citystate)
        {
            var city = await _context.Cities.FindAsync(citystate);
            if (city == null)
            {
                return NotFound();
            }
            return city;
        }*/

        /// <summary>
        /// Fetches all cities from the database.
        /// </summary>
        /// <returns>A list of all cities stored in the database.</returns>
        /// 

        /// <summary>
        /// Searches the database for a similar city.
        /// </summary>
        /// <param name="query">The partial city to lookup.</param>
        /// <returns>The city.</returns>
        [HttpGet("query/{query}")]
        public ActionResult<IEnumerable<City>> SearchCities(string query)
        {
            var cities = (from city in _context.Cities
                          where EF.Functions.Like(city.CityName, query + "%")
                          select city).Take(10).ToList();
            return cities;
        }


        [HttpGet]
        public ActionResult<IEnumerable<City>> GetAllCities()
        {
            return _context.Cities.ToList();
        }

    }
}
