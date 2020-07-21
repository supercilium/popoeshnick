from popo import db
from datetime import datetime
from werkzeug.security import generate_password_hash,check_password_hash



users_to_parties = db.Table('users_to_parties',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), nullable=False),
    db.Column('party_id', db.Integer, db.ForeignKey('parties.id'), nullable=False),
    db.PrimaryKeyConstraint('user_id', 'party_id')
    )

users_to_items = db.Table('users_to_items',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), nullable=False),
    db.Column('item_id', db.Integer, db.ForeignKey('items.id'), nullable=False),
    db.PrimaryKeyConstraint('user_id', 'item_id')
    )


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True)
    email = db.Column(db.String(120), unique=True)
    password_hash = db.Column(db.String(128))
# TODO: remove lg_score from DB. Instead - calculate
    lg_score = db.Column(db.Float())
    is_active = db.Column(db.Boolean, unique=False, default=True)
    parties = db.relationship('Party', secondary=users_to_parties, backref='users_p', lazy=True)
    items = db.relationship('Item', secondary=users_to_items, backref='users_i', lazy=True)

    def __init__(self, email, password):
        self.email = email
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash,password)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def get_rank_by_lg_score(self):
# TODO - change to dict-based
        if self.lg_score < 3:
            return 'noob'
        elif self.lg_score < 7:
            return 'rank 1'
        elif self.lg_score < 10:
            return 'rank 2'
        elif self.lg_score < 15:
            return 'rank 3'
        elif self.lg_score < 20:
            return 'rank 4'


    def json_profile(self):
        json_profile = {
        'username': self.username,
        'email': self.email,
        'lg_score': self.lg_score,
        'rank': self.get_rank_by_lg_score(),
# TODO - calcualte budget, move lg_score from stored in DB to calculated
        # 'budget': pass,
        }
        return json_profile



    def __repr__(self):
        return f'User: #{self.id}, email - {self.email}'

    def anon(self):
# TODO: add anonymization for user account
        pass


class Party(db.Model):
    __tablename__ = 'parties'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    start = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    end = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    location = db.Column(db.String(64))
# TODO: remove budget from db, replace with calculation
    budget = db.Column(db.Float())
    currency = db.Column(db.String(10))
    lg_score = db.Column(db.Float())
    note = db.Column(db.String(250))
    items = db.relationship('Item', backref='parties_i', lazy=True)
    users = db.relationship('User', secondary=users_to_parties, backref='parties_u', lazy=True)

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f'Party: #{self.id}, name - {self.name}'

    def json_party(self):
        json_party = {
        'name': self.name,
        'location': self.location,
        'items_list': self.items,

        }
        return json_party


class Item(db.Model):
    __tablename__ = 'items'
    id = db.Column(db.Integer, primary_key=True)
# TODO: do we need is_alc as a separate bool? maybe leave potency !=0 as indicator?
    is_alc = db.Column(db.Boolean, unique=False, default=True)
    name = db.Column(db.String(64))
    amount = db.Column(db.Float())
# TODO - decide, do we need to store lg_score in DB?
# or - calcualte it from amount, potency and number of users?
    lg_score = db.Column(db.Float())
    price = db.Column(db.Float())
    potency = db.Column(db.Float())
    party_id = db.Column(db.Integer, db.ForeignKey('parties.id'))
    users = db.relationship('User', secondary=users_to_items, backref='items_u', lazy=True)

    def __init__(self, name, party_id):
        self.name = name
        self.party_id = party_id

    def __repr__(self):
        return f'Item #{self.id}, called {self.name}, users: {self.users}'

    def json(self):
        return {
        'name': self.name,
        'amount': self.amount,
        'price': self.price,
        'shared_for_num': len(self.users),
        'budget_per_user': self.price/len(self.users),
        'lg_score': self.lg_score,
        'lg_score_per_user': self.lg_score/len(self.users),
        }
