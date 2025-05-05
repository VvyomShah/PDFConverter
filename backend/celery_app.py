from setup import create_app
from celery_worker import celery, make_celery

app = create_app()
make_celery(app)  # Ensures Flask context is available inside Celery tasks
