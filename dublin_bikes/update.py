'''
This file grabs data every two mins from JCD and stores it in a CSV file.
This will be changed to an Amazon RDS 
'''
import scrapper as scr
import time

city = 'Dublin'
while True:
    #passing into scrapper functions
    dataframe = scr.information(city)
    #temp storing data in csv file, will be stored in a database
    dataframe.to.csv('static/data/{0}.csv'.format(city), index=False)
    time.sleep(120)