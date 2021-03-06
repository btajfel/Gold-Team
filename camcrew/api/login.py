"""REST API for friends."""
import os
import json
import flask
import camcrew
from camcrew.api.error_handler import InvalidUsage


@camcrew.app.route('/api/v1/login/',
                   methods=["POST"])
def login():
    context = {}
    cur = camcrew.model.get_db().cursor()
    login_info = json.loads(flask.request.data)
    username = login_info["username"]
    password = login_info["password"]

    if flask.request.method == "POST":
        result = cur.execute("""
            SELECT username, password
            FROM users
            WHERE username =?""", (username,)).fetchone()
        if not result or result["password"] != password:
            context['result'] = False
            return flask.jsonify(**context), 201
        
        context['result'] = True
    return flask.jsonify(**context), 201
