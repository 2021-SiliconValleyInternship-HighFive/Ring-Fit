## 데이터 전송 API

### | Parameters

- x좌표(int)
- y좌표(int) 
- resized 이미지 파일(jpg)

<br>

**URL** : `/api/data`

**Method** : `POST`

**Content-type** : `multipart/form-data`

**Request Body** : 

```
{
    "x" : x좌표,
    "y" : y좌표,
    "file" : resized 이미지 파일
}
```

**Response**:

```
Status Code : 201
Description: Successful response

Status Code : 422
Description: Validation error

```