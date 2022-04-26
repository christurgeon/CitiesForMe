import csv
import pandas as pd 
import numpy as np
import sys

# The argument for this script should be the directory datasets live in
datasets_dir = '/home/citiesforme/datasets/'
if len(sys.argv) > 1:
    datasets_dir = sys.argv[1]

# Specify FALSE for rank columns, where 1 is the best
# we can then reverese this during normalization 0to1 normalization
# to move a better rank (lower) to be closer to 1
COLUMNS = {
 	"population_total" : True,
    "median_age" : True,
    "avg_rainfall" : True,
    "median_aqi" : True,
    "percentage_good_days" : True,
    "avg_temp_num" : True,
    "cost_rank" : True,
    "rent_index" : True,
    "restaurant_price_index" : True,
    "local_puchasing_power_index" : True,
    "lower_income_tax_rate" : True,
    "higher_income_tax_rate" : True,
    "sales_tax_rate" : True,
    "real_estate_tax_rate" : True,
    "annual_taxes_on_state_median_val_home" : True,    
    "combined_upper_most_cap_gains" : True,
    "healthcare_rank" : False,                          # Smaller rank, closer to 1.0         
    "healthcare_cost_rank" : False,                     # Smaller rank, closer to 1.0
    "distance_to_airport" : False,                      # Smaller distance, closer to 1.0
    "distance_to_national_park" : False                 # Smaller distance, closer to 1.0
}

ROUNDCOLUMNS = {}
for i in COLUMNS.keys():
    ROUNDCOLUMNS[i] = 5

def normalize(df):
    result = df.copy()
    for feature_name, no_reverse in COLUMNS.items():
        max_value = df[feature_name].max()
        min_value = df[feature_name].min()
        if no_reverse:
            if max_value == min_value:
                result[feature_name] = 0
            else:
                result[feature_name] = (df[feature_name] - min_value) / (max_value - min_value)
        else:
            print(feature_name, " reversing...")
            if max_value == min_value:
                result[feature_name] = 0
            else:
                result[feature_name] = (max_value - df[feature_name]) / (max_value - min_value)
    return result

def dollar_to_float(x):
    x = str(x).replace(",", "").replace(" ", "").replace("$", "")
    return float(x)

df = pd.read_csv(r"{}READYTONORMALIZE.csv".format(datasets_dir), dtype={"zipcode" : np.object})
df["annual_taxes_on_state_median_val_home"] = df["annual_taxes_on_state_median_val_home"].apply(dollar_to_float)

# print(df["annual_taxes_on_state_median_val_home"])
print(df.dtypes) 

df_norm = normalize(df).round(ROUNDCOLUMNS)
print(df_norm)
df_norm.to_csv(r"{}NORMALIZED.csv".format(datasets_dir))


############################################################################################
#   PROCESSING FOR AIRPORTDATA

# df2 = pd.read_csv(r"C:\Users\turgec\Downloads\ICAOairports\ICAO_airports.csv")
# df2 = df2.loc[:, ["type", "name", "latitude_deg", "longitude_deg", "iso_country"]]
# df2 = df2.applymap(lambda x: x.strip() if isinstance(x, str) else x)

# df3 = df2[(df2.type.astype(str) == "large_airport") & (df2.iso_country.astype(str) == "US")]
# df3 = df3[~df3.name.str.contains("Air Force")].reset_index(drop=True)
# df3.loc[:,["name", "latitude_deg", "longitude_deg"]].to_csv("C:/temp/airports_revised.csv")
# did some post processing in notepad++#

############################################################################################
