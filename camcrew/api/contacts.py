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
    cur = camcrew.model.get_db().cursor()

    cur.execute('SELECT username, fullname, phonenumber FROM users')
    context['allContacts'] = cur.fetchall()

    return flask.jsonify(**context), 201
