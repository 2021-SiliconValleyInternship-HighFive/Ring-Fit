from fastapi import FastAPI, File, UploadFile, Form, Path, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pydantic import BaseModel, Field
from typing import List

# from fastapi.testclient import TestClient
# from fastapi.responses import HTMLResponse

# import requests
# import json

client = MongoClient("mongodb+srv://<user>:<pw>@cluster0.xhct5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

db = client["ringfit"]
collection = db["size"]

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
    circum: int = Field(..., gte=44, lte=73)
    size: List[str]



# 데이터 전송 API
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
    return { "circumference" : 49, "size" : 6 }



""" 
get size chart by circumference
[0]: KR, [1]: US, [2]: UK, [3]: IT
"""

@app.get(
    "/api/size/{circum}", tags=["Size"], status_code=200, response_description="size chart successfully retrieved", response_model=Size
)
async def get_size_chart(circum: int = Path(..., gte=44, lte=73)):
    size_chart = collection.find_one({"circum": circum})
    return size_chart

