'''
This file grabs data every two mins from JCD and stores it in a CSV file.
This will be changed to an Amazon RDS 
'''
import scraper as scr
import time
import pandas as pd

city = 'Dublin'
while True:
    #reading in previously saved csv file
    df = pd.read_csv('static/data/{0}.csv', keep_default_na=False, na_values=[""])
    #passing into scrapper functions
    dataframe = scr.information(city)
    #append the returned data to the csv file
    frames = [df, dataframe]
    result = pd.concat(frames)
    result.to_csv('static/data/{0}.csv'.format(city), index=False)
    time.sleep(120)
    