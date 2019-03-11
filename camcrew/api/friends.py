"""REST API for friends."""
import json
import flask
import camcrew
from camcrew.api.error_handler import InvalidUsage


@camcrew.app.route('/api/v1/friends/',
                    methods=["GET"])
def get_friends():
	return flask.jsonify()
