"""Error handler for REST API."""
import flask
import camcrew


class InvalidUsage(Exception):
    """InvalidUsage class."""

    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        """Initialize states to parameters passed in."""
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        """Convert state into dictionary."""
        response = dict(self.payload or ())
        response['message'] = self.message
        response['status_code'] = self.status_code
        return response


@camcrew.app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    """Return json of error message."""
    response = flask.jsonify(error.to_dict())
    response.status_code = error.status_code
    return response
