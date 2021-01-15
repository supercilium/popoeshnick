from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_session import Session
from datetime import timedelta


app = Flask(__name__)


######################  for testing  #########################
@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/alive')
def live():
    return "it's alive"


# export FLASK_ENV variable
if app.config["ENV"] == "production":
    app.config.from_object("config.ProdConfig")
else:
    app.config.from_object("config.DevConfig")

api = Api(app)

db = SQLAlchemy(app)
Migrate(app, db)

app.permanent_session_lifetime = timedelta(minutes=10)
Session(app)



from popo.resources import Users
api.add_resource(Users, '/api/user/registration/', endpoint='users')

from popo.resources import UserID
api.add_resource(UserID, '/api/user/login/', endpoint = 'user_id')

# /user?id=123&

