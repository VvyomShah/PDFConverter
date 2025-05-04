import uuid
import os
from flask import request, jsonify, current_app
from models.job_model import Job
import time


def create_job():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
      
    file = request.files['file']
    if not file.filename.endswith('.pptx'):
        return jsonify({'error': 'Only .pptx files allowed'}), 400

    if file:
        updated_filename = str(int(time.time()))+'_'+file.filename
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], 
                                 updated_filename)
        file.save(file_path)
        Job(updated_filename)
        return jsonify({"message": "Job created successfully"}), 200