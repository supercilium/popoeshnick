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
    telegram_id = db.Column(db.Integer, unique=True)
    telegram_name = db.Column(db.String(32), unique=True)
    username = db.Column(db.String(64), unique=True)
    email = db.Column(db.String(120), unique=True)
    password_hash = db.Column(db.String(128))
    is_active = db.Column(db.Boolean, unique=False, default=True)
    parties = db.relationship('Party', secondary=users_to_parties, backref='users_p', lazy=True)
    items = db.relationship('Item', secondary=users_to_items, backref='users_i', lazy=True)

    def __init__(self, email, password):
        self.email = email
        self.password_hash = generate_password_hash(password)

    def __repr__(self):
        return f'User: #{self.id}, email - {self.email}'

    def check_password(self, password):
        return check_password_hash(self.password_hash,password)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)


    def get_lg_score(self):
        '''
        get lg_score for all user's recorded items
        '''

        res = db.session.execute('''
        select item_id, count(distinct user_id), potency, amount
        from users_to_items as u2i
        inner join items as i on i.id=u2i.item_id
        where item_id in
        (select item_id from users_to_items where user_id = :uid)
        group by item_id, potency, amount;
        ''', {'uid': self.id})

        lg_score = sum([r[2]*r[3]/r[1] for r in res])

        return "%.2f" % lg_score


    def get_rank_by_lg_score(self):
        score = float(self.get_lg_score())

        if 1 <= score < 6:
            return 'rank 1'
        elif 6 <= score < 11:
            return 'rank 2'
        elif 11 <= score < 16:
            return 'rank 3'
        elif 16 <= score <= 1000:
            return 'rank 4'
        else:
            raise ValueError('Unsupported score: {}'.format(roll))


    def get_budget(self):
        '''
        get total budget for user -- all recorded expenses
        '''

        res = db.session.execute('''
        select sum(i.price)
        from items as i
        left outer join users_to_items as u2i on i.id=u2i.item_id
        left outer join users as u on u.id=u2i.user_id
        where u.id = :uid;
        ''', {'uid': self.id}).fetchone()

        return res[0]


    def get_budget_per_party():
        '''
        get expenses list for a party for a user:
        items-prices-shared
        total
        '''


    def anon(self):
# TODO: add anonymization for user account
        pass

    def json_profile(self):
        return {
        'username': self.username,
        'email': self.email,
        'lg_score': self.get_lg_score(),
        'rank': self.get_rank_by_lg_score(),
        'budget': self.get_budget(),
        'parties_list': [p.json_party() for p in self.parties],
        }


class Party(db.Model):
    __tablename__ = 'parties'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    start = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    end = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    location = db.Column(db.String(64))
    note = db.Column(db.String(250))
    items = db.relationship('Item', backref='parties_i', lazy=True)
    users = db.relationship('User', secondary=users_to_parties, backref='parties_u', lazy=True)

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f'Party: #{self.id}, name - {self.name}'

    def get_budget(self):
        '''
        Get total budget for a party as a sum of prices of items that belong to this party.
        '''
        res = db.session.execute('select sum(price) from items where party_id= :pid', {'pid': self.id}).fetchone()
        return res[0]

    def get_lg_score(self):
        '''
        Get total lg score for a party as a sum of potency*amount for each item.
        '''
        res = db.session.execute('select amount, potency from items where party_id= :pid', {'pid': self.id})

        lg_score = sum([r[0]*r[1] for r in res])

        return "%.2f" % lg_score


    def get_intensity(self):
# TODO: add intensity
        '''
        Measure party intensity - in lg/hours
        '''
        pass


    def json_party(self):
        return {
        'start': self.start,
        'end': self.end,
        'name': self.name,
        'location': self.location,
        'budget':self.get_budget(),
        'lg_score': self.get_lg_score(),
# TODO: do we want to get only user's items, or all items for a party?
        'items_list': [i.json_item() for i in self.items],
        }


class Item(db.Model):
    __tablename__ = 'items'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    amount = db.Column(db.Float())
    price = db.Column(db.Float())
# TODO: move currency to enumerate in DB? is there a special type for currency
# on postgresql level?
    currency = db.Column(db.String(3))
    potency = db.Column(db.Float())
    party_id = db.Column(db.Integer, db.ForeignKey('parties.id'))
    users = db.relationship('User', secondary=users_to_items, backref='items_u', lazy=True)

    def __init__(self, name, party_id, price):
        self.name = name
        self.party_id = party_id,
        self.price = price

    def __repr__(self):
        return f'Item #{self.id}, called {self.name}, users: {self.users}'

    def budget_per_user(self):
# TODO: correct price handling from float rounding to int cents/kopecks/sens
        return "%.2f" % (self.price/len(self.users))

    def lg_scores(self):
        return {
            'lg_score': "%.2f" % (self.potency * self.amount),
            'lg_score_per_user': "%.2f" % (self.potency * self.amount / len(self.users)),
            }

    def json_item(self):
        return {
        'name': self.name,
        'amount': self.amount,
        'price': self.price,
        'price_per_user': self.budget_per_user(),
        'currency': self.currency,
        'shared_for_num': len(self.users),
        'lg_score': self.lg_scores()['lg_score'],
        'lg_score_per_user': self.lg_scores()['lg_score_per_user'],
        }
