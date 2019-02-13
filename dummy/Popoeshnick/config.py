import os
# set the basedir variable as a relative path from any place we call it to this file
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SECRET_KEY = 'this-really-needs-to-be-changed'
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:123@127.0.0.1:5432/popo"
    SQLALCHEMY_TRACK_MODIFICATIONS = False