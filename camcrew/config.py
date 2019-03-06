"""
CamCrew development configuration.

GoldTeam <gold.team@umich.edu>
"""

import os

# Root of this application, useful if it doesn't occupy an entire domain
APPLICATION_ROOT = '/'

# Secret key for encrypting cookies
SECRET_KEY = b"\xb2\xadLB\xb3\xd8'\xdd\xa5K\xbc\x95\xe7\xdf\xf7\xdd\xc72\x95\xe7ktBJ"  # noqa: E501  pylint: disable=line-too-long
SESSION_COOKIE_NAME = 'login'

# File Upload to var/uploads/
UPLOAD_FOLDER = os.path.join(
    os.path.dirname(os.path.dirname(os.path.realpath(__file__))),
    'var', 'uploads'
)
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif', 'mov', 'mp4'])
MAX_CONTENT_LENGTH = 16 * 1024 * 1024

# Database file is var/insta485.sqlite3
DATABASE_FILENAME = os.path.join(
    os.path.dirname(os.path.dirname(os.path.realpath(__file__))),
    'var', 'camcrew.sqlite3'
)
