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

    conn = insta485.model.get_db()
    cur = connect.cursor()


  	if flask.request.method == "POST":
    	cur.execute("""\
            INSERT INTO collaborators
            VALUES ('%s', '%s')
            """ % (flask.session['username'], postid_url_slug))

    contacts = cur.execute("""\
        SELECT username, fullname, phonenumber FROM users
        """).fetchall()
	context['allContacts'] = contacts
    connect.commit()


	return flask.jsonify(**context), 201