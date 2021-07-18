## 결괏값 반환 API


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
"status code" : "201"
"description": "Successful response"

"status code" : "422"
"description": "Validation error"

```