from flask import Flask, render_template, jsonify, g
import json
import sqlite3
from pandas.tests.computation.test_eval import engine
from sqlalchemy import create_engine
from functools import lru_cache
import functools


#Creating a flask app and giving path to static directory
app = Flask(__name__, static_url_path='')
#app.config.from_object('config')
'''
rds_host = "dublinbikes-rse.c3hjycqhuxxq.eu-west-1.rds.amazonaws.com"
name = "Group8"
password = "COMP30670"
db_name = "DublinBikes"
port = 3306
'''

def connect_to_database():
    engine = create_engine("mysql+pymysql://Group8:COMP30670@dublinbikes-rse.c3hjycqhuxxq.eu-west-1.rds.amazonaws.com:3306/DublinBikes")
    conn = engine.connect()
    return conn
   

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
      db.close() 


#Simply serves "static/index.html"
@app.route('/')
def root():
    return render_template('index.html')

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404

@app.route('/stations')
@functools.lru_cache(maxsize=128, typed=False)
def getStations():
    #Creating the connection with the database
    conn = connect_to_database()
    sql = "SELECT * FROM StationInfo;"
    stations = []
    rows = conn.execute(sql).fetchall()
    for row in rows:
        stations.append(dict(row))
    return jsonify(stations)


@app.route('/stationDetails')
def station_details():
    conn = connect_to_database()
    sql = "SELECT * FROM RealTime, StationInfo WHERE RealTime.name = StationInfo.StationIName"
    station_info = []
    rows = conn.execute(sql).fetchall()
    for row in rows:
        station_info.append(dict(row))
    return jsonify(station_info)

@app.route('/forecast')
def getForecast():
    #Creating the connection with the database
    conn = connect_to_database()
    sql = "SELECT * FROM WeatherForecast;"
    weather = []
    rows = conn.execute(sql).fetchall()
    for row in rows:
        weather.append(dict(row))
    return jsonify(weather)

@app.route('/weather')
def getWeather():
    #Creating the connection with the database
    conn = connect_to_database()
    sql = "SELECT * FROM WeatherData;"
    weatherData = []
    rows = conn.execute(sql).fetchall()
    for row in rows:
        weatherData.append(dict(row))
    return jsonify(weatherData)

@app.route('/historical')
@functools.lru_cache(maxsize=128, typed=False)
def getHistorical():
    conn = connect_to_database()
    sql = "SELECT * FROM UserTrends;"
    historicalData = []
    rows = conn.execute(sql).fetchall()
    for row in rows:
        historicalData.append(dict(row))
    return jsonify(historicalData)


if __name__ == '__main__':
    app.run(debug=True) 
