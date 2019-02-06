import flask
from flask import jsonify
import flask_login
from flask_wtf import FlaskForm
from wtforms.fields.html5 import EmailField
from wtforms.fields.simple import PasswordField
from wtforms import Form, StringField, PasswordField, validators

import pickle
from datetime import timedelta
from uuid import uuid4
from redis import Redis
from werkzeug.datastructures import CallbackDict
from flask.sessions import SessionInterface, SessionMixin

app = flask.Flask(__name__)
app.secret_key = 'SecretKey'
app.debug = True

login_manager = flask_login.LoginManager()
login_manager.init_app(app)

users = {}


class RedisSession(CallbackDict, SessionMixin):

    def __init__(self, initial=None, sid=None, new=False):
        def on_update(self):
            self.modified = True
        CallbackDict.__init__(self, initial, on_update)
        self.sid = sid
        self.new = new
        self.modified = False


class RedisSessionInterface(SessionInterface):
    serializer = pickle
    session_class = RedisSession

    def __init__(self, redis=None, prefix='session:'):
        if redis is None:
            redis = Redis()
        self.redis = redis
        self.prefix = prefix

    def generate_sid(self):
        return str(uuid4())

    def get_redis_expiration_time(self, app, session):
        if session.permanent:
            return app.permanent_session_lifetime
        return timedelta(days=1)

    def open_session(self, app, request):
        sid = request.cookies.get(app.session_cookie_name)
        if not sid:
            sid = self.generate_sid()
            return self.session_class(sid=sid, new=True)
        val = self.redis.get(self.prefix + sid)
        if val is not None:
            data = self.serializer.loads(val)
            return self.session_class(data, sid=sid)
        return self.session_class(sid=sid, new=True)

    def save_session(self, app, session, response):
        domain = self.get_cookie_domain(app)
        if not session:
            self.redis.delete(self.prefix + session.sid)
            if session.modified:
                response.delete_cookie(app.session_cookie_name,
                                       domain=domain)
            return
        redis_exp = self.get_redis_expiration_time(app, session)
        cookie_exp = self.get_expiration_time(app, session)
        val = self.serializer.dumps(dict(session))
        print(int(redis_exp.total_seconds()))
        self.redis.setex(self.prefix + session.sid, int(redis_exp.total_seconds()), val)
        response.set_cookie(app.session_cookie_name, session.sid,
                            expires=cookie_exp, httponly=True,
                            domain=domain)
                            
app.session_interface = RedisSessionInterface()

class User(flask_login.UserMixin):
    pass

class RegisterUserForm(FlaskForm):
    email = StringField('Email Address', [validators.Email()])
    password = PasswordField('New Password', [validators.Length(min=8), validators.Regexp('[A-Za-z0-9@#$%^&+=]')])

    class Meta:
        csrf = False


@login_manager.user_loader
def user_loader(email):
    if email not in users:
        return

    user = User()
    user.id = email
    return user


@login_manager.request_loader
def request_loader(request):
    email = request.form.get('email')
    if email not in users:
        return

    user = User()
    user.id = email
    user.is_authenticated = request.form['password'] == users[email]['password']

    return user

@app.route('/api/user/login/', methods=['POST'])
def login():
    email = flask.request.form['email']
    if flask.request.form['password'] == users[email]['password']:
        user = User()
        user.id = email
        flask_login.login_user(user)
        return jsonify({
            'Status': 'Success'
        })

    return jsonify({
            'Status': 'Error',
            'Message': 'Email or Password not allowed.'
        })

@app.route('/api/user/registration/', methods=['POST'])
def registration():
    form = RegisterUserForm(flask.request.form)
    if form.validate():        
        for user in users:
            if user == form.email.data:
                return jsonify({
                    'Status': 'Error',
                    'Message': 'User already created.'
                })
        users[form.email.data] = {'password': form.password.data }
        return jsonify({
            'Status': 'Success'
            })
    else:
        errors_json = dict()
        for field_name, errors in form.errors.items():
            errors_json[field_name] = errors
        return jsonify({
            'Status': 'Error',
            'Errors': errors_json
            })
