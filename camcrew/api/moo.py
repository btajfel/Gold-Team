"""REST API for projects."""
import os
import json
import arrow
import flask
import camcrew
from moviepy.editor import *
from moviepy.video.tools.drawing import circle
import moviepy.video.fx.all
# Compute filename
new_filename = os.path.join(
    camcrew.app.config["UPLOAD_FOLDER"],
    'test.mov'
)
clip = VideoFileClip(new_filename)
new_filename = os.path.join(
    camcrew.app.config["UPLOAD_FOLDER"],
    'textclip.mov'
)
screensize = (1920,1080)

"""
w,h = clip.size
# The mask is a circle with vanishing radius r(t) = 800-200*t               
clip.mask.get_frame = lambda t: circle(screensize=(clip.w,clip.h),
                                       center=(clip.w/2,clip.h/4),
                                       radius=max(0,int(800-200*t)),
                                       col1=1, col2=0, blur=4)


the_end = TextClip("The End", font="Amiri-bold", color="white",
                   fontsize=70).set_duration(clip.duration)

final = CompositeVideoClip([the_end.set_pos('center'),clip],
                           size =clip.size)
"""

olo = moviepy.video.fx.all.fadeout(clip, 2, 0.5)
result = CompositeVideoClip([olo],size=screensize) # Overlay text on video
result.write_videofile(new_filename,fps=25,codec='mpeg4') # Many options...