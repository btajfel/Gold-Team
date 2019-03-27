"""REST API for friends."""
import os
import json
import flask
import camcrew
from camcrew.api.error_handler import InvalidUsage


@camcrew.app.route('/api/v1/create/',
                   methods=["POST"])
def create():
    context = {}
    cur = camcrew.model.get_db().cursor()
    login_info = json.loads(flask.request.data)
    username = login_info["username"]
    password = login_info["password"]
    fullname = login_info["fullname"]
    phonenumber = login_info["phonenumber"]
    email = login_info["email"]


    if flask.request.method == "POST":
        cur.execute('\
                INSERT INTO users(username, fullname, email, phonenumber, password, created) \
                VALUES (?, ?, ?, ?, ?, datetime("now", "localtime")) \
                ', (username, fullname, email, phonenumber, password))

    return flask.jsonify(**context), 201
