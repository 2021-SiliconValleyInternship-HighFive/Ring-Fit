from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
# from fastapi.encoders import jsonable_encoder

class Value(BaseModel):
    x: int
    y: int

app = FastAPI()

# x, y값 API
@app.post('/api/x-y-value')
def find_value(value: Value):
    return value

# resize 된 이미지 파일 API
@app.post('/api/resized-file')
async def send_resized_file(file: UploadFile = File(...)):
    return {"filename" : file.filename} 