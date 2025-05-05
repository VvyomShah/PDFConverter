# app.py
from flask import Flask
from routes.job_routes import register_job_routes
from routes.download_routes import register_download_routes
from utilities.database import set_db_context
from celery_worker import make_celery

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('config.py')

    set_db_context(app)
    register_job_routes(app)
    register_download_routes(app)
    make_celery(app)
    
    return app