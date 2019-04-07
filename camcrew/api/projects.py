"""REST API for projects."""
import json
import flask
import camcrew
from camcrew.api.error_handler import InvalidUsage


@camcrew.app.route('/api/v1/<string:username>/projects/',
                    methods=["GET"])
def get_projects(username):
    context = {}
    cur = camcrew.model.get_db().cursor()

    cur.execute("""SELECT name, created, projectid FROM projects WHERE owner=?""", (username,))
    context["projects"] = cur.fetchall()

    return flask.jsonify(**context), 201


@camcrew.app.route('/api/v1/<string:username>/projects/',
                    methods=["POST"])
def create_project(username):
    context = {}
    cur = camcrew.model.get_db().cursor()

    data = json.loads(flask.request.data)
    projectid = 0
    if data["projectId"] != 0:
        projectid = data["projectId"]
    else:
        projectid = cur.execute('SELECT MAX(projectid) FROM projects;').fetchone()["MAX(projectid)"] + 1

    cur.execute('INSERT INTO projects(projectid, name, owner, created) VALUES (?,?,?,datetime("now"));',
                (projectid, 'New Project', username))

    if data["projectId"] == 0:
        cur.execute('INSERT INTO collaborators(projectid, username1, username2, created) VALUES (?,?,?,datetime("now"));',
                    (projectid, username, username))

    context["projectid"] = projectid
    # print(context["projectid"])

    return flask.jsonify(**context), 201
