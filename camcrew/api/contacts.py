"""REST API for friends."""
import os
import shutil
import json
import flask
import camcrew
from camcrew.api.error_handler import InvalidUsage



@camcrew.app.route('/api/v1/contacts/',
                   methods=["GET"])

def get_users():

	context = {}

    conn = insta485.model.get_db()
    cur = connect.cursor()

	contacts = cur.execute("""\
        SELECT username, fullname, phonenumber FROM users
        """).fetchall()
	context['allContacts'] = contacts
    connect.commit()


	return flask.jsonify(**context), 201
