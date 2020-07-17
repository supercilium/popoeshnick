from popo.models import User, Party, Item
from flask import request
from flask_restful import Resource


class UserRes(Resource):

    def post(self):
        new_user = request.get_json()
        usr = User(email=new_user['email'])
        db.session.add(usr)
        db.session.commit()
        print ('got this:',new_user)
