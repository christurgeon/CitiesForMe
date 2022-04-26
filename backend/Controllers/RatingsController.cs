using CitiesForMeBackend.Models;
using CitiesForMeBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace CitiesForMeBackend.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class RatingsController : ControllerBase
    {

        private readonly CitiesForMeDbContext _context;

        /// <summary>
        /// Creates a new RatingsController object with the given database context.
        /// </summary>
        /// <param name="context">The database context for this controller.</param>
        public RatingsController(CitiesForMeDbContext context)
        {
            _context = context;
        }

        //api/v1/Ratings
        [HttpPost]
        public ActionResult<string> PostRating(RatingsPostData data)
        {
            var processor = new RatingsProcessor(data.CityRatings, _context);
            if (!processor.AddResults())
            {
                return BadRequest();
            }
            return "Successfully added ratings.";
        }
    }
}
