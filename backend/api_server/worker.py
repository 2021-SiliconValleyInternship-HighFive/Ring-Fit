from celery import Celery
from celery.signals import worker_init
from celery.signals import worker_shutdown
from celery.bin.celery import result

# Settings
# RabbitMQ as the message broker, Redis as the result backend
# guest == Default queue
app = Celery('tasks', backend='redis://localhost', broker='pyamqp://guest:guest@localhost:5672//')

# 초기화
@worker_init.connect
def init_worker(**kwargs):
	print('init')

