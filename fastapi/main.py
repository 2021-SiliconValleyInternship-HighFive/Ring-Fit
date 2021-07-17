from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
# from fastapi.encoders import jsonable_encoder

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