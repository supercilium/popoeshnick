from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)


class User(Resource):
# 'registration' - receiving request from front
    def post(self):
        new_user = request.get_json()
        print ('got this:',new_user)

api.add_resource(User, '/api/user/registration/')


if __name__=='__main__':
    app.run(debug=True, host='localhost', port=3000)
