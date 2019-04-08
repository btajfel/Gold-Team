"""REST API for projects."""
import json
import flask
import camcrew
from moviepy.editor import *

@camcrew.app.route('/api/v1/<int:projectid>/render/',
                    methods=["POST"])
def render(projectid):
    context = {}
    #cur = camcrew.model.get_db().cursor()

    video_info = json.loads(flask.request.data)
    clip_name = video_info["projectname"]

    # Final project filename
    project_name = os.path.join(camcrew.app.config["UPLOAD_FOLDER"], projname)
    

    # First clip
    clip_name = video_info["clipname"]
    clip_start = video_info["username"]
    clip_end = video_info["password"]

    new_filename = os.path.join(camcrew.app.config["UPLOAD_FOLDER"], clip_name)
    new_clip = VideoFileClip(new_filename).subclip(clip_start, clip_end)
    final_clip = concatenate_videoclips([new_clip])
    # First clip end, start loop



    # Loop this
    clip_name = clipstart = login_info["clipname"]
    clip_start = video_info["username"]
    clip_end = video_info["password"]

    new_filename = os.path.join(camcrew.app.config["UPLOAD_FOLDER"],clip_name)
    new_clip = VideoFileClip(new_filename).subclip(clip_start, clip_end)
    final_clip = concatenate_videoclips([final_clip, new_clip])



    

    # Make the text. Many more options are available.
    # txt_clip = TextClip("Show me the memes",fontsize=70,color='white')

    #result = CompositeVideoClip([clip1]) # Overlay text on video
    #result.write_videofile(new_filename,fps=25,codec='mpeg4') # Many options...


    final_clip.write_videofile(project_name,fps=25,codec='mpeg4')




    if flask.request.method == 'GET':
        context["file"] = "moo"
    return flask.jsonify(**context), 201
