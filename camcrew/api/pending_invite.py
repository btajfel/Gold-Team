"""REST API for location."""
import os
import shutil
import json
import flask
import camcrew
from camcrew.api.error_handler import InvalidUsage


@camcrew.app.route('/api/v1/<string:username>/pending/',
                   methods=["GET"])
def get_pending(username):
    context = {}
    cur = camcrew.model.get_db().cursor()
    pending_info = cur.execute('\
            SELECT projectid, username1 FROM pending_invites WHERE username2 = ? \
            ', (username,)).fetchone()

    if (pending_info["projectid"]):
        context["status"] = "true"
        context["pid"] = pending_info["projectid"]
        context["inviter"] = pending_info["username1"]
    else:
        context["status"] = "false"

    return flask.jsonify(**context), 201


@camcrew.app.route('/api/v1/<string:decision>/pending/',
                   methods=["POST"])
def post_pending(decision):
    context = {}
    cur = camcrew.model.get_db().cursor()

    if (decision == "accept"):
        data = json.loads(flask.request.data)
        pid = data["pid"]
        username2 = data["username"]
        username1 = data["inviter"]
        cur.execute('\
            INSERT INTO collaborators(projectid, username1, username2, created) \
            VALUES (?, ?, ?, datetime("now", "localtime")) \
            ', (pid, username1, username2))
    cur.execute('\
            DELETE FROM pending_invites WHERE username2 = ? \
            ', (username2,)).fetchone()


    return flask.jsonify(**context), 201
