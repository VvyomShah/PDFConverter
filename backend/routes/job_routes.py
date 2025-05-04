from flask import Blueprint
from controllers import job_controller

def register_job_routes(app):
    app.add_url_rule('/', view_func=job_controller.handle_job, methods=['GET'])
