from popo import db
from popo.models import User, Party, Item
from flask import request
from flask_restful import Resource


class UserReg(Resource):

    def post(self):
        email = request.get_json()['email']
        password = request.get_json()['password']
        user = User(email=email, password=password)
        db.session.add(user)
        db.session.commit()
