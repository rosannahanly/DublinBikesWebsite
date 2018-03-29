from flask import Flask, render_template, jsonify
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