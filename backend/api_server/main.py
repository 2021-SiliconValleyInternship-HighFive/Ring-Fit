from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
# from starlette.middleware import Middleware
# from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# from fastapi.testclient import TestClient
# from fastapi.responses import HTMLResponse

# import requests
# import json

# FastAPI CORSMiddleware 
app = FastAPI()

# Add CORS URLs 
# Default Port - Nginx: 80, Flask : 5000
origins = [
    "http://localhost"
]


# Add CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

# # TRY: Starlette CORSMiddleware
# origins = [ 
#     "http://localhost:80"
#     # "http://localhost:3000",
#     # "http://localhost:3000/measure",
#     # "http://localhost:5000"
#     # "http://localhost:8000",
#     # "http://localhost"   #되는 주소
# ]

# middleware = [
#     Middleware(CORSMiddleware, allow_origins=origins)
# ]

# app = FastAPI(middleware=middleware)


'''
APIs
'''
# class Value(BaseModel):
#     x: int
#     y: int

class Size(BaseModel):
    cirumference: int
    size: int



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


# --------------- front 연동 테스트 --------------- #
@app.get("/")
async def read_root():
    return {"message": "you're at API server"}



# --------------- flask 연동 테스트 --------------- #

