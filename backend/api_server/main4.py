'''pymongo'''
from fastapi import FastAPI, Path, HTTPException
from pymongo import MongoClient
from pydantic import BaseModel, Field
from typing import List

client = MongoClient("mongodb+srv://ringfit:<pw>@cluster0.xhct5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

db = client["ringfit"]
collection = db["size"]

app = FastAPI()

class Size(BaseModel):
    circum: int = Field(..., gte=44, lte=73)
    size: List[str]


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
