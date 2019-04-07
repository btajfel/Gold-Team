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
    collaborators = cur.execute('\
    SELECT username1, username2 FROM collaborators WHERE projectid = ? \
    ', (projectid,)).fetchall()

    context["collaborators"] = collaborators

    return flask.jsonify(**context), 201


@camcrew.app.route('/api/v1/invite/',
                   methods=["POST"])
def post_invite():
    context = {}
    cur = camcrew.model.get_db().cursor()

    projectid = 0
    if flask.request.method == "POST":
        data = json.loads(flask.request.data)
        print(data)
        projectid = data["projectid"]
        invited = data["inviteList"]
        username = data["username"]
        for user in invited:
            cur.execute('\
                INSERT INTO pending_invites(projectid, username1, username2, created) \
                VALUES (?, ?, ?, datetime("now", "localtime")) \
                ', (projectid, username, user))


    context['projectid'] = projectid
    return flask.jsonify(**context), 201



