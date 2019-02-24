import flask
from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms import Form, StringField, PasswordField, validators
from werkzeug.security import generate_password_hash, check_password_hash
from flask import jsonify

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True)
    email = db.Column(db.String(120), unique=True)
    password_hash = db.Column(db.String(128))


class RegLogForm(FlaskForm):
    email = StringField('Email', [validators.Email()])
    password = PasswordField('Password', [validators.length(min=8), validators.Regexp('[A-Za-z0-9@#$%^&+=]')])

    class Meta:
        csrf = False


@app.route('/api/user/login/', methods=['GET','POST'])
def login():
    form = RegLogForm(flask.request.form)
    if form.validate():
        usr = User.query.filter_by(email=form.email.data).first()
        if usr:
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
    if form.validate():
        email = form.email.data
        psswd = form.password.data
        if not User.query.filter_by(email=form.email.data).first():
            u = User(email=email, password_hash = generate_password_hash(psswd))
            db.session.add(u)
            db.session.commit()
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
    return 'User will register here'


if __name__ == '__main__':
    app.run()