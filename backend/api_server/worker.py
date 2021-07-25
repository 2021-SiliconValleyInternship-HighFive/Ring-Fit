# Defines the celery app instance and associated config

from celery import Celery
from celery.signals import worker_init
from celery.signals import worker_shutdown
from celery.bin.celery import result

# Config
# RabbitMQ as the message broker, Redis as the result backend
# guest == Default queue
BROKER_URL = 'pyamqp://guest:guest@localhost:5672//'
BACKEND_URL = 'redis://localhost:6379/0'

# Create Instance
app = Celery('tasks', backend=BACKEND_URL, broker=BROKER_URL, include=['tasks'])

# # 초기화
# @worker_init.connect
# def init_worker(**kwargs):
# 	print('init')

# # 종료
# @worker_shutdown.connect
# def shutdown_worker(**kwargs):
# 	print('shut')


# result.get()