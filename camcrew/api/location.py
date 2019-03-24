"""REST API for location."""
import os
import shutil
import json
import flask
import camcrew
from camcrew.api.error_handler import InvalidUsage


@camcrew.app.route('/api/v1/location/',
                   methods=["GET", "POST"])
def invite():
    context = {}
    cur = camcrew.model.get_db().cursor()

    if flask.request.method == "POST":
        cur.execute('\
            UPDATE users \
            SET latitude = ? AND longitude = ?\
            WHERE username = ?\
            ', (latitude, longitude, flask.session['username']))

    users = cur.execute("""\
        SELECT fullname, phonenumber, latitude, longitude FROM users
        """).fetchall()
    context['allUsers'] = users

    return flask.jsonify(**context), 201
