"""REST API for friends."""
import os
import shutil
import json
import flask
import camcrew
from camcrew.api.error_handler import InvalidUsage


@camcrew.app.route('/api/v1/invite/',
                   methods=["GET", "POST"])
def invite():
    context = {}
    cur = camcrew.model.get_db().cursor()

    if flask.request.method == "POST":
        data = json.loads(flask.request.data)
        invited = data["inviteList"]
        for user in invited:
            cur.execute('\
                INSERT INTO collaborators(username1, username2, created) \
                VALUES (?, ?, ?) \
                ', ("Brandon", user, datetime('now', 'localtime')))


    contacts = cur.execute("""\
        SELECT fullname, fullname, phonenumber FROM users
        """).fetchall()
    context['allContacts'] = contacts

    return flask.jsonify(**context), 201
