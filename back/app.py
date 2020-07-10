from flask import Flask
from flask_restful import Resource, Api


app = Flask(__name__)
api = Api(app)

class HelloWorld(Resource):
    def get(self):
        return {'hello':'world'}

# here we add register resource with API
# pass class name (not the instance)
# and the second argument is the URL where
# this resource will be accessible
api.add_resource(HelloWorld, '/')


if __name__=='__main__':
    app.run(debug=True)
