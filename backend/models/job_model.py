# models/job_model.py
from utilities.database import get_db
import uuid

class Job:
    def __init__(self, filename):
        self.id = str(uuid.uuid4())
        self.filename = filename
        self.status = 'pending'
        self.error = None
        self.s3_url = ''


        db = get_db()
        db.execute('''
            INSERT INTO jobs (id, filename)
            VALUES (?, ?)
        ''', (self.id, self.filename))

        db.commit()

    def to_dict(self):
        return {
            'job_id': self.job_id,
            'filename': self.filename,
            'status': self.status,
            'error': self.error,
            's3_url': self.s3_url
        }