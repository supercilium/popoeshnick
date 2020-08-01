import os

class Config(object):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get("SECRET_KEY")
    if not SECRET_KEY:
        raise ValueError("No SECRET_KEY set for Flask application")

    SQLALCHEMY_DATABASE_URI = os.environ.get("DB_URI")
    # DB_URI is a string, like:
    # "postgresql://db_user:db_password@host:port/db_name"



class DevConfig(Config):
    DEBUG = True


class ProdConfig(Config):
    pass
