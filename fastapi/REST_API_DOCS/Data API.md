## 데이터 전송 API

### | 요청값


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