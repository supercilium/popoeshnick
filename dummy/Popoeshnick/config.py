class Config(object):
    SECRET_KEY = 'this-really-needs-to-be-changed'
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:123@127.0.0.1:5432/popo"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
