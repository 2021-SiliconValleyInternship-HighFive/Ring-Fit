## 데이터 전송 API


- x 좌표(int)
- y 좌표(int) 
- resized 이미지 파일(jpg)

<br>

**URL** : `/api/data`

**Method** : `POST`

**Content-type** : `multipart/form-data`

**Authentication** : X

**Request Body** : 

```
{
    "x" : x 좌표,
    "y" : y 좌표,
    "file" : resized 이미지 파일
}
```

**Response**:

```
"status code" : 201
"description": "Successful response"

"status code" : 422
"description": "Validation error"

```