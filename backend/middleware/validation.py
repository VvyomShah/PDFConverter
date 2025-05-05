import os
from functools import wraps
from flask import request, jsonify, current_app
from models.job_model import Job

def validate_job_id(func):
    @wraps(func)
    def wrapper(job_id, *args, **kwargs):
        if not job_id:
            return jsonify({'error': 'Missing job_id parameter'}), 400
        
        job = Job.get(job_id)
        if not job:
            return jsonify({'error': 'Job not found'}), 404
        
        # Attach job to kwargs so handler doesn't need to query again
        return func(job_id, job=job, *args, **kwargs)
    
    return wrapper

def require_file(extension='pptx'):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            file = request.files.get('file')
            if not file:
                return jsonify({'error': 'No file uploaded'}), 400
            if not file.filename.lower().endswith(f'.{extension}'):
                return jsonify({'error': f'Only .{extension} files are allowed'}), 400
            return f(*args, **kwargs)
        return wrapper
    return decorator


def validate_file_exists(func):
    @wraps(func)
    def wrapper(filename, *args, **kwargs):
        output_folder = current_app.config['OUTPUT_FOLDER']
        file_path = os.path.join(output_folder, filename)

        if not os.path.exists(file_path):
            return jsonify({'error': 'File not found'}), 404
        
        return func(filename, *args, **kwargs)
    
    return wrapper
