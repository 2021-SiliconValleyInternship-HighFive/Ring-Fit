from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# from fastapi.testclient import TestClient
# from fastapi.responses import HTMLResponse

import requests
import json

#
app = FastAPI()

# Add CORS URLs 
# Default Port - React : 3000, Flask : 5000
origins = [
    "http://localhost:80",
    "http://localhost:5000"
]


# Add CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)


'''
APIs
'''
# class Value(BaseModel):
#     x: int
#     y: int

class Size(BaseModel):
    cirumference: int
    size: int


# # x, y값 API
# # content-type: application/json
# @app.post('/api/x-y-value')
# async def find_value(value: Value):
#     return value                         

# # resized 이미지 파일 API
# # content-type: multipart/form-data
# @app.post('/api/resized-file')
# async def send_resized_file(file: UploadFile = File(...)):
#     return {"filename" : file.filename}  



# 데이터 전송 API
# content-type: multipart/form-data
@app.post('/api/data', status_code=201)
async def send_data(
    x: int = Form(...), y: int = Form(...), file: UploadFile = File(...)
):
    return {
        "x": x,
        "y": y,
        "filename" : file.filename
    }


# 결괏값 반환 API
# content-type: application/json
@app.post('/api/result', status_code=201)
async def return_result(result: Size):
    return result

# #test
# url = "http://localhost:8000/api/result"
# data = {"circumference" : 50, "size" : 12}
# res = request.port(url, data=json.dumps(data))
# res.text


# --------------- front 연동 테스트 --------------- #
@app.get("/")
async def read_root():
    return {"Hello": "World"}



# --------------- flask 연동 테스트 --------------- #

