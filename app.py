import os
import sys
import json

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, desc

from flask import Flask
from flask import jsonify
from flask import render_template
from flask_sqlalchemy import SQLAlchemy
from flask import Response

app = Flask(__name__)

import sqlite3
from flask import g

DATABASE = './datasets/Tornados22.sqlite'


def get_db():
    db = sqlite3.connect(DATABASE)
    return db


db = get_db()
engine = create_engine('sqlite:///datasets/Tornados22.sqlite', echo=False)
con = engine.connect()
#----------------------------------------------
# Return the homepage.

@app.route("/")
def home():
#    return '<h1> App started ... </h1>'
    return render_template("index.html")

#Index page
@app.route("/")
def index():
    return render_template("index.html")



# build statistics.html related data
from getFromDb import getEvents, makeGeo, getEventHeader

@app.route("/b_events")  #background process - get all events
def back_events():
    allEvents = getEvents(engine)
    #print(allEvents[0])
    return jsonify(list(allEvents)) 

@app.route("/b_eventHeader/<id_x>")  #background process - get header for single event
def eventXHeader(id_x):
    this_event_header = getEventHeader(engine,id_x)
   # print(this_event_header)
    return this_event_header.to_json()

@app.route("/b_events/<id_x>")  #background process - get info for single event
def eventX(id_x):
    this_event_geo = makeGeo(engine,id_x)
    #print(this_event_geo)
    return jsonify(this_event_geo)

@app.route("/statistics")
def statistics():
    #try:
    return render_template("statistics.html")
    #except Exception, e:
     #   return (str(e))


#----------------------------------------------
# Return the eventmap page.

@app.route("/eventmap")
def eventmap():
#    return '<h1> App started ... </h1>'
    return render_template("eventmap.html")

#----------------------------------------------
# Return data points for Texas 
#
@app.route("/txdatadb")
def txdatadb():

    id = "Texas"
    dftmp =  pd.read_sql('Select * from Tornados22 where State1="'+id+'" Order by Date,Time',engine)
    points = {'type':'FeatureCollection', 'features':[]}

    for i in range(0,dftmp.iloc[0:].shape[0]) :
        points['features'].append(getdata(dftmp.iloc[i]))

    return jsonify(points)

#----------------------------------------------
# Return data points for Oklahoma 
#
@app.route("/okdatadb")
def okdatadb():

    id = "Oklahoma"
    dftmp =  pd.read_sql('Select * from Tornados22 where State1="'+id+'" Order by Date,Time',engine)
    points = {'type':'FeatureCollection', 'features':[]}

    for i in range(0,dftmp.iloc[0:].shape[0]) :
        points['features'].append(getdata(dftmp.iloc[i]))

    return jsonify(points)

#----------------------------------------------
# Return data points for Kansas 
#
@app.route("/ksdatadb")
def ksdatadb():

    id = "Kansas"
    dftmp =  pd.read_sql('Select * from Tronados22 where State1="'+id+'" Order by Date,Time',engine)
    points = {'type':'FeatureCollection', 'features':[]}

    for i in range(0,dftmp.iloc[0:].shape[0]) :
        points['features'].append(getdata(dftmp.iloc[i]))

    return jsonify(points)

#----------------------------------------------
# Return data points for Nebraska 
#
@app.route("/nedatadb")
def nedatadb():

    id = "Nebraska"
    dftmp =  pd.read_sql('Select * from Tronados22 where State1="'+id+'" Order by Date,Time',engine)
    points = {'type':'FeatureCollection', 'features':[]}

    for i in range(0,dftmp.iloc[0:].shape[0]) :
        points['features'].append(getdata(dftmp.iloc[i]))

    return jsonify(points)


#----------------------------------------------
# Utility : get data points from dataframe row 
#
def getdata (row) :
    return {'type':'Feature', 
            'geometry': {
                'type':'Point',
                'coordinates':[row['TouchdownLon'],row['TouchdownLat']]
            },
            'properties': {
                'Fujita':int(row['Fujita']),
                'date':row['Date'],
                'time':row['Time']
            }}


if __name__ == "__main__":
    app.run(debug=True)


