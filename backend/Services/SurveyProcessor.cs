using CitiesForMeBackend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace CitiesForMeBackend.Services
{
    /// <summary>
    /// Processor for survey responses. Responsible for validating surveys and generating city recommendations,
    /// as well as inserting ratings for cities into the database.
    /// </summary>
    public class SurveyProcessor
    {
        /// <summary>
        /// A list of criteria that cities are evaluated on, for use in the <c>Weights</c> dictionary.
        /// </summary>
        private static readonly string[] Criteria = {
            "Age",
            "Air Quality Index",
            "Annual Taxes",
            "Cost",
            "Distance to Airport",
            "Healthcare Cost",
            "Healthcare Quality",
            "Higher Income Tax",
            "Lower Income Tax",
            "Percent Healthy Days",
            "Population",
            "Purchasing Power",
            "Rainfall",
            "Real Estate Tax",
            "Rent",
            "Restaurant Cost",
            "Sales Tax",
            "Temperature",
            "Uppermost Capital Gains"
        };

        //private Dictionary<string, float> Weights;
        private Dictionary<string, float> Ideals;

        private CitiesForMeDbContext Context;


        /// <summary>
        /// Creates a new SurveyProcessor object with the given survey values and database context.
        /// </summary>
        /// <param name="surveyVals">The user's submitted survey values, in the form <c>(criteria_name, criteria_val)</c>.</param>
        /// <param name="context">The database context.</param>
        public SurveyProcessor(Dictionary<string, float> surveyVals, CitiesForMeDbContext context)
        {
            this.Ideals = surveyVals;
            this.Context = context;
            /*this.Weights = new Dictionary<string, float>();
            for (int i = 0; i < Criteria.Count(); i++)
            {
                Weights.Add(Criteria[i], 0.5F);
            }*/
        }

        /// <summary>
        /// Check if the survey is valid by ensuring it contains all required fields.
        /// </summary>
        /// <returns>True if the survey is valid, false otherwise.</returns>
        public bool ValidateSurvey()
        {
            foreach (var ideal in this.Ideals)
            {
                if (ideal.Value < 0 || ideal.Value > 1.0)
                {
                    return false;
                }
            }

            return this.Ideals.Count > 0;
        }

        /// <summary>
        /// Calculates scores for each city corresponding to how each data point compares to the user's ideal, then returns
        /// the best <c>n</c> cities for the user. For numeric values, uses an approach similar to mean squared error:
        ///    <code>weights[criteria1] * (ideals[criteria1] - city[criteria1])^2 + weights[criteria2] * (ideals[criteria2] - city[criteria2])^2 + ...</code>
        /// For non-numeric values, a mismatch modifier is used to control how significantly a non-match affects a city's overall score.
        /// </summary>
        /// <param name="n">The number of top cities to return.</param>
        /// <returns>The best <c>n</c> cities for the user, based on their survey response.</returns>
        public List<City> GetRecommendations(int n)
        {
            // Keep track of the min n scores
            var minScores = new List<KeyValuePair<City, float>>();
            foreach (City city in Context.Cities.Include(City => City.Data).ToList())
            {
                var score = 0.0F;
                Dictionary<string, float> cityVals = new Dictionary<string, float>();
                foreach (Criterion criterion in city.Data)
                {
                    if (criterion.NumUserRatings != null && criterion.NumUserRatings == 0)
                    {
                        continue; // If crowdsourced criteria and no crowdsourced data, skip.
                    }
                    cityVals[criterion.Description] = criterion.Val;
                }


                foreach (string name in Ideals.Keys)
                {
                    if (!cityVals.ContainsKey(name))
                    {
                        continue;
                    }
                    /*if (Ideals[name] is float)
                   {*/
                    // For a numeric value, use mean-squared error
                    var delta = cityVals[name] - Ideals[name];
                    score += (delta * delta);  // Weights[name] * (delta * delta);

                    /*}
                    else
                    {
                        // For a non-numeric value, add 0 for a match and weight * mismatchModifier for a non-match
                        // mismatchModifier controls how significantly a mismatch between non-numeric ideal and actual values will affect a city's overall score
                        var mismatchModifier = 5.0F;
                        score += cityVals[name] == Ideals[name] ? 0 : Weights[name] * mismatchModifier;
                    }*/
                    if (minScores.Count >= n && score > minScores.Last().Value)
                    {
                        // This city has no chance of being in the min n scores
                        break;
                    }
                }
                if (score == 0)
                {
                    continue;
                }
                if (minScores.Count < n)
                {

                    // Add to the min n scores as we haven't seen n cities yet
                    minScores.Add(new KeyValuePair<City, float>(city, score));
                }
                else if (score < minScores.Last().Value)
                {
                    // Pop the last city and add this one as it is a closer match
                    minScores.RemoveAt(n - 1);
                    minScores.Add(new KeyValuePair<City, float>(city, score));
                    minScores.Sort((first, second) => first.Value.CompareTo(second.Value));
                }
            }
            // Return only the cities from the min n scores
            var recommendations = new List<City>();
            foreach (var cityScore in minScores)
            {
                cityScore.Key.Data.Clear();
                recommendations.Add(cityScore.Key);
            }
            return recommendations;
        }

    }
}
