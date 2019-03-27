"""REST API for location."""
import os
import shutil
import json
import flask
import camcrew
from camcrew.api.error_handler import InvalidUsage




@camcrew.app.route('/api/v1/location/',
                   methods=["GET", "POST"])
def get_location():
    context = {}
    cur = camcrew.model.get_db().cursor()

    if flask.request.method == "POST":
        locate_info = json.loads(flask.request.data)
        username = locate_info["username"]
        longitude = locate_info["longitude"]
        latitude = locate_info["latitude"]
        cur.execute('\
            UPDATE users \
            SET latitude = ? AND longitude = ?\
            WHERE username = ?\
            ', (latitude, longitude, username))
        context['updated'] = longitude
    else:
        users = cur.execute("""\
            SELECT fullname, username, latitude, longitude FROM users
            """).fetchall()
        context['allUsers'] = users

    return flask.jsonify(**context), 201
