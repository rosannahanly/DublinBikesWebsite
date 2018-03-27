'''
This file grabs data every two mins from JCD and stores it in a CSV file.
This will be changed to an Amazon RDS 
'''
import scraper as scr
import time
from sqlalchemy import create_engine
import pandas as pd

city = 'Dublin'
engine = create_engine("mysql+pymysql://Group8:COMP30670@dublinbikes-rse.c3hjycqhuxxq.eu-west-1.rds.amazonaws.com:3306/DublinBikes")
conn = engine.connect()
while True:
    #passing into scrapper functions
    dataframe = scr.information(city)
    #temp storing data in csv file, will be stored in a database
    #with open('static/data/{0}.csv'.format(city), 'a') as f:
     #   dataframe.to_csv(f, index=False, header = False)
    dataframe.to_sql(name='RealTime',con=conn, if_exists='append', index=False)
    time.sleep(5*60)
con.close()
