from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


app = Flask(__name__)

# export FLASK_ENV variable
if app.config["ENV"] == "production":
    app.config.from_object("config.ProdConfig")
else:
    app.config.from_object("config.DevConfig")

api = Api(app)

db = SQLAlchemy(app)
Migrate(app, db)

from popo.resources import UserReg
api.add_resource(UserReg, '/api/user/registration/')
