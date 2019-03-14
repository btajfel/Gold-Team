"""REST API for saving."""
import json
import flask
import camcrew
from camcrew.api.error_handler import InvalidUsage


@camcrew.app.route('/api/v1/<int:projectid>/save/',
                    methods=["POST"])
def post_save(projectid):
	return flask.jsonify()