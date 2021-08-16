## 국가별 반지규격 API

- 둘레(int)
- 국가별 반지 규격(str): Array ([0]: KR, [1]: US, [2]: UK, [3]: IT)

<br>

**URL** : `/api/size/{circum}`

**Method** : `GET`

**Path parameter** : `circum (type: int)` 

**Content-type** : `application/json`

**Response body**:

```
{
  "circum": 0,
  "size": [
    "string"
  ]
}


e.g., 둘레 56mm
{
  "circum": 56,
  "size": [
    "13",
    "6 1/2",
    "M 1/2",
    "13.25"
  ]
}

```