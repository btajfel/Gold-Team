"""REST API for saving."""
import json
import flask
import tempfile
import os
import shutil
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

    # Compute filename
    new_filename = os.path.join(
        camcrew.app.config["UPLOAD_FOLDER"],
        file.filename
    )

    # Move temp file to permanent location
    shutil.move(temp_filename, new_filename)

    context["name"] = flask.request.form["name"]
    context["type"] = flask.request.form["type"]

    # projects(projectid, name, owner, created)
    if flask.request.method == 'POST':
        cur.execute('INSERT INTO creators(creatorid, username, \
            projectid, filename, created) VALUES (?,?,?,?,datetime("now"));',
            (4, "tjsande", projectid,file.filename))
    return flask.jsonify(**context), 201
