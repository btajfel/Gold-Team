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

    cur.execute("""SELECT name, created, projectid FROM projects WHERE owner = ?""", (username,))
    context["projects"] = cur.fetchall()

    return flask.jsonify(**context), 201
