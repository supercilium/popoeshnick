from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


app = Flask(__name__)
api = Api(app)

app.config['SECRET_KEY'] = 'govna piroga'
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://popo:123@127.0.0.1:5432/popo"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
Migrate(app, db)

from popo.resources import UserReg
api.add_resource(UserReg, '/api/user/registration/')
