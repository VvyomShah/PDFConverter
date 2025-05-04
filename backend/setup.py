# app.py
from flask import Flask
from routes.job_routes import register_job_routes
from utilities.database import set_db_context

def create_app():
    app = Flask(__name__)
    app.config['UPLOAD_FOLDER'] = 'storage/uploads'
    app.config['OUTPUT_FOLDER'] = 'storage/outputs'
    app.config['SQLITE_DB'] = 'backend/jobs.db'

    set_db_context(app)
    register_job_routes(app)
    return app