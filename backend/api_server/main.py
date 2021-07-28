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
# frontend: http://localhost
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


'''
APIs
'''


class Size(BaseModel):
    circumference: int
    size: int



# 데이터 전송 API
# content-type: multipart/form-data
@app.post('/api/data', status_code=201, tags=["User"])
async def send_data(
    x: int = Form(...), 
    y: int = Form(...), 
    file: UploadFile = File(...)
):
    return {
        "x": x,
        "y": y,
        "filename" : file.filename
    }


# 결괏값 반환 API
# content-type: application/json
@app.get('/api/result', status_code=200, tags=["User"], response_description="result successfully retrieved")
async def return_result():
    return { "circumference" : 56, "size" : 13 }





