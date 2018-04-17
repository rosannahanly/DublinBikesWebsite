from flask import Flask, render_template, jsonify, g, request
import json
import sqlite3
from pandas.tests.computation.test_eval import engine
from sqlalchemy import create_engine
from functools import lru_cache
import functools
import csv
import pickle
import pandas as pd
import numpy as np
from sklearn.externals import joblib
'''
my_model=pickle.load(open('finalized_model.sav','rb'))
print(my_model.predict([[4, 0, 1, 1]]))
'''

#cached_data = pickle.load("finalised_model.sav")

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


@app.route('/json')
def getJson():
    csvfile = open('../dublin_bikes/Analysis/dfGroupedFinal.csv')
    jsonlist = []
    reader = csv.reader(csvfile)
    for row in reader:
        jsonlist.append(row)
    return jsonify(jsonlist)


@app.route('/getModel', methods=['POST'])
def get_model():
    '''
    if request.method == 'POST':
        return render_template("index.html", label = '3')
    '''
    json_ = request.json
    query_df = pd.DataFrame(json_)
    query = pd.get_dummies(query_df)
    
    for col in model_columns:
        if col not in query.columns:
            query[col] = 0
    
    prediction = clf.predict(query)
    return jsonify({'prediction': list(prediction)})


if __name__ == '__main__':
    clf = joblib.load('../dublin_bikes/Analysis/finalized_model.pkl')
    #model_columns = joblib.load('../dublin_bikes/Analysis/model_columns.pkl')
    app.run(debug=True) 
