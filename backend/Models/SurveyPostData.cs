using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CitiesForMeBackend.Models
{

    /*
     * Survey data posted by user. Is in format of: 
     * {
    *   "surveyCriteria": [
    *       "criterion1",
    *       "criterion2",
    *       "criterion3"
    *   ],
    *   "surveyVals": [
    *       0.9,
    *       0.128,
    *       0.56
    *   ]
    * }
     * */
    /// <summary>
    /// Represents data POST-ed by a user when submitting a survey. Data is in the format of:
    /// <code>
    ///     {
    ///      "surveyCriteria": [
    ///          "criterion1",
    ///          "criterion2",
    ///          "criterion3"
    ///      ],
    ///      "surveyVals": [
    ///          0.9,
    ///          0.128,
    ///          0.56
    ///       ]
    ///     }
    /// </code>
    /// </summary>
    public class SurveyPostData
    {
        [Required]
        public List<string> SurveyCriteria { get; set; }

        [Required]
        public List<float> SurveyVals { get; set; }

    }
}
