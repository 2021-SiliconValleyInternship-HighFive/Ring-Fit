## 결괏값 반환 API

### | Parameters

- 손가락 둘레(int)
- 반지 호수(int)  

<br>

**URL** : `/api/result`

**Method** : `POST`

**Content-type** : `application/json`

**Request Body** : 

```
{
    "perimeter" : 손가락 둘레,
    "size" : 반지 호수
}
```

**Response**:

```
Status Code : 201
Description: Successful response

Status Code : 422
Description: Validation error

```