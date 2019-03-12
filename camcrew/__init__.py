"""
CamCrew package initializer.

GoldTeam <gold.team@umich.edu>
"""
import flask

# app is a single object used by all the code modules in this package
app = flask.Flask(__name__)  # pylint: disable=invalid-name

# Read settings from config module (camcrew/config.py)
app.config.from_object('camcrew.config')

# Overlay settings read from file specified by environment variable. This is
# useful for using different on development and production machines.
# Reference: http://flask.pocoo.org/docs/0.12/config/
app.config.from_envvar('CAMCREW_SETTINGS', silent=True)

# Tell our app about views and model.  This is dangerously close to a
# circular import, which is naughty, but Flask was designed that way.
# (Reference http://flask.pocoo.org/docs/0.12/patterns/packages/)  We're
# going to tell pylint and pycodestyle to ignore this coding style violation.
import camcrew.api  # noqa: E402  pylint: disable=wrong-import-position
import camcrew.views  # noqa: E402  pylint: disable=wrong-import-position
import camcrew.model  # noqa: E402  pylint: disable=wrong-import-position
