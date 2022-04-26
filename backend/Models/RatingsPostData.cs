using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CitiesForMeBackend.Models
{
    public class RatingsPostData
    {
        [Required]
        public List<CityRating> CityRatings { get; set; }
    }
}
