using CitiesForMeBackend.Models;
using CitiesForMeBackend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace CitiesForMeBackend.Controllers
{
    /// <summary>
    /// A controller for returning city recommendations based on survey responses.
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class SurveysController : ControllerBase
    {
        private readonly CitiesForMeDbContext _context;

        /// <summary>
        /// Creates a new SurveysController object with the given database context.
        /// </summary>
        /// <param name="context">The database context for this controller.</param>
        public SurveysController(CitiesForMeDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Processes a POST-ed survey and returns the top 10 cities for the user.
        /// </summary>
        /// <param name="data">The POST-ed data from the user.</param>
        /// <returns>A bad request response if the number of survey criteria does not match the number of survey values.
        /// Or, a not found response if the survey cannot be validated.
        /// Otherwise, the top 10 cities for the user, based on their survey responses.</returns>
        [HttpPost]
        public ActionResult<IEnumerable<City>> PostSurvey(SurveyPostData data)
        {
            //var ratings = data.PreviousCityRatings;
            if (data.SurveyCriteria.Count() != data.SurveyVals.Count())
            {
                return BadRequest();
            }

            Dictionary<string, float> surveyData = new Dictionary<string, float>();
            for (var i = 0; i < data.SurveyCriteria.Count(); i++)
            {
                surveyData.Add(data.SurveyCriteria[i], data.SurveyVals[i]);
            }

            var processor = new SurveyProcessor(surveyData, _context);
            if (!processor.ValidateSurvey())
            {
                return BadRequest();
            }
            return processor.GetRecommendations(10);
        }
    }
}
