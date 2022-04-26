/*
    Create a function to load data from a CSV file to a table. The absolute path to the directory in which datasets exist
    must be specified by setting the datasets_dir variable through the Postgres shell. This can be done with the
    following command:
        \set datasets_dir '\'/home/citiesforme/datasets/\''
*/
CREATE OR REPLACE FUNCTION load_table(table_name TEXT, dataset TEXT, datasets_dir TEXT DEFAULT :datasets_dir) RETURNS void AS $$
BEGIN
    EXECUTE 'COPY ' || table_name || ' FROM ''' || datasets_dir || dataset || ''' DELIMITER '','' HEADER CSV';
END;
$$ LANGUAGE PLPGSQL;

/* Create a temporary table to store all normalized city criteria */
CREATE TEMPORARY TABLE normalizations (
      zipcode                                  TEXT,
      state                                    TEXT,
      city                                     TEXT,
      county                                   TEXT,
      latitude                                 DOUBLE PRECISION,
      longitude                                DOUBLE PRECISION,
      timezone                                 TEXT,
      total_population                         REAL,
      median_age                               REAL,
      avg_rainfall                             REAL,
      median_aqi                               REAL,
      percentage_healthy_air                   REAL,
      temp_mean                                REAL,
      cost_rank                                REAL,
      col_index                                REAL,
      rent_index                               REAL,
      col_rent_index                           REAL,
      restaurant_price                         REAL,
      local_puchasing_power                    REAL,
      lower_income_tax_rate                    REAL,
      higher_income_tax_rate                   REAL,
      sales_tax_rate                           REAL,
      real_estate_tax_rate                     REAL,
      annual_taxes_on_state_median_val_home    REAL,
      combined_upper_most_cap_gains            REAL,
      healthcare_rank                          REAL,
      healthcare_cost                          REAL,
      distance_to_airport                      REAL
);

/* Load data to normalizations table */
SELECT load_table(table_name => 'normalizations', dataset => 'NORMALIZED.csv');

/* TODO: Could possibly remove these columns from the dataset entirely */
ALTER TABLE normalizations DROP column col_index;
ALTER TABLE normalizations DROP column col_rent_index;

/* Load basic city data */
INSERT INTO public.Cities
SELECT
    zipcode      AS Zipcode,
    state        AS CityState,
    city         AS Name,
    longitude    AS Longitude,
    latitude     AS Latitude,
    timezone     AS Timezone
FROM normalizations;

/*
SELECT * FROM public.Cities;
select * FROM public."Criteria";
*/

/* Prepare criteria */
WITH cte AS (
    SELECT 
        UNNEST(ARRAY ['Population',
                      'Age',
                      'Rainfall',
                      'Air Quality Index',
                      'Percent Healthy Days',
                      'Temperature',
                      'Cost',
                      'Rent',
                      'Restaurant Cost',
                      'Purchasing Power',
                      'Lower Income Tax',
                      'Higher Income Tax',
                      'Sales Tax',
                      'Real Estate Tax',
                      'Annual Taxes',
                      'Uppermost Capital Gains',
                      'Healthcare Quality',
                      'Healthcare Cost',
                      'Distance to Airport']) AS description,
        UNNEST(ARRAY [total_population,
                      median_age,
                      avg_rainfall,
                      median_aqi,
                      percentage_healthy_air,
                      temp_mean,
                      cost_rank,
                      rent_index,
                      restaurant_price,
                      local_puchasing_power,
                      lower_income_tax_rate,
                      higher_income_tax_rate,
                      sales_tax_rate,
                      real_estate_tax_rate,
                      annual_taxes_on_state_median_val_home,
                      combined_upper_most_cap_gains,
                      healthcare_rank,
                      healthcare_cost,
                      distance_to_airport]) AS val,
         Zipcode AS CityZipcode
    FROM normalizations
)

/* Load criteria */
INSERT INTO public."Criteria" (description, val, zipcode)
SELECT * 
FROM cte
WHERE val IS NOT NULL;