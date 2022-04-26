using System.Collections.Generic;

namespace CitiesForMeBackend.Models
{
    /// <summary>
    /// Represents a user's rating of a city.
    /// </summary>
    public class CityRating
    {
        public string Zipcode { get; set; }

        public List<string> Criteria { get; set; }
        public List<float> Ratings { get; set; }
    }
}
