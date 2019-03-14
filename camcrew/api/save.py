"""REST API for saving."""
import json
import flask
import camcrew
from camcrew.api.error_handler import InvalidUsage


@camcrew.app.route('/api/v1/<int:projectid>/save/',
                    methods=["POST"])
def get_creators(projectid):
	logname = flask.session["logname"]
	projectid = projectid
	cur = crewcam.model.get_db().cursor()

	# projects(projectid, name, owner, created)
	if flask.request.method == 'POST':
		cur.execute('INSERT INTO projects(postid, name, \
			owner, created) VALUES (?,?,?,datetime("now"));',
			(postid, FIX, logname))

	return flask.jsonify()
