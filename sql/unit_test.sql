CREATE SCHEMA IF NOT EXISTS test;

CREATE TABLE IF NOT EXISTS test."TestCities"
AS (
	SELECT * 
	FROM public."Cities"
);

CREATE TABLE IF NOT EXISTS test."TestCriteria"
AS (
	SELECT * 
	FROM public."Criteria"
);

DO $$
DECLARE
	cities_count INT;
	result_set_size INT;
BEGIN 
	-- Ensure expected number of rows from CSV file
	cities_count := (SELECT COUNT(*) FROM test."TestCities");
	ASSERT cities_count = 1108;
	
	-- Assert all fields are NON NULL
	result_set_size := (SELECT COUNT(*) 
				FROM test."TestCities" 
				WHERE "CityName" IS NULL OR
			    	"State" IS NULL OR
				"Longitude" IS NULL OR 
				"Latitude" IS NULL OR
				"Timezone" IS NULL);
	ASSERT result_set_size = 0;

	-- Assert expected number of criteria 
	result_set_size := (SELECT MAX(cnt)
				FROM (SELECT COUNT("Description") AS cnt
			  	FROM test."TestCriteria" 
			  	GROUP BY "CityZipcode") t1);
	ASSERT result_set_size < 18;
	
	-- Assert expected number of zipcodes in criteria table
	result_set_size := (SELECT COUNT(*)
				FROM (SELECT DISTINCT "CityZipcode" FROM test."TestCriteria") t1);
	ASSERT result_set_size = 1108;
	
	-- Assert all data is MinMax normalized
	result_set_size := (SELECT COUNT(*)
				FROM test."TestCriteria" 
			    	WHERE "Val" < 0.0 OR "Val" > 1.0);
	ASSERT result_set_size = 0;
	
	-- Assert all state names are expected length abbreviations
	result_set_size := (SELECT COUNT(*)
				FROM test."TestCities" 
		    		WHERE LENGTH("State") = 2);
	ASSERT result_set_size = 1108;
END
$$;
