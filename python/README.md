# Python Overview 

## Goal 

Assist in ETL operations by providing Min-Max normalization and great circular distance calculations for city criteria.

## Min-Max Normalization 

The ```normalize.py``` script requires the generated csv file created from execution of the ```sql/loading_script.sql``` script. The script can accept a directory via command line where the file is to be found or it uses a default (see code). Additionally, it uses a dictionary of column names as keys and booleans as values such that if true, it sets the maximum column value to 1.0 in normalization, otherwise the minimum column value is set as 1.0. The script will output the file with the same column structure but normalized values to ```NORMALIZED.csv```. From here, our csv file is ready to be pushed to the PostgreSQL loading procedure.

```python normalize.py <PATH_TO_FILE>```

## Distance

The ```distance.py``` script required the existence of ```NORMALIZE.py``` so that it has a list of cities to calculate shortest distances. It follows the same structure to set the expected directory to read and write files to as above. Additionally, the user must specify the name of the latitude column name, longitude column name, file name, and output file name for the file used to create distances between cities and the place of interest. It then creates a new file with the city identifier columns and the distance to the place of interest. The user can then add additional SQL in the loading script to append these distances to the larger generated csv file.

```python distance.py <PATH_TO_FILE>```
