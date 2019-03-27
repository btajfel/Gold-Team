"""REST API for friends."""
import os
import json
import flask
import camcrew
from camcrew.api.error_handler import InvalidUsage


@camcrew.app.route('/api/v1/login/<string:username>/<string:password>',
                   methods=["POST"])
def login(username, password):
    context = {}
    cur = camcrew.model.get_db().cursor()

    if flask.request.method == "POST":
        result = cursor.execute("""
            SELECT username, password
            FROM users
            WHERE username = '%s'
            AND password = '%s'""" % (username, password)).fetchone()
        if not result:
            context['result'] = false
            return flask.jsonify(**context), 403
        else:
            context['result'] = true
    return flask.jsonify(**context), 201
