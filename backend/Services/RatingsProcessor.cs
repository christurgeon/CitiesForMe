using CitiesForMeBackend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace CitiesForMeBackend.Services
{
    public class RatingsProcessor
    {
        private List<CityRating> CityRatings;

        private CitiesForMeDbContext Context;

        /// <summary>
        /// Creates a new RatingsProcessor object with the given Ratings values and database context.
        /// </summary>
        /// <param name="cityRatings">A list of CityRatings submitted by the user to be weighted into the database. </param>
        /// <param name="context">The database context.</param>
        public RatingsProcessor(List<CityRating> cityRatings, CitiesForMeDbContext context)
        {
            this.CityRatings = cityRatings;
            this.Context = context;
        }

        /// <summary>
        /// Add the user's city ratings into criteria database.
        /// </summary>
        /// <returns>True if all ratings were inserted properly, false otherwise.</returns>
        public bool AddResults()
        {
            foreach (var rating in CityRatings)
            {
                City city = Context.Cities.Include(City => City.Data).FirstOrDefault(c => c.Zipcode == rating.Zipcode);

                if (city == null || rating.Ratings.Count != rating.Criteria.Count)
                {
                    return false;
                }

                for (int i = 0; i < rating.Criteria.Count; i++)
                {
                    if (rating.Ratings[i] < 0 || rating.Ratings[i] > 1.0)
                    {
                        return false;
                    }

                    foreach (var criterion in city.Data)
                    {
                        if (rating.Criteria[i] != criterion.Description)
                        {
                            continue;
                        }

                        if (criterion.NumUserRatings == null)
                        {
                            return false; // Cannot provide rating for hardcoded data
                        }

                        criterion.Val = (criterion.Val * (int)criterion.NumUserRatings + rating.Ratings[i]) / ((int)criterion.NumUserRatings + 1); // Re-average value

                        criterion.NumUserRatings++;

                    }

                }

            }
            return true;
        }
    }
}
