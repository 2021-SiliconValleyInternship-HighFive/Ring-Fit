## 측정 API


- x 좌표(int)
- y 좌표(int) 
- resized 이미지 파일(jpg)

<br>

**URL** : `/api/data`

**Method** : `POST`

**Content-type** : `multipart/form-data`

**Request Body** : 

```
{
    "x_client" : x 좌표,
    "y_client" : y 좌표,
    "image_client" : resized 이미지 파일
}
```

**Response Body**:

```
{
    "circumference" : 손가락 둘레,
    "size" : 반지 호수
}
```