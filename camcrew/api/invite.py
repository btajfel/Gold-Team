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

    projectid = 1
    if flask.request.method == "POST":
        collabResult = cur.execute('SELECT MAX(projectid) FROM collaborators ').fetchone()
        pendingResult =  cur.execute('SELECT MAX(projectid) FROM pending_invites ').fetchone()
        if (collabResult and pendingResult):
            if (pendingResult > collabResult):
                projectid =  pendingResult + 1
            else:
                projectid = collabResult + 1

        data = json.loads(flask.request.data)
        invited = data["inviteList"]
        for user in invited:
            cur.execute('\
                INSERT INTO pending_invites(projectid, username1, username2, created) \
                VALUES (?, ?, ?, datetime("now", "localtime")) \
                ', (projectid, "btajfel", user))


    context['projectid'] = projectid
    return flask.jsonify(**context), 201



