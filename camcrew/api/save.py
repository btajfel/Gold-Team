"""REST API for saving."""
import json
import flask
import tempfile
import os
import shutil
import arrow
from math import floor
from moviepy.editor import VideoFileClip
import camcrew
from camcrew.api.error_handler import InvalidUsage


@camcrew.app.route('/api/v1/<int:projectid>/save/',
                    methods=["POST"])
def post_save(projectid):
    # logname = flask.session["logname"]
    context = {}
    cur = camcrew.model.get_db().cursor()

    # Create new filename hash.
    # Save POST request's file object to a temp file
    dummy, temp_filename = tempfile.mkstemp()
    file = flask.request.files["file"]
    file.save(temp_filename)

    # Get timestamp for filename
    local = arrow.utcnow().to('US/Eastern')

    # timestamp filename
    time_file = str(local.timestamp) + ".mov"

    # Compute filename
    new_filename = os.path.join(
        camcrew.app.config["UPLOAD_FOLDER"],
        time_file
    )

    username = flask.request.form['username']
    name = flask.request.form['name']
    startTime = flask.request.form['startTime']
    endTime = flask.request.form['endTime']
    # print(username, projectid)

    # Move temp file to permanent location
    shutil.move(temp_filename, new_filename)

    duration = floor(VideoFileClip(new_filename).duration)
    print(duration)

    context["file"] = file.filename

    # Get next videoid
    videoid = cur.execute('SELECT MAX(videoid) from videos;').fetchone()['MAX(videoid)'] + 1

    # projects(projectid, name, owner, created)
    cur.execute('INSERT INTO videos(videoid, username, \
        projectid, filename, trackname, starttime, endtime, duration, created) VALUES (?,?,?,?,?,?,?,?,datetime("now"));',
        (videoid, username, projectid, time_file, name, startTime, endTime, duration))

    return flask.jsonify(**context), 201
