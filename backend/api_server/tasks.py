from celery import Celery

# RabbitMQ as the message broker, Redis as the result backend
app = Celery('tasks', backend='redis://localhost', broker='pyamqp://')