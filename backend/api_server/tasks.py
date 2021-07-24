# Celery task definition

# import worker
# worker.worker.delay(data)

import importlib
import logging
from celery import Task

from .worker import app

@app.task(ignore_result=False,
 path=)