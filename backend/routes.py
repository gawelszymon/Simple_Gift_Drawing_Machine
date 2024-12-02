import sqlite3
import time
from random import randint

import psycopg2
from flask import (current_app, jsonify, redirect, render_template, request, url_for)
from psycopg2 import errors
from backend.models import db, Friends


def init_routes(app):
    @app.route('/')
    def index():
        return render_template('index.html')
    
    @app.route('/get_available_friends')
    def get_available_friend():
        friends = Friends.query.all()
        return jsonify([{
            'id': friend.id,
            'friend_name': friend.friend_name
        } for friend in friends])
        
    @app.route('/delete_friend', methods=['POST'])
    def delete_friend():
        data = request.json
        if 'id' in data:
            friend = Friends.query.get(data['id'])
            if friend:
                db.session.delete(friend)
                db.session.commit()
                return jsonify({'status': 'Friend deleted'})
            return jsonify({'status': 'Friend not found'}), 404
        return jsonify({'status': 'ID not provided'}), 400