from flask import Flask, render_template
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
    app.run()
