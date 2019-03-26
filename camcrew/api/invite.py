"""REST API for friends."""
import os
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
        cur.execute('SELECT MAX(projectid) FROM collaborators ')
        result = cur.fetchone()["MAX(projectid)"]
        projectid = 1
        if result:
            projectid =  result + 1

        data = json.loads(flask.request.data)
        print("json")
        invited = data["inviteList"]
        print(invited)
        for user in invited:
            cur.execute('\
                INSERT INTO collaborators(projectid, username1, username2, created) \
                VALUES (?, ?, ?, datetime("now", "localtime")) \
                ', (projectid, "btajfel", user))

    contacts = cur.execute("""\
        SELECT fullname, username, phonenumber FROM users
        """).fetchall()
    context['allContacts'] = contacts

    return flask.jsonify(**context), 201
