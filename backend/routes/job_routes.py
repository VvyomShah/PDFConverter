from flask import Blueprint
from controllers import job_controller

def register_job_routes(app):
    app.add_url_rule('/job', view_func=job_controller.create_job, methods=['POST'])
