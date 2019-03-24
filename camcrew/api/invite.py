"""REST API for friends."""
import os
import shutil
import json
import flask
import camcrew
from camcrew.api.error_handler import InvalidUsage


@camcrew.app.route('/api/v1/invite/',
                   methods=["GET", "POST"])
def invite():
    context = {}
    cur = camcrew.model.get_db().cursor()

    if flask.request.method == "POST":
        cur.execute('\
            INSERT INTO collaborators \
            VALUES (?, ?) \
            ', (flask.session['username'], postid_url_slug))

    contacts = cur.execute("""\
        SELECT fullname, fullname, phonenumber FROM users
        """).fetchall()
    context['allContacts'] = contacts

    return flask.jsonify(**context), 201
