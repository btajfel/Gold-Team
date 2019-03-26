"""REST API for friends."""
import os
import json
import flask
import camcrew
from camcrew.api.error_handler import InvalidUsage


@camcrew.app.route('/api/v1/<int:projectid>/invite/',
                   methods=["GET"])
def get_invite(projectid):
    context = {}
    cur = camcrew.model.get_db().cursor()
    collaborators = cur.execute("""\
    SELECT username1, username2 FROM collaborators WHERE projectid = ?
    """, (projectid,)).fetchall()

    context["collaborators"] = collaborators

    return flask.jsonify(**context), 201


@camcrew.app.route('/api/v1/invite/',
                   methods=["POST"])
def post_invite():
    context = {}
    cur = camcrew.model.get_db().cursor()

    projectid = 1
    if flask.request.method == "POST":
        cur.execute('SELECT MAX(projectid) FROM collaborators ')
        result = cur.fetchone()["MAX(projectid)"]
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


    context['projectid'] = projectid
    return flask.jsonify(**context), 201



