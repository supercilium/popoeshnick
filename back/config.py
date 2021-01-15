import os
import redis

class Config(object):

    # run . ./crdz.sh to set environment variables in bulk

    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get("SECRET_KEY")
    if not SECRET_KEY:
        raise ValueError("No SECRET_KEY set for Flask application")
    
    # DB_URI is a string, like:
    # "postgresql://db_user:db_password@host:port/db_name"
    SQLALCHEMY_DATABASE_URI = os.environ.get("DB_URI")

    BOT_TOKEN = os.environ.get("BOT_TOKEN")
    
    # REDIS
    SESSION_TYPE = 'redis'
    SESSION_REDIS = redis.from_url('redis://127.0.0.1:6379')



class DevConfig(Config):
    DEBUG = True

class ProdConfig(Config):
    pass
