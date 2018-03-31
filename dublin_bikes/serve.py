from flask import Flask, render_template, jsonify, g
import json
import sqlite3
import pandas as pd
from database_connection import DatabaseConnection
import pymysql
from sqlalchemy import create_engine



app = Flask(__name__)

@app.route('/')
def index():
    
    try:
        station_list, conn = DatabaseConnection()  
        station_list.head(1).to_html(classes='station_list')
        return render_template('index.html', data=station_list ),

    except Exception as e:
        return (str(e))

if __name__ == '__main__':
    app.run('''debug = True''')


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close() 


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

@app.route("/available/<int:station_id>")
def get_stations():
    engine = create_engine("mysql+pymysql://Group8:COMP30670@dublinbikes-rse.c3hjycqhuxxq.eu-west-1.rds.amazonaws.com:3306/DublinBikes") 
    data = DatabaseConnection
    rows = engine.execute("SELECT available_bikes from stations where number = {};".format(station_id))
    for row in rows:
        data.append(dict(row))

    return jsonify(available=data)  
   
