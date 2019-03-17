import flask
from flask import Flask
from flask_migrate import Migrate
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms import Form, StringField, PasswordField, validators
from werkzeug.security import generate_password_hash, check_password_hash
from flask import jsonify

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)

migrate = Migrate(app, db)


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True)
    email = db.Column(db.String(120), unique=True)
    password_hash = db.Column(db.String(128))

#SPIZDILA, HZ KAK ONO RABOTAET
    @classmethod
    def add_user(cls, **kw):
        obj = cls(**kw)
        db.session.add(obj)
        db.session.commit()

    def is_registered_email(self, email):
        if self.query.filter_by(email=email).first(): return True
        else: return False


    def get_user_by_uname(self, username):
        pass

    def get_user_by_id(self, id):
        pass

    def get_user_by_email(self, email):
        pass



class Popoika(db.Model):
    __tablename__ = 'popoika'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120))
    dtbeg = db.Column(db.DateTime)
    dtend = db.Column(db.DateTime)
    num_sobutyl = db.Column(db.Integer)
    location = db.Column(db.String(120))
    ligrylity = db.Column(db.Integer)

    def get_popoika_by_id(self, id):
        pass

    def add_popoika(self):
        pass


class Bukhlishko(db.Model):
    __tablename__ = 'bukhlishko'
    id = db.Column(db.Integer, primary_key=True)
    krep = db.Column(db.Float)
    drinktype = db.Column(db.String(120))
    drinkname = db.Column(db.String(120))

    def get_bukh_by_id(self, id):
        pass

    def add_bukh(self):
        pass


alk_to_popo = db.Table('alk_to_popo',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('alk_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('popo_id', db.Integer, db.ForeignKey('popoika.id'))
)

popo_to_bubkh = db.Table('popo_to_bubkh',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('popo_id', db.Integer, db.ForeignKey('popoika.id')),
    db.Column('bukh_id', db.Integer, db.ForeignKey('bukhlishko.id'))

)


class RegLogForm(FlaskForm):
    email = StringField('Email', [validators.Email()])
    password = PasswordField('Password', [validators.length(min=8), validators.Regexp('[A-Za-z0-9@#$%^&+=]')])

    class Meta:
        csrf = False


@app.route('/api/user/login/', methods=['GET','POST'])
def login():
    form = RegLogForm(flask.request.form)
    if form.validate():
        usr = User()
        if usr.is_registered_email(email=form.email.data):
            psswd = form.password.data
            if check_password_hash(usr.password_hash, psswd):
                return jsonify({'status': 'success'})
        return jsonify({'status': 'error',
                        'message':'Incorrect login-password pair'})
    else:
        errors_json = dict()
        for field_name, errors in form.errors.items():
            errors_json[field_name] = errors
        return jsonify({
            'status': 'error',
            'errors': errors_json
        })


@app.route('/api/user/registration/', methods=['GET','POST'])
def registration():
    form = RegLogForm(flask.request.form)
    usr = User()
    if form.validate():
        if not usr.is_registered_email(email=form.email.data):
            usr.add_user(email=form.email.data, password_hash = generate_password_hash(form.password.data))
        else: #such user is already here
            return jsonify({'status': 'error',
                            'message':'User already registered'})
    else:
        errors_json = dict()
        for field_name, errors in form.errors.items():
            errors_json[field_name] = errors
        return jsonify({
            'status': 'error',
            'errors': errors_json
        })
    return jsonify({'status': 'success',
                    'message': 'User registered successfully',
                    'email': form.email.data})


if __name__ == '__main__':
    app.run()