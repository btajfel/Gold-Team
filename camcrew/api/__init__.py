"""CamCrew REST API."""

from camcrew.api.projects import get_projects
from camcrew.api.projects import create_project
from camcrew.api.contacts import get_users
from camcrew.api.save import post_save
from camcrew.api.videos import get_videos
from camcrew.api.videos import get_video
from camcrew.api.invite import get_invite
from camcrew.api.invite import post_invite
from camcrew.api.location import get_location
from camcrew.api.login import login
from camcrew.api.create import create
from camcrew.api.pending_invite import get_pending
from camcrew.api.pending_invite import post_pending
from camcrew.api.shared_with import shared_with
from camcrew.api.shared_with import share
