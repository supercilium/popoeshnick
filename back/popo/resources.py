from popo import db
from popo.models import User, Party, Item
from flask import request
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError


class Users(Resource):

    def post(self):

        email = request.get_json()['email']
        password = request.get_json()['password']
        user = User(email=email, password=password)

        try:
            db.session.add(user)
            db.session.commit()
        
        except IntegrityError:
            return {'error': 'email already registered'}, 409

        else:
            id = User.query.filter_by(email=email).first().id
            return {'user_id': id}, 201

    
    # def get(self):

    #     users = User.query.all()
    #     res = [u.json_profile() for u in users]

    #     return {
    #         'number_of_users': len(res),
    #         'users_list': res
    #     }, 200


class UserID(Resource):
    
    def post(self):
        email = request.get_json()['email']
        password = request.get_json()['password']

        u =  User.query.filter_by(email=email).first()

        if u == None:
            return {
                    "status":"error",
                    "errors": {
                                "email":["email address is not registered", ], 
                                "password":[], 
                                "login":[]
                               }
                    }
        else:
            if u.check_password(password):
                return {
                        "status": "success",
                        "profile":  u.json_profile()
                       }
            else:
                return {
                    "status":"error",
                    "errors": {
                                "email":[], 
                                "password":["wrong password", ], 
                                "login":[]
                               }
                    }


        

        # if User.query.filter_by(id=id).first():
        #     return User.query.filter_by(id=id).first().json_profile(), 200

        # else:
        #     return {'error': f'no user found with ID {id}'}, 404

