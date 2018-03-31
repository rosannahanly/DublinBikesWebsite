from flask import Flask, render_template, jsonify, g
import json
import sqlite3
import pandas as pd
import pymysql
from database_connection import DatabaseConnection
  

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

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = DatabaseConnection()
    return db 
 
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
    rows = cur.execute("SELECT * from stations;")
    for row in rows:
        stations.append(dict(row))
    return jsonify(stations = stations)

@app.route("/available/<int:station_id>")
def get_stations():
    engine = get_db()
    data = []
    rows = engine.execute("SELECT available_bikes from stations where number = {};".format(station_id))
    for row in rows:
        data.append(dict(row))

    return jsonify(available=data)  
   
