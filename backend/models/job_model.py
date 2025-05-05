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
        print(row[0])
        return row[0]
    
    def update(id, updates):
        """Update fields of an existing job."""
        db = get_db()

        # Dynamically build the SQL UPDATE statement
        set_clause = ', '.join([f"{field} = ?" for field in updates.keys()])
        values = list(updates.values()) + [id]

        # Execute the update query
        db.execute(f'''
            UPDATE jobs SET {set_clause} WHERE id = ?
        ''', values)
        db.commit()

        # Return the updated job
        return Job.get(id)