from celery import Celery
import os

celery = Celery(__name__, 
                broker=os.getenv('CELERY_BROKER_URL'),
                backend=os.getenv('CELERY_RESULT_BACKEND'))

def make_celery(app):
    celery.conf.update(app.config)

    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    celery.Task = ContextTask
    return celery

import services.conversion_service