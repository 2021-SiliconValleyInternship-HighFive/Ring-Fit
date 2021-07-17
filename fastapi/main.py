from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Backend origin
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]

# CORSMiddleware 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


'''
APIs
'''
class Value(BaseModel):
    x: int
    y: int

class Size(BaseModel):
    perimeter: int
    size: int

app = FastAPI()

# x, y값 API
@app.post('/api/x-y-value')
def find_value(value: Value):
    return value

# resized 이미지 파일 API
@app.post('/api/resized-file')
async def send_resized_file(file: UploadFile = File(...)):
    return {"filename" : file.filename} 

# 결과값 API
@app.post('/api/result')
async def get_result(result: Size):
    return result