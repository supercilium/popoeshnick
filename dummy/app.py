import flask
from flask import jsonify
import flask_login
from flask_wtf import FlaskForm
from wtforms.fields.html5 import EmailField
from wtforms.fields.simple import PasswordField
from wtforms import Form, StringField, PasswordField, validators

app = flask.Flask(__name__)
app.secret_key = 'SecretKey'
app.debug = True

login_manager = flask_login.LoginManager()
login_manager.init_app(app)

users = {}

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

@app.route('/Api/User/Login/', methods=['POST'])
def login():
    email = flask.request.form['email']
    if flask.request.form['password'] == users[email]['password']:
        user = User()
        user.id = email
        flask_login.login_user(user, remember=True)
        return jsonify({
            'Status': 'Success'
        })

    return jsonify({
            'Status': 'Error',
            'Message': 'Email or Password not allowed.'
        })

@app.route('/Api/User/Registration/', methods=['POST'])
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
