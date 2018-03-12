import scrapper as scr
import time
from _operator import index

city = 'Dublin'
while True:
    #passing into scrapper functions
    dataframe = scr.information(city)
    #temp storing data in csv file, will be stored in a database
    dataframe.to.csv('static/data/{0}.csv'.format(city), index=False)
    time.sleep(120)