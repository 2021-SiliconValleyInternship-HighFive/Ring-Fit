# 좌표 + 이미지 파일 API

**URL** : `/api/data`

**Method** : `POST`

**Content-type** : `multipart/form-data`

**Request Body** : 

```
{
    "x" : x좌표,
    "y" : y좌표,
    "file" : 이미지 파일(jpg)
}
```