from datetime import datetime
from flask import Flask, request
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash,check_password_hash

app = Flask(__name__)
api = Api(app)

app.config['SECRET_KEY'] = 'govna piroga'
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://popo:123@127.0.0.1:5432/popo"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
Migrate(app, db)

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True)
    email = db.Column(db.String(120), unique=True, primary_key=True)
    password_hash = db.Column(db.String(128))
    lg_score = db.Column(db.Float())
    is_active = db.Column(db.Boolean, unique=False, default=True)

    def __init__(self, email):
        self.email = email

    def anon(self):
        # procedure to anonymize user's data
        pass


class Party(db.Model):
    __tablename__ = 'party'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    start = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    end = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    location = db.Column(db.String(64))
    budget = db.Column(db.Float())
    currency = db.Column(db.String(10))
    lg_score = db.Column(db.Float())
    note = db.Column(db.String(250))
    line_items = db.relationship('LineItem', backref='party', lazy=True)

    def __init__(self, name):
        self.name = name



class LineItem(db.Model):
    __tablename__ = 'line_item'
    id = db.Column(db.Integer, primary_key=True)
# TODO: do we need is_alc as a separate bool? maybe leave potency !=0 as indicator?
    is_alc = db.Column(db.Boolean, unique=False, default=True)
    name = db.Column(db.String(64))
    amount = db.Column(db.Float())
    lg_score = db.Column(db.Float())
    price = db.Column(db.Float())
    potency = db.Column(db.Float())
    party_id = db.Column(db.Integer, db.ForeignKey('party.id'))

    def __init__(self, name, party_id):
        self.name = name
        self.party_id = party_id


class UserRes(Resource):

    def post(self):
        new_user = request.get_json()
        usr = User(email=new_user['email'])
        db.session.add(usr)
        db.session.commit()
        print ('got this:',new_user)




api.add_resource(UserRes, '/api/user/registration/')


if __name__=='__main__':
    app.run(debug=True, host='localhost', port=5000)
