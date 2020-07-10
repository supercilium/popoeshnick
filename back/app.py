from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

users = [
        {'name': 'John',
         'score': 12,
         'budget': 1400},
        {'name': 'Bob',
         'score': 29,
         'budget': 2800},
        ]


class User(Resource):
    def get(self, name):
        for user in users:
            if user['name'].lower() == name.lower():
                return user
        return {'name': None}, 404


api.add_resource(User, '/user/<string:name>')


if __name__=='__main__':
    app.run(debug=True)
