"""REST API for location."""
import os
import shutil
import json
import flask
import camcrew
from camcrew.api.error_handler import InvalidUsage


@camcrew.app.route('/api/v1/<string:username>/shared/',
                   methods=["GET"])
def shared_with(username):
    context = {}
    cur = camcrew.model.get_db().cursor()
    shared_videos = cur.execute('\
            SELECT projectid, name, owner FROM shared_projects WHERE sharedWith = ? \
            ', (username,)).fetchall()

    if (shared_videos):
        context["status"] = "true"
        context["shared"] = shared_videos
        return flask.jsonify(**context), 201
    else:
        context["status"] = "false"

    return flask.jsonify(**context), 201


@camcrew.app.route('/api/v1/shared/',
                   methods=["POST"])
def share():
    context = {}
    cur = camcrew.model.get_db().cursor()

    data = json.loads(flask.request.data)
    pid = data["pid"]
    owner = data["owner"]
    vidInfo = cur.execute('\
                SELECT name, created FROM projects WHERE owner = ? AND projectid = ? \
                ', (owner, projectid)).fetchone()
    name = vidInfo["name"]
    created = vidInfo["created"]
    shared = data["sharedList"]
    for user in shared:
        cur.execute('\
            INSERT INTO shared_projects(projectid, name, owner, sharedWith, created) \
            VALUES (?, ?, ?, ?, datetime("now", "localtime")) \
            ', (projectid, name, owner, user))

    return flask.jsonify(**context), 201
