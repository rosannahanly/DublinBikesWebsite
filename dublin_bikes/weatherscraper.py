import sqlite3
import json
import urllib.request
import time
import datetime
import calendar
import scraper as scr
import time
from sqlalchemy import create_engine
import pandas as pd
from six.moves.urllib.request import urlopen
import json
import pandas as pd
from datetime import datetime
from pandas_datareader import data

def get_data():
    """Get weather data from openweathermap"""
    #send a query to the API and decode the bytes it returns
    query = urlopen("http://api.openweathermap.org/data/2.5/weather?id=7778677&APPID=6986e64d5d176d1782825a12f2677fe4").read().decode('utf-8')
    #return the obtained string as a dictionary
    data = json.loads(query)
    #converting to a dataframe
    df = pd.DataFrame(data)
    main = df.main.apply(pd.Series)
    
    print(df)
    #extracting embedded positions
    df['temp'] = data['list'][0]['main']['temp']
    df['temp_min'] = data['list'][0]['main']['temp_min']
    df['temp_max'] = data['list'][0]['main']['temp_max']
    df['wind_speed'] = data['wind']['speed']
    try:
        df['wind_gust'] = data['wind']['gust']
    except KeyError:
        df['wind_gust'] = None
    try:
        df['rain'] = data['rain']['3h']
    except KeyError:
        df['rain'] = None
    try:
        df['snow'] = data['snow']['3h']
    except KeyError:
        df['snow'] = None
    df['weather_id'] = data['weather'][0]['id']
    df['dateTime'] = data["dt_txt"]

    print(df[['temp', 'temp_min', 'temp_max', 'wind_speed', 'wind_gust', 'rain', 'snow', 'weather_id']])
    return df[['temp', 'temp_min', 'temp_max', 'wind_speed', 'wind_gust', 'rain', 'snow', 'weather_id']]


def save_data_to_db(dataframe):
    #Assigning the engine variable values
    engine = create_engine("mysql+pymysql://Group8:COMP30670@dublinbikes-rse.c3hjycqhuxxq.eu-west-1.rds.amazonaws.com:3306/DublinBikes")
    #Creating the connection with the database
    conn = engine.connect()
    #passing into scrapper functions
    #Replaces the real time info in the RealTime table in the Amazon RDS database every 2 mins
    dataframe.to_sql(name='WeatherData',con=conn, if_exists='replace', index=False)
    print('done')
    conn.close()


def main():
    data = get_data()
    save_data_to_db(data)


if __name__ == '__main__':
    main()