'''pymongo'''
from fastapi import FastAPI
from pymongo import MongoClient

client = MongoClient("mongodb+srv://ringfit:<password>@cluster0.xhct5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
# client = MongoClient()

db = client["ringfit"]
collection = db["size"]

app = FastAPI()

size_chart = {
    "circum": 51,
    "size": ["8", "4 1/2", "I", "8"]
}

result = collection.insert_one(size_chart)
print("successfully added", result.inserted_id)