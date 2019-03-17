"""REST API for projects."""
import json
import flask
import camcrew
from camcrew.api.error_handler import InvalidUsage


@camcrew.app.route('/api/v1/projects/',
                    methods=["GET"])
def get_projects():
    context = {}
    cur = camcrew.model.get_db().cursor()

    cur.execute('SELECT name, owner FROM projects;')
    context["projects"] = cur.fetchall()

    return flask.jsonify(**context), 201
