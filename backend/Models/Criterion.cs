using System;
using System.ComponentModel.DataAnnotations;

namespace CitiesForMeBackend.Models
{
    /// <summary>
    /// Represents a criterion that a city can be evaluated on.
    /// </summary>
    public class Criterion
    {
        [Key]
        public Guid Id { get; set; }
        public string Description { get; set; }
        public float Val { get; set; }
        public int? NumUserRatings { get; set; }
    }
}
