# 📄 File Conversion App

A full-stack application for converting .PPTX to .PDF. Users can upload files, track conversion status in real time, and download the converted files.

## 🔧 Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, React Query
- **Backend**: Node.js, Express, AWS S3, Redis, Celery
- **File Storage**: SQLite3, Local disk store
- **Job Queue**: Redis

---

## Backend Setup

1. Navigate to the backend folder and install Python libraries:
```bash
cd backend
pip install -r requirements.txt
```

2. Turn up containers for Redis and Unoserver
```bash
docker-compose up -d
```

3. Set env variables for Celery
```bash
CELERY_BROKER_URL = 'redis://localhost:6379/0'
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
```
4. Launch Celery
```bash
celery -A celery_app.celery worker --loglevel=in
```

5. Launch Flask app
```bash
python app.py
```

## Frontend setup

1. Navigate to the frontend folder and install npm packages
```bash
bun install
```

2. Run NextJS server (dev for now)
```bash
bun run dev
```

## API Endpoints

Request: GET /job/:jobID
Response: {
    "created_at": "2025-05-05 03:48:34",
    "filename": "1746416914_Sample PPTX from Google Search.pptx",
    "job_id": "ca584bd1-8418-44ef-a08b-573284ff103a",
    "output_file": null,
    "s3_url": "http://localhost:5500/download/1746416914_Sample PPTX from Google Search.pdf",
    "status": "SUCCESS"
}

Request: POST /job
Body: {File: .pptx file}
Response: {
    "created_at": "2025-05-06 00:09:15",
    "error": null,
    "filename": "1746490155_Sample PPTX from Google Search.pptx",
    "id": "9016d603-d9e5-49ca-b9ac-26d82ae7a949",
    "s3_url": "",
    "status": "pending",
    "updated_at": "2025-05-06 00:09:15"
}