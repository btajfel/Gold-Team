"""REST API for projects."""
import json
import flask
import camcrew
from camcrew.api.error_handler import InvalidUsage


@camcrew.app.route('/api/v1/<int:projectid>/',
                    methods=["GET"])
def get_projects(projectid):
	return flask.jsonify()
