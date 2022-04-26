using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CitiesForMeBackend.Models
{

    /// <summary>
    /// Represents a City and its attributes.
    /// </summary>
    public class City
    {
        /// <summary>
        /// Creates a new City object.
        /// </summary>
        public City()
        {
            this.Data = new HashSet<Criterion>();
            //this.UserRatings = new HashSet<CityRating>();
        }

        [Key]
        public string Zipcode { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public string CityName { get; set; }

        [Required]
        public double Longitude { get; set; }

        [Required]
        public double Latitude { get; set; }

        [Required]
        public string Timezone { get; set; }

        /// <summary>
        /// Tracks all data we have on this city, by name.
        /// </summary>
        [Required]
        public ICollection<Criterion> Data { get; set; }

        // Number of user submissions that have been added to the model
        //[Required]
        //public ICollection<CityRating> UserRatings { get; set; }
    }
}
