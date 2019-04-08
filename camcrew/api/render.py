"""REST API for projects."""
import os
import json
import arrow
import flask
import camcrew
from moviepy.editor import *


@camcrew.app.route('/api/v1/<int:projectid>/render/name/',
                    methods=["GET"])
def get_render_name(projectid):
    context = {}
    cur = camcrew.model.get_db().cursor()

    cur.execute('SELECT video FROM projects WHERE projectid=?;', (projectid,))

    context["filename"] = cur.fetchone()["video"]


    return flask.jsonify(**context), 201


@camcrew.app.route('/api/v1/<int:projectid>/render/',
                    methods=["GET"])
def get_render(projectid):
    context = {}
    cur = camcrew.model.get_db().cursor()

    cur.execute('SELECT video FROM projects WHERE projectid=?;', (projectid,))

    filename = cur.fetchone()["video"]
    print(filename)
    file_path = os.path.join(
        camcrew.app.config["UPLOAD_FOLDER"],
        filename
    )

    return flask.send_file(file_path, attachment_filename=filename)


@camcrew.app.route('/api/v1/<int:projectid>/render/',
                    methods=["POST"])
def render(projectid):
    context = {}
    cur = camcrew.model.get_db().cursor()

    video_info = json.loads(flask.request.data)
    project_name = video_info["projectName"]
    cut_times = video_info["cutTimes"]
    print(cut_times)

    # Final project filename
    local = arrow.utcnow().to('US/Eastern')
    new_name = project_name + "-" + str(local.timestamp) + ".mov"
    project_path = os.path.join(camcrew.app.config["UPLOAD_FOLDER"], new_name)
    

    # First clip
    clip_name = cut_times[0]["filename"]
    clip_start = cut_times[0]["startTime"]
    clip_end = cut_times[0]["endTime"]

    new_filename = os.path.join(camcrew.app.config["UPLOAD_FOLDER"], clip_name)
    new_clip = VideoFileClip(new_filename).subclip(clip_start, clip_end)
    final_clip = concatenate_videoclips([new_clip])
    # First clip end, start loop

    cut_times.pop(0)

    # Loop this
    for video in cut_times:
        clip_name = video["filename"]
        clip_start = video["startTime"]
        clip_end = video["endTime"]

        new_filename = os.path.join(camcrew.app.config["UPLOAD_FOLDER"], clip_name)
        new_clip = VideoFileClip(new_filename).subclip(clip_start, clip_end)
        final_clip = concatenate_videoclips([final_clip, new_clip])


    # Make the text. Many more options are available.
    # txt_clip = TextClip("Show me the memes",fontsize=70,color='white')

    #result = CompositeVideoClip([clip1]) # Overlay text on video
    #result.write_videofile(new_filename,fps=25,codec='mpeg4') # Many options...


    final_clip.write_videofile(project_path,fps=25,codec='mpeg4')

    # Save filename in projects table
    cur.execute('UPDATE projects SET video=? WHERE projectid=?;',
                (new_name, projectid))

    context["filename"] = new_name

    return flask.jsonify(**context), 201
