/* Create a table to map city names to their state, county, and other defining characteristics */

CREATE TABLE public.city_map
(
    city         TEXT           NOT NULL,
    state        TEXT           NOT NULL,
    county       TEXT           NOT NULL,
    latitude     DECIMAL(10,5),
    longitude    DECIMAL(10,5),
    timezone     VARCHAR(50),
    zipcode      VARCHAR(10)    NOT NULL,
    CONSTRAINT "city_map_pkey" PRIMARY KEY (city, state, county, zipcode)
)

TABLESPACE pg_default;

ALTER TABLE public.city_map
    OWNER to postgres;
    

/* Create a table to track state-level data, such as tax rates */

CREATE TABLE public.states
(
    state                                    TEXT    NOT NULL,
    abbreviation                             TEXT,
    lower_income_tax_rate                    DECIMAL(5,2),                
    higher_income_tax_rate                   DECIMAL(5,2),
    number_of_income_brackets                SMALLINT,
    lowest_tax_bracket_starting              MONEY,
    highest_tax_bracket_starting             MONEY,
    sales_tax_rate                           DECIMAL(5,2),
    avg_local_sales_tax_rate                 DECIMAL(5,2),
    combined_sales_tax_rate                  DECIMAL(5,2),
    max_local_sales_tax_rate                 DECIMAL(5,2),
    real_estate_tax_rate                     DECIMAL(5,2),
    annual_taxes_on_fixed_home_px            MONEY,
    state_median_home_value                  MONEY,
    annual_taxes_on_state_median_val_home    MONEY,
    upper_most_cap_gains                     DECIMAL(5,2),
    combined_upper_most_cap_gains            DECIMAL(5,2),
    healthcare_rank                          SMALLINT,
    healthcare_total_score                   DECIMAL(5,2),
    healthcare_cost_rank                     SMALLINT,
    healthcare_access_rank                   SMALLINT,
    healthcare_outcome_rank                  SMALLINT,            
    CONSTRAINT "states_pkey" PRIMARY KEY (state)
)

TABLESPACE pg_default;

ALTER TABLE public.states
    OWNER to postgres;