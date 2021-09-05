from fastapi import FastAPI, File, UploadFile, Form, Path, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pydantic import BaseModel, Field
from typing import List

import pandas as pd
import os
import numpy as np
import tempfile
from PIL import Image
import cv2
import tensorflow as tf
from matplotlib import gridspec
from matplotlib import pyplot as plt
from scipy.spatial.distance import euclidean
from imutils import perspective
from imutils import contours
import imutils

# from fastapi.testclient import TestClient
# from fastapi.responses import HTMLResponse

# import requests
# import json
# import os
import shutil

client = MongoClient("mongodb+srv://ringfit:<pw>@cluster0.xhct5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

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




@app.post("/api/users", status_code=201, tags=["User"], response_description="user data successfully created")
async def create_user_data(
    x_client: int = Form(...),
    y_client: int = Form(...),
    image_client: UploadFile = File(...)
):  
    
    image_path = os.getcwd() + '\\static\\' + image_client.filename
    with open(image_path, 'wb') as buffer:
        shutil.copyfileobj(image_client.file, buffer)
    
    if os.path.isfile(image_path):
        image_dir = image_client.filename


    os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

    # 모델 파일 경로
    tflite_path="frozen_inference_graph.tflite"

    # Load the model.
    interpreter = tf.lite.Interpreter(model_path=tflite_path)

    # Set model input.
    input_details = interpreter.get_input_details()
    interpreter.allocate_tensors()

    # get image size - converting from BHWC to WH
    input_size = input_details[0]['shape'][2], input_details[0]['shape'][1]
    # print(input_size)

    # 받은 이미지 경로
    # testimg_dir='coin_hand.JPG'
    # testimg_dir=image_input
    testimg_dir=image_path
    
    im = Image.open(testimg_dir)
    # im = im.resize((513, 513))

    # Resize the cropped image to the desired model size
    resized_image = im.convert('RGB')

    # Convert to a NumPy array, add a batch dimension, and normalize the image.
    image_for_prediction = np.asarray(resized_image).astype(np.float32)
    image_for_prediction = np.expand_dims(image_for_prediction, 0)
    image_for_prediction = image_for_prediction / 127.5 - 1


    # Load the model.
    interpreter = tf.lite.Interpreter(model_path=tflite_path)

    # Invoke the interpreter to run inference.
    interpreter.allocate_tensors()
    interpreter.set_tensor(input_details[0]['index'], image_for_prediction)
    interpreter.invoke()

    # Retrieve the raw output map.
    raw_prediction = interpreter.tensor(
        interpreter.get_output_details()[0]['index'])()
    
    # Post-processing: convert raw output to segmentation output
    ## Method 1: argmax before resize - this is used in some frozen graph
    # seg_map = np.squeeze(np.argmax(raw_prediction, axis=3)).astype(np.int8)
    # seg_map = np.asarray(Image.fromarray(seg_map).resize(image.size, resample=Image.NEAREST))
    ## Method 2: resize then argmax - this is used in some other frozen graph and produce smoother output
    width, height = im.size
    seg_map = tf.argmax(tf.image.resize(raw_prediction, (height, width)), axis=3)
    seg_map = tf.squeeze(seg_map).numpy().astype(np.int8)

    # 기존의 라벨링 파일 (실행 파일과 같은 디렉토리)
    label_all = 'objectInfo150.csv'
    ade20k_labels_info = pd.read_csv(label_all)
    labels_list = list(ade20k_labels_info['Name'])
    ade20k_labels_info.head()

    def create_ade20k_label_colormap():
      """Creates a label colormap used in ADE20K segmentation benchmark.
      Returns:
      A colormap for visualizing segmentation results.
      """
      return np.asarray([
          [0, 0, 0],
          [120, 120, 120],
          [180, 120, 120],
          [6, 230, 230],
          [80, 50, 50],
          [4, 200, 3],
          [120, 120, 80],
          [140, 140, 140],
          [204, 5, 255],
          [230, 230, 230],
          [4, 250, 7],
          [224, 5, 255],
          [235, 255, 7],
          [150, 5, 61],
          [120, 120, 70],
          [8, 255, 51],
          [255, 6, 82],
          [143, 255, 140],
          [204, 255, 4],
          [255, 51, 7],
          [204, 70, 3],
          [0, 102, 200],
          [61, 230, 250],
          [255, 6, 51],
          [11, 102, 255],
          [255, 7, 71],
          [255, 9, 224],
          [9, 7, 230],
          [220, 220, 220],
          [255, 9, 92],
          [112, 9, 255],
          [8, 255, 214],
          [7, 255, 224],
          [255, 184, 6],
          [10, 255, 71],
          [255, 41, 10],
          [7, 255, 255],
          [224, 255, 8],
          [102, 8, 255],
          [255, 61, 6],
          [255, 194, 7],
          [255, 122, 8],
          [0, 255, 20],
          [255, 8, 41],
          [255, 5, 153],
          [6, 51, 255],
          [235, 12, 255],
          [160, 150, 20],
          [0, 163, 255],
          [140, 140, 140],
          [250, 10, 15],
          [20, 255, 0],
          [31, 255, 0],
          [255, 31, 0],
          [255, 224, 0],
          [153, 255, 0],
          [0, 0, 255],
          [255, 71, 0],
          [0, 235, 255],
          [0, 173, 255],
          [31, 0, 255],
          [11, 200, 200],
          [255, 82, 0],
          [0, 255, 245],
          [0, 61, 255],
          [0, 255, 112],
          [0, 255, 133],
          [255, 0, 0],
          [255, 163, 0],
          [255, 102, 0],
          [194, 255, 0],
          [0, 143, 255],
          [51, 255, 0],
          [0, 82, 255],
          [0, 255, 41],
          [0, 255, 173],
          [10, 0, 255],
          [173, 255, 0],
          [0, 255, 153],
          [255, 92, 0],
          [255, 0, 255],
          [255, 0, 245],
          [255, 0, 102],
          [255, 173, 0],
          [255, 0, 20],
          [255, 184, 184],
          [0, 31, 255],
          [0, 255, 61],
          [0, 71, 255],
          [255, 0, 204],
          [0, 255, 194],
          [0, 255, 82],
          [0, 10, 255],
          [0, 112, 255],
          [51, 0, 255],
          [0, 194, 255],
          [0, 122, 255],
          [0, 255, 163],
          [255, 153, 0],
          [0, 255, 10],
          [255, 112, 0],
          [143, 255, 0],
          [82, 0, 255],
          [163, 255, 0],
          [255, 235, 0],
          [8, 184, 170],
          [133, 0, 255],
          [0, 255, 92],
          [184, 0, 255],
          [255, 0, 31],
          [0, 184, 255],
          [0, 214, 255],
          [255, 0, 112],
          [92, 255, 0],
          [0, 224, 255],
          [112, 224, 255],
          [70, 184, 160],
          [163, 0, 255],
          [153, 0, 255],
          [71, 255, 0],
          [255, 0, 163],
          [255, 204, 0],
          [255, 0, 143],
          [0, 255, 235],
          [133, 255, 0],
          [255, 0, 235],
          [245, 0, 255],
          [255, 0, 122],
          [255, 245, 0],
          [10, 190, 212],
          [214, 255, 0],
          [0, 204, 255],
          [20, 0, 255],
          [255, 255, 0],
          [0, 153, 255],
          [0, 41, 255],
          [0, 255, 204],
          [41, 0, 255],
          [41, 255, 0],
          [173, 0, 255],
          [0, 245, 255],
          [71, 0, 255],
          [122, 0, 255],
          [0, 255, 184],
          [0, 92, 255],
          [184, 255, 0],
          [0, 133, 255],
          [255, 214, 0],
          [25, 194, 194],
          [102, 255, 0],
          [92, 0, 255],
      ])

    def label_to_color_image(label):
        if label.ndim != 2:
            raise ValueError('Expect 2-D input label')
        
        colormap = create_ade20k_label_colormap()

        if np.max(label) >= len(colormap):
            raise ValueError('label value too large.')
            
        return colormap[label]


    def vis_segmentation(image, seg_map):
        plt.figure(figsize=(15, 5))
        grid_spec = gridspec.GridSpec(1, 4, width_ratios=[6, 6, 6, 1])

        unique_labels = np.unique(seg_map)

        #필요한 모델 output
        x=np.array(seg_map)

        np.save('save_map', x) # x_save.npy
        np.savetxt("leeje_save.txt", x, fmt='%d', delimiter=',')

        return x

    LABEL_NAMES = np.asarray(labels_list)

    FULL_LABEL_MAP = np.arange(len(LABEL_NAMES)).reshape(len(LABEL_NAMES), 1)
    FULL_COLOR_MAP = label_to_color_image(FULL_LABEL_MAP)

    hand_arr=vis_segmentation(im, seg_map)

    # xy 좌표
    front_x=y_client #행렬의 행(가로)
    front_y=x_client #행렬의 열(세로)

    len_max=513 #손가락 최대 넓이 지정

    left_arr=[0,0]
    right_arr=[0,0]

    for i in range(0,front_y):
        if hand_arr[front_x][front_y-i]==0:
            left_arr[0]=front_x
            left_arr[1]=front_y-i+1
            break

    for j in range(front_y,len_max):
        if hand_arr[front_x][j]==0:
            right_arr[0]=front_x
            right_arr[1]=j-1
            break

    print("이미지 내의 new 손가락 양 끝값: ")
    print(left_arr, right_arr)
    # print(right_arr)
    print("이미지 내의 손가락 길이 측정 결과: ")
    print(right_arr[1]-left_arr[1]+1)


    '''
    cv2 이미지
    '''
    img_path = testimg_dir

    # 이미지 읽기 및 전처리
    img = cv2.imread(img_path)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (9, 9), 0)

    edged = cv2.Canny(blur, 50, 100)
    edged = cv2.dilate(edged, None, iterations=1)
    edged = cv2.erode(edged, None, iterations=1)


    # 등고선 찾기
    cnts = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)

    # 가장 왼쪽의 윤곽선이 참조 객체이므로 윤곽선을 왼쪽에서 오른쪽으로 정렬
    (cnts, _) = contours.sort_contours(cnts)

    # 충분히 크지 않은 윤곽선 제거
    cnts = [x for x in cnts if cv2.contourArea(x) > 100]


    # 참조 객체 치수
    # 2.2 x 2.2 (cm) 100원 동전 사용
    ref_object = cnts[0]
    box = cv2.minAreaRect(ref_object)
    box = cv2.boxPoints(box)
    box = np.array(box, dtype="int")
    box = perspective.order_points(box)
    (tl, tr, br, bl) = box
    dist_in_pixel = euclidean(tl, tr) #tl, tr
    dist_in_mm = 24

    # print(dist_in_pixel)
    pixel_per_mm = dist_in_pixel/dist_in_mm
    # print(pixel_per_mm)

    # 나머지 윤곽 그리기
    wid = euclidean( right_arr,left_arr)/pixel_per_mm
    # print("실제 길이:", wid)
    # wid == r_wid

    r_wid=float(wid)
    print("(float)실제 길이:", r_wid)

    # 손가락 둘레 측정
    finger_round=int(r_wid*3.14*1.25)

    ### not in list error_ test
    print("손가락 둘레:", finger_round)

    a=[]

    for size in range(38,74):
        a.append(size)

    ring_size=a.index(finger_round)+1

    print("ring size:", ring_size)
    print("circum:", finger_round)

    return {
        "circumference" : finger_round,
        "size" : ring_size
    }






""" 
get internationl ring size by circumference
[0]: KR, [1]: US, [2]: UK, [3]: IT
"""

@app.get(
    "/api/size/{circum}", tags=["Size"], status_code=200, response_description="size chart successfully retrieved", response_model=Size
)
async def get_size_chart(circum: int = Path(..., gte=44, lte=73)):
    size_chart = collection.find_one({"circum": circum})
    return size_chart

