"""REST API for saving."""
import json
import flask
import tempfile
import os
import shutil
import arrow
import camcrew
from camcrew.api.error_handler import InvalidUsage


@camcrew.app.route('/api/v1/<int:projectid>/save/',
                    methods=["POST"])
def post_save(projectid):
    # logname = flask.session["logname"]
    context = {}
    projectid = projectid
    cur = camcrew.model.get_db().cursor()

    # Create new filename hash.
    # Save POST request's file object to a temp file
    dummy, temp_filename = tempfile.mkstemp()
    file = flask.request.files["file"]
    file.save(temp_filename)

    # Get timestamp for filename
    local = arrow.utcnow().to('US/Eastern')

    # Compute filename
    new_filename = os.path.join(
        camcrew.app.config["UPLOAD_FOLDER"],
        str(local.timestamp) + ".mov"
    )

    username = flask.request.form['username']
    name = flask.request.form['name']
    startTime = flask.request.form['startTime']
    endTime = flask.request.form['endTime']
    print(name, startTime, endTime)

    # Move temp file to permanent location
    shutil.move(temp_filename, new_filename)

    context["file"] = file.filename

    # Get next videoid
    videoid = cur.execute('SELECT MAX(videoid) from videos;').fetchone()['MAX(videoid)'] + 1

    # projects(projectid, name, owner, created)
    cur.execute('INSERT INTO videos(videoid, username, \
        projectid, filename, starttime, endtime, created) VALUES (?,?,?,?,?,?,datetime("now"));',
        (videoid, username, projectid, name, startTime, endTime))

    return flask.jsonify(**context), 201
