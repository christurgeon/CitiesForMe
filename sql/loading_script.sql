/*
    Create a function to load data from a CSV file to a table. The absolute path to the directory in which datasets exist
    must be specified by setting the datasets_dir variable through the Postgres shell. This can be done with the
    following command:
        \set datasets_dir '\'/home/citiesforme/datasets/\''
*/

CREATE OR REPLACE FUNCTION load_table(table_name TEXT, dataset TEXT, condition TEXT DEFAULT '', datasets_dir TEXT DEFAULT :datasets_dir) RETURNS void AS $$
BEGIN
    EXECUTE 'COPY ' || table_name || ' FROM ''' || datasets_dir || dataset || ''' DELIMITER '','' HEADER CSV ' || condition;
END;
$$ LANGUAGE PLPGSQL;

/* Create a function to export data from a table to a CSV file */

CREATE OR REPLACE FUNCTION export_table(table_name TEXT, csv_filename TEXT, datasets_dir TEXT DEFAULT :datasets_dir) RETURNS void AS $$
BEGIN
    EXECUTE 'COPY ' || table_name || ' TO ''' || datasets_dir || csv_filename || ''' DELIMITER '','' HEADER CSV';
END;
$$ LANGUAGE PLPGSQL;

TRUNCATE TABLE public.city_map;
TRUNCATE TABLE public.states;

/* Load basic city data */

SELECT load_table(table_name => 'public.city_map', dataset => 'basic_city_data_revised.csv', condition => 'WHERE zipcode IS NOT NULL');

/* Load state data */

SELECT load_table(table_name => 'public.states', dataset => 'transformed_state_data.csv');

/*
SELECT * FROM public.city_map
SELECT * FROM public.states 
*/

/* Create temporary table indicating whether a city has an active military base and load data */

CREATE TEMPORARY TABLE temp_military (
   city            TEXT,
   has_military    BOOLEAN
);

SELECT load_table(table_name => 'temp_military', dataset => 'military_bases.csv');

/* NOTE: MILITARY DATASET HAS DUPS, PROBABLY SINCE SAME CITY NAME IN MULTIPLE STATES */

/*
SELECT city, count(city) FROM temp_military 
GROUP BY city
having count(city) > 1
*/

/* Create temporary table storing the population and population density of cities and load data */

CREATE TEMPORARY TABLE temp_population (
    city          TEXT,
    population    INT,
    density       INT
);

SELECT load_table(table_name => 'temp_population', dataset => 'city_populations_and_density.csv');

/* NOTE: NEED MORE THAN JUST CITY, OMIT FOR NOW */

/*
SELECT t1.city, count(t1.city) FROM temp_population t1
left join public.city_map t2 on t1.city = t2.city
GROUP BY t1.city
having count(t1.city) > 1
*/


/* Create temporary table indicating the distance of cities from the nearest major airport and load data */

CREATE TEMPORARY TABLE temp_airports (
    state            TEXT,
    city             TEXT,
    county           TEXT,
    zipcode          TEXT,
    latitude         DECIMAL(10,5),
    longitude        DECIMAL(10,5),
    major_airport    TEXT,
    distance_num     NUMERIC(12,5)
);

SELECT load_table(table_name => 'temp_airports', dataset => 'closest_major_airport.csv');

/*
SELECT * FROM temp_airports
*/


/* Create temporary table indicating the average precipitation for cities and load data */

CREATE TEMPORARY TABLE temp_precipitation (
    st_abbrev               TEXT,
    county                  TEXT,
    value_in_inches         DECIMAL(9,3),
    rank                    INT,
    anomlay_1901_to_2000    DECIMAL(9,3),
    mean_1901_to_2000       DECIMAL(9,3)

);

SELECT load_table(table_name => 'temp_precipitation', dataset => 'precipitation_2020_revised.csv');

/*
SELECT * FROM temp_precipitation
*/


/* Create temporary table with information on the gender and age of populations in cities and load data */

CREATE TEMPORARY TABLE temp_gender_and_age (
    zipcode          TEXT,
    city             TEXT,
    state            TEXT,
    total_pop        INT,
    med_age          DECIMAL(5,2),
    male_cnt         INT,
    fmale_cnt        INT,
    med_male_age     DECIMAL(5,2),
    med_fmale_age    DECIMAL(5,2)
);

SELECT load_table(table_name => 'temp_gender_and_age', dataset => '2018_gender_and_age.csv');

/*        
SELECT zipcode, city, state FROM temp_gender_and_age
SELECT distinct city, county, state FROM public.city_map -- 28337
SELECT count(*) FROM temp_gender_and_age -- 32196
*/


/* Create temporary table with the average precipitation per month in cities and load data */

CREATE TEMPORARY TABLE temp_sunshine (
    city      TEXT,
    jan       DECIMAL,
    feb       DECIMAL,
    mar       DECIMAL,
    apr       DECIMAL,
    may       DECIMAL,
    jun       DECIMAL,
    jul       DECIMAL,
    aug       DECIMAL,
    sep       DECIMAL,
    oct       DECIMAL,
    nov       DECIMAL,
    "dec"     DECIMAL,
    "year"    TEXT
);

SELECT load_table(table_name => 'temp_sunshine', dataset => 'sunshine_duration.csv');

/* NOTE: SEE PIVOTED SOLUTION IF WE DECIDE TO NOT MERGE THIS TABLE */
/* It might be a good idea to make some average sunshine rank instead of per month */

/*
SELECT * FROM temp_sunshine

SELECT 
    city,
    unnest(array [jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec]) AS sunshine_value,
    unnest(array ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']) AS "month",
    "year"
FROM temp_sunshine
*/


/* Create temporary table with various air quality indicators for cities and load data */

CREATE TEMPORARY TABLE temp_air_quality (
    state                      TEXT,
    county                     TEXT,
    days_with_aqi              INT,
    good_days                  INT,
    moderate_days              INT,
    unhealthy_for_sens_days    INT,
    unhealthy_days             INT,
    very_unhealthy_days        INT,
    hazardous_days             INT,
    max_aqi                    INT,
    ninetieth_percentile_aqi   INT,
    median_aqi                 INT,
    days_co                    INT,
    days_no2                   INT,
    days_ozone                 INT,
    days_so2                   INT,
    days_pm25                  INT,
    days_pm10                  INT
);

SELECT load_table(table_name => 'temp_air_quality', dataset => 'air_quality_index.csv');

/*
SELECT * FROM temp_air_quality

SELECT 
      y.abbreviation
    , x.* 
FROM temp_air_quality x 
    LEFT JOIN public.states y 
        ON x.state = y.state  
where y.abbreviation is null
*/


/* Create temporary table with average temperature in counties and load data */

CREATE TEMPORARY TABLE temp_avg_temperature (
    st_abbrev       TEXT,
    county          TEXT,
    temp_value      DECIMAL,
    temp_rank       INT,
    temp_anomaly    DECIMAL,
    avg_temp_num    DECIMAL      
);

SELECT load_table(table_name => 'temp_avg_temperature', dataset => 'avg_temperature_2020.csv');

/*
SELECT * FROM temp_avg_temperature
*/


/* Create temporary table storing various cost of living indicators by city and load data */

CREATE TEMPORARY TABLE temp_cost_of_living (
    cost_rank                      INT,
    state                          TEXT,
    city                           TEXT,
    col_index                      DECIMAL,
    rent_index                     DECIMAL,
    col_rent_index                 DECIMAL,
    groceries_index                DECIMAL,
    restaurant_price_index         DECIMAL,
    local_puchasing_power_index    DECIMAL
);

SELECT load_table(table_name => 'temp_cost_of_living', dataset => 'cost_of_living.csv');

/*
SELECT * FROM temp_cost_of_living
*/


/* Merge data and export to a CSV file ready to be normalized */
/* NOTE: RUN cte with COPY if you wish to export to CSV */
CREATE TEMPORARY TABLE temp_ready_to_normalize AS
    WITH city_initial AS (
        SELECT 
            city,
            state,
            county,
            latitude,
            longitude,
            timezone,
            MAX(zipcode) AS zipcode    
        FROM public.city_map
        GROUP BY city, state, county, latitude, longitude, timezone
    ),
    popdata_initial AS (
        SELECT
            MAX(zipcode) AS zipcode,
            city,
            state,
            SUM(total_pop) AS population_total,
            ROUND(AVG(med_age), 2) AS median_age,
            SUM(male_cnt) AS males_total,
            SUM(fmale_cnt) AS females_total
        FROM temp_gender_and_age
        GROUP BY city, state
    ),
    city_cte AS (
        SELECT 
            t1.zipcode,
            t1.state,
            t1.city,
            t1.county,
            t1.latitude,
            t1.longitude,
            t1.timezone,
            t2.population_total,
            t2.males_total,
            t2.females_total,
            t2.median_age
        FROM city_initial t1
            LEFT JOIN popdata_initial t2 
            ON ABS(CAST(t1.zipcode AS INTEGER) - CAST(t2.zipcode AS INTEGER)) <= 1500 AND 
                t1.city = t2.city AND 
                t1.state = t2.state
        /* WHERE t2.city IS NOT NULL  AND ABS(CAST(t1.zipcode AS INTEGER) - CAST(t2.zipcode AS INTEGER)) > 150 */
    ),
    cte1 AS (
        SELECT 
            t1.*,
            t2.value_in_inches,
            t2.rank,
            t2.anomlay_1901_to_2000,
            t2.mean_1901_to_2000 
        FROM city_cte t1
            LEFT JOIN temp_precipitation t2
            ON t1.county = t2.county AND 
                t1.state = t2.st_abbrev 
    ),
    cte2 AS (
        SELECT
            t1.*,
            t2.median_aqi,
            t2.percentage_good_days,
            t2.days_with_aqi,
            t2.good_days,
            t2.moderate_days,
            t2.unhealthy_for_sens_days,
            t2.unhealthy_days,
            t2.very_unhealthy_days,
            t2.hazardous_days,
            t2.max_aqi,
            t2.ninetieth_percentile_aqi,
            t2.days_co,
            t2.days_no2,
            t2.days_ozone,
            t2.days_so2,
            t2.days_pm25,
            t2.days_pm10 
        FROM cte1 t1
            LEFT JOIN (
                    SELECT 
                        y.abbreviation,
                        x.county,
                        x.median_aqi,
                        x.days_with_aqi / x.good_days AS percentage_good_days,
						x.days_with_aqi,
						x.good_days,
						x.moderate_days,
						x.unhealthy_for_sens_days,
						x.unhealthy_days,
						x.very_unhealthy_days,
						x.hazardous_days,
						x.max_aqi,
						x.ninetieth_percentile_aqi,
						x.days_co,
						x.days_no2,
						x.days_ozone,
						x.days_so2,
						x.days_pm25,
						x.days_pm10 
                    FROM temp_air_quality x 
                        /* INNER JOIN to omit Puerto Rico & Virgin Islands */
                        INNER JOIN public.states y 
                            ON x.state = y.state  
            ) t2 
            ON t1.county = t2.county AND 
            t1.state = t2.abbreviation
    ),
    cte3 AS (
        SELECT 
            t1.*,
            t2.temp_value,
            t2.temp_rank,            
            t2.temp_anomaly,   
            t2.avg_temp_num    
        FROM cte2 t1 
            LEFT JOIN temp_avg_temperature t2 
            ON t1.county = t2.county AND 
            t1.state = t2.st_abbrev 
    ),
    cte4 AS (
        SELECT 
            t1.*,
            t2.cost_rank,
            t2.col_index,
            t2.rent_index,
            t2.col_rent_index,
            t2.groceries_index,
            t2.restaurant_price_index,
            t2.local_puchasing_power_index 
        FROM cte3 t1
            LEFT JOIN temp_cost_of_living t2
            ON t1.city = t2.city AND 
            t1.state = t2.state
    ),
    cte5 AS (
        SELECT 
            t1.*,
            t2.major_airport,
            t2.distance_num
        FROM cte4 t1
            LEFT JOIN temp_airports t2
            ON t1.city = t2.city AND 
            t1.state = t2.state AND 
            t1.county = t2.county AND 
            t1.zipcode = t2.zipcode
    )
    -- FINAL RESULT QUERY 
    SELECT 
        t1.zipcode,
        t1.state,
        t1.city,
        t1.county,
        t1.latitude,
        t1.longitude,
        t1.timezone,
        t1.population_total,
        t1.median_age,
        t1.mean_1901_to_2000 AS avg_rainfall,
        t1.median_aqi,
        t1.percentage_good_days,
        t1.avg_temp_num,
        t1.cost_rank,
        t1.rent_index,
        t1.restaurant_price_index,
        t1.local_puchasing_power_index,
        t2.lower_income_tax_rate,
        t2.higher_income_tax_rate,
        t2.sales_tax_rate,
        t2.real_estate_tax_rate,
        t2.annual_taxes_on_state_median_val_home,
        t2.combined_upper_most_cap_gains,
        t2.healthcare_rank,
        t2.healthcare_cost_rank,
        t1.distance_num AS distance_to_airport
    FROM cte5 t1 
        LEFT JOIN public.states t2
        ON t1.state = t2.abbreviation;
                   
/* Export final table to CSV */
                   
SELECT export_table(table_name => 'temp_ready_to_normalize', csv_filename => 'READYTONORMALIZE.csv');

/* Drop all temporary tables */

DROP TABLE IF EXISTS temp_military;
DROP TABLE IF EXISTS temp_precipitation;
DROP TABLE IF EXISTS temp_gender_and_age;
DROP TABLE IF EXISTS temp_sunshine;
DROP TABLE IF EXISTS temp_population;
DROP TABLE IF EXISTS temp_air_quality;
DROP TABLE IF EXISTS temp_avg_temperature;
DROP TABLE IF EXISTS temp_cost_of_living;
DROP TABLE IF EXISTS temp_airports;
DROP TABLE IF EXISTS temp_ready_to_normalize;
