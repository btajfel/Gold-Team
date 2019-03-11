"""REST API for videos."""
import json
import flask
import camcrew
from camcrew.api.error_handler import InvalidUsage


@camcrew.app.route('/api/v1/<int:projectid>/videos/',
                    methods=["GET"])
def get_creators(projectid):
	return flask.jsonify()
