"""REST API for videos."""
import os
import json
import flask
import camcrew
from camcrew.api.error_handler import InvalidUsage


@camcrew.app.route('/api/v1/<int:projectid>/videos/',
                    methods=["GET"])
def get_videos(projectid):

    context = {}
    cur = camcrew.model.get_db().cursor()

    cur.execute("""SELECT videoid, filename, trackname, starttime, endtime, duration FROM videos WHERE projectid=?""", 
                (projectid,))

    videos = cur.fetchall()

    # Sort videos by start time
    videos.sort(key=lambda k: k['starttime']) 

    context["videos"] = videos

    return flask.jsonify(**context), 201


@camcrew.app.route('/api/v1/<string:filename>/video/',
                    methods=["GET"])
def get_video(filename):
    file_path = os.path.join(
        camcrew.app.config["UPLOAD_FOLDER"],
        filename
    )

    return flask.send_file(file_path, attachment_filename=filename)

