from flask import Flask
from flask import jsonify
from flask import render_template
from flask_sqlalchemy import SQLAlchemy
from flask import Response
from flask import redirect
from flask import url_for
from flask import request

# app = Flask(__name__)
app = Flask(__name__, static_url_path='')

#----------------------------------------------
# Return the homepage.

@app.route('/')
def root():
    return app.send_static_file('index.html')
# @app.route("/")
# def home():
#     app.add_url_rule("/index","index",index)


@app.route("/statistics.html")  
def statistics():
    return app.send_static_file('statistics.html')

@app.route("/eventmap.html")
def eventmap():
    return app.send_static_file('eventmap.html')

@app.route("/sirenmap.html")
def sirenmap():
    return app.send_static_file('sirenmap.html')

if __name__ == "__main__":
    app.run(debug=True)
