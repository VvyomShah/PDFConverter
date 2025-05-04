# models/job_model.py
from utilities.database import get_db
import uuid
from flask import jsonify

class Job:
    def save(filename):
        id = str(uuid.uuid4())

        db = get_db()
        db.execute('''
            INSERT INTO jobs (id, filename)
            VALUES (?, ?)
        ''', (id, filename))
        db.commit()
 
        return Job.get(id)
    
    def get(id):
        db = get_db()
        cur = db.execute('''
            SELECT * FROM jobs WHERE id = ?
        ''', (id,))
        row = [dict((cur.description[i][0], value) \
               for i, value in enumerate(row)) for row in cur.fetchall()]
        return row[0]