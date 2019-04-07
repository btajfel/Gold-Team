"""REST API for projects."""
import json
import flask
import camcrew
from moviepy.editor import *

@camcrew.app.route('/api/v1/render/',
                    methods=["GET"])
def render():
    context = {}
    cur = camcrew.model.get_db().cursor()


    # Compute filename
    old_filename = os.path.join(
    camcrew.app.config["UPLOAD_FOLDER"],
    'test.MOV'
    )
    #
    #[0:00]               [4:20]
    #[0:00]|-----------| [2:20]
    new_filename = os.path.join(
    camcrew.app.config["UPLOAD_FOLDER"],
    'render.mov'
    )

    video = VideoFileClip(old_filename).subclip(0,1)


    # Make the text. Many more options are available.

 #   txt_clip = TextClip("Show me the memes",fontsize=70,color='white')

    result = CompositeVideoClip([video]) # Overlay text on video
    result.write_videofile(new_filename,fps=25,codec='mpeg4') # Many options...

    if flask.request.method == 'GET':
        context["file"] = "moo"
    return flask.jsonify(**context), 201