from flask import Flask, render_template, jsonify, g
import json
import sqlite3
import pandas as pd
from database_connection import DatabaseConnection
from sqlalchemy import create_engine
import pysql 


app = Flask(__name__)

def connect_to_database():
    engine = create_engine("mysql+pymysql://Group8:COMP30670@dublinbikes-rse.c3hjycqhuxxq.eu-west-1.rds.amazonaws.com:3306/DublinBikes")
    return engine

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = connect_to_database()
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close() 

@app.route('/')
def root():
    return render_template('index.html', MAPS_APIKEY= app.config["MAPS_APIKEY"])

@app.route('/stations')
def getStations():
    conn = get_db() 
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    stations = []
    rows = cur.execute("SELECT * from StationInfo    ;")
    for row in rows:
        stations.append(dict(row))
    return jsonify(stations = stations)

'''
@app.route("/available/<int:station_id>")
def get_stations():
    engine = get_db() 
    data = []
    rows = engine.execute("SELECT available_bikes from stations where number = {};".format(Station_ID))
    for row in rows:
        data.append(dict(row))

    return jsonify(available=data)  
'''   
if __name__ == '__main__':
    app.run('''debug = True''')