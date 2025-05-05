import os
import time
from flask import request, jsonify, current_app
from celery.result import AsyncResult
from celery_worker import celery
from models.job_model import Job
from services.conversion_service import convert_pptx_to_pdf, add
from middleware.validation import require_file, validate_job_id

@require_file('pptx')
def create_job():
    file = request.files['file']
    updated_filename = str(int(time.time())) + '_' + file.filename
    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], updated_filename)
    file.save(file_path)

    new_job = Job.save(filename=updated_filename)
    output_path = os.path.join(current_app.config['OUTPUT_FOLDER'], updated_filename.replace('.pptx', '.pdf'))
    convert_pptx_to_pdf.apply_async(args=[new_job['id'], file_path, output_path], task_id=str(new_job['id']))

    return jsonify(new_job), 200

@validate_job_id
def get_job(job_id, job):
    result = AsyncResult(job_id, app=celery)

    response = {
        "job_id": job_id,
        "filename": job['filename'],
        "s3_url": job['s3_url'],
        "status": result.state,
        "created_at": job['created_at']
    }

    if result.state == 'SUCCESS':
        response["s3_url"] = f"http://localhost:5500/download/{job['s3_url'].split('/')[-1]}"
        return jsonify(response), 200
    elif result.state == 'FAILURE':
        response["error"] = str(result.result)
        return jsonify(response), 500
    elif result.state == 'PENDING':
        response["note"] = "The job is pending in the queue"
        return jsonify(response), 202
    else:
        response["note"] = "The job is still processing"
        return jsonify(response), 202