import requests
from celery_worker import celery
from models.job_model import Job

@celery.task(name='services.conversion_service.add')
def add(x, y):
    return x + y

@celery.task(name='services.conversion_service.convert_pptx_to_pdf')
def convert_pptx_to_pdf(id, input_path, output_path):
    Job.update(id, {"status": "converting"})

    with open(input_path, 'rb') as f:
        files = {
            'file': (input_path, f, 'application/vnd.openxmlformats-officedocument.presentationml.presentation')
        }
        data = {
            'convert-to': 'pdf'
        }
        response = requests.post(
            'http://127.0.0.1:2004/request',
            files=files,
            data=data,
            timeout=60
        )
  
    if response.status_code != 200:
        Job.update(id, {
            "status": "failed",
        })
        raise Exception(f"Conversion failed: {response.status_code} - {response.text}")
    
    download_url = f"http://localhost:5500/download/{output_path.split('/')[-1]}"
    Job.update(id, {
            "status": "completed",
            "s3_url": output_path
        })
    with open(output_path, 'wb') as out_file:
        out_file.write(response.content)

    return {"status": "success", "output_path": download_url}
