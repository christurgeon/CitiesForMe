
import csv
import sys
import pandas as pd
import numpy as np
from math import radians, cos, sin, asin, sqrt, degrees, atan2

datasets_dir = r'/home/citiesforme/datasets/'
if len(sys.argv) > 1:
    datasets_dir = sys.argv[1]

def validate_point(p):
    lat, lon = p
    assert -90 <= lat <= 90, "bad latitude"
    assert -180 <= lon <= 180, "bad longitude"

def distance_haversine(p1, p2):
    lat1, lon1 = p1
    lat2, lon2 = p2
    for p in [p1, p2]:
        validate_point(p)
    R = 6371 # km - earths's radius
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a)) 
    d = R * c
    return d

def compute(COLUMN_NAME, LATITUDE, LONGITUDE, FIN, FOUT):
    df = pd.read_csv(r"{}NORMALIZED.csv".format(datasets_dir), dtype={"zipcode" : np.object})
    df = df .loc[:, ["state", "city", "county", "zipcode", "latitude", "longitude"]]
    df[COLUMN_NAME] = ""
    df["distance"] = np.nan
    print(df.dtypes)

    nprks = pd.read_csv(r"{}{}.csv".format(datasets_dir, FIN)) 
    print(nprks)

    for i, r in df.iterrows():
        p1 = (r["latitude"], r["longitude"])
        min_dist = 999999999.0
        name = ""
        for idx, row in nprks.iterrows():
            p2 = (row[LATITUDE], row[LONGITUDE])
            dist = distance_haversine(p1, p2)
            # print("dist:", dist)
            if dist < min_dist:
                min_dist = dist 
                name = row["name"]
        df.at[i, COLUMN_NAME] = '"{}"'.format(name)  
        df.at[i, "distance"] = round(min_dist, 4) 

    df.to_csv(r"{}{}.csv".format(datasets_dir, FOUT))

if __name__ == "__main__":
    compute("name", "latitude_deg", "longitude_deg", "national_parks", "closest_national_parks")
