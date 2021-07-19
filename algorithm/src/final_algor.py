# -*- coding: utf-8 -*-
"""test_tflite_model

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1GU4Ky8VxZJ6nQYXy2mlR6Kia3Ty2hwxo
"""

#setting all import things
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
#경로처리라고 적힌 부분에 파일 경로 및 frontend/backend 처리해주시면 됩니다.

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

#1. 경로처리 (모델파일 경로)
tflite_path="frozen_inference_graph.tflite"

# Load the model.
interpreter = tf.lite.Interpreter(model_path=tflite_path)

# Set model input.
input_details = interpreter.get_input_details()
interpreter.allocate_tensors()

# get image size - converting from BHWC to WH
input_size = input_details[0]['shape'][2], input_details[0]['shape'][1]
print(input_size)

#2. 경로처리 (프론트에서 받은 이미지 파일 경로)
testimg_dir='coin_hand.JPG'

im = Image.open(testimg_dir)
im = im.resize((513, 513))

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

# !wget https://raw.githubusercontent.com/CSAILVision/sceneparsing/master/objectInfo150.csv

#3. 경로처리 기존의 라벨링 파일 (실행 파일과 같은 디렉토리에 위치 요망)
label_all = 'objectInfo150.csv'
ade20k_labels_info = pd.read_csv(label_all)
labels_list = list(ade20k_labels_info['Name'])
ade20k_labels_info.head()

#@title


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
  """Adds color defined by the dataset colormap to the label.

  Args:
    label: A 2D array with integer type, storing the segmentation label.

  Returns:
    result: A 2D array with floating type. The element of the array
      is the color indexed by the corresponding element in the input label
      to the PASCAL color map.

  Raises:
    ValueError: If label is not of rank 2 or its value is larger than color
      map maximum entry.
  """
  if label.ndim != 2:
    raise ValueError('Expect 2-D input label')

  colormap = create_ade20k_label_colormap()

  if np.max(label) >= len(colormap):
    raise ValueError('label value too large.')

  return colormap[label]


def vis_segmentation(image, seg_map):
  """Visualizes input image, segmentation map and overlay view."""
  plt.figure(figsize=(15, 5))
  grid_spec = gridspec.GridSpec(1, 4, width_ratios=[6, 6, 6, 1])

  # plt.subplot(grid_spec[0])
  # plt.imshow(image)
  # plt.axis('off')
  # plt.title('input image')

  # plt.subplot(grid_spec[1])
  # seg_image = label_to_color_image(seg_map).astype(np.uint8)
  # plt.imshow(seg_image)
  # plt.axis('off')
  # plt.title('segmentation map')

  # plt.subplot(grid_spec[2])
  # plt.imshow(image)
  # plt.imshow(seg_image, alpha=0.7)
  # plt.axis('off')
  # plt.title('segmentation overlay')

  unique_labels = np.unique(seg_map)
  #필요한 모델 output
  x=np.array(seg_map)

  #np.save('save_map', x) # x_save.npy
  # np.savetxt("new_save.txt", x, fmt='%d', delimiter=',')
  # print("new detection end")

 
  


  # # print(unique_labels)
  # ax = plt.subplot(grid_spec[3])
  # plt.imshow(
  #     FULL_COLOR_MAP[unique_labels].astype(np.uint8), interpolation='nearest')
  # ax.yaxis.tick_right()
  # plt.yticks(range(len(unique_labels)), LABEL_NAMES[unique_labels])
  # plt.xticks([], [])
  # ax.tick_params(width=0.0)
  # plt.grid('off')
  # plt.show()
  return x


LABEL_NAMES = np.asarray(labels_list)

FULL_LABEL_MAP = np.arange(len(LABEL_NAMES)).reshape(len(LABEL_NAMES), 1)
FULL_COLOR_MAP = label_to_color_image(FULL_LABEL_MAP)
 



#vis_segmentation(im, seg_map)

hand_arr=vis_segmentation(im, seg_map)


#딥러닝 모델 결과 513*513 배열 x로부터 / tl(left)/ tr(right) 검출하는 알고리즘 코드
#front로부터 받은 index위치 값을 중심으로 행값을 줄이고,늘리며 index의 값이 0이 되기전 index위치값 두점을 받아온다.

#예시 행렬
# ex_arr=np.zeros((10, 10))

# ex_arr[5][3]=1
# ex_arr[5][4]=1
# ex_arr[5][5]=1
# ex_arr[5][6]=1
# ex_arr[5][7]=1

#4. 경로처리 : frontend에서 받은 위치 값 (x, y 값 경로)
#행렬이 0에서 시작하므로 이것 주의하기!!!
front_x=229 #행렬의 행(가로)
front_y=232 #행렬의 열(세로)



len_max=513 #손가락 최대 넓이 지정

# front_x=5 #행렬의 행(가로)
# front_y=5#행렬의 열(세로)
# len_max=5
left_arr=[0,0]
right_arr=[0,0]


#left_arr,right_arr(왼/오 양방향으로 손 검출이 끝나는 부분을 구하는 코드)

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

print("new 손가락 양 끝값")
print(left_arr)
print(right_arr)
print("손가락 길이 측정 결과")
print(right_arr[1]-left_arr[1]+1)

# 이미지 배열을 보여주는 함수(중간 결과)
# def show_images(images):
# 	for i, img in enumerate(images):
# 		cv2.imshow("image_" + str(i), img)
# 	cv2.waitKey(0)
# 	cv2.destroyAllWindows()




img_path = testimg_dir

# 이미지 읽기 및 전처리
img = cv2.imread(img_path)
image=cv2.resize(img,dsize=(513,513))

gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
blur = cv2.GaussianBlur(gray, (9, 9), 0)

edged = cv2.Canny(blur, 50, 100)
edged = cv2.dilate(edged, None, iterations=1)
edged = cv2.erode(edged, None, iterations=1)

#show_images([blur, edged])

# 등고선 찾기
cnts = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
cnts = imutils.grab_contours(cnts)

# 가장 왼쪽의 윤곽선이 참조 객체이므로 윤곽선을 왼쪽에서 오른쪽으로 정렬합니다.
(cnts, _) = contours.sort_contours(cnts)

# 충분히 크지 않은 윤곽선 제거
cnts = [x for x in cnts if cv2.contourArea(x) > 100]

#cv2.drawContours(image, cnts, -1, (0,255,0), 3)

# 참조 객체 치수
# 2.2 x 2.2 (cm) 100원 동전 사용.
ref_object = cnts[0]
box = cv2.minAreaRect(ref_object)
box = cv2.boxPoints(box)
box = np.array(box, dtype="int")
box = perspective.order_points(box)
(tl, tr, br, bl) = box
dist_in_pixel = euclidean(tl, tr)
dist_in_mm = 22
pixel_per_mm = dist_in_pixel/dist_in_mm


# tl=left_arr
# tr=right_arr
# 나머지 윤곽 그리기

wid = euclidean(left_arr, right_arr)/pixel_per_mm
# ht = euclidean(tr, br)/pixel_per_mm
# cv2.putText(image, "{:.1f}mm".format(wid), (int(mid_pt_horizontal[0] - 15), int(mid_pt_horizontal[1] - 10)), 
# 	cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 0), 2)
# cv2.putText(image, "{:.1f}mm".format(ht), (int(mid_pt_verticle[0] + 10), int(mid_pt_verticle[1])), 
# 	cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 0), 2)

# show_images([image])

r_wid=float(wid*10)
print(r_wid)

# 손가락 둘레 측정하기
finger_round=int(r_wid*3.14)

# 반지 호수
a=[]

for size in range(44,74):
    a.append(size)

ring_size=a.index(finger_round)+1


#5. 경로처리: backend로 전송할 두 값 ring_size/finger_round
print("ring size")
print(ring_size)
print("finger round")
print(finger_round)

