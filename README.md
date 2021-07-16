# Ring-Fit

## **Git convention**
### 1. process
- git life cycle 적기
- 본인의 작업이 완료되면 브랜치를 push 합니다.
### 2. branch
- **main**
: 배포 브랜치
- **develop**: 작업 브랜치

  ㄴ**feature/intro**
  
  : 첫 페이지, gif 가이드

  ㄴ**feature/image**
  
  : 사진 업로드 + 좌표값 추출 + 이미지&좌표값 전송 API

  ㄴ**feature/algorithm**
  
  : 손 detection + 둘레값 도출

  ㄴ**feature/returnSize**
  
  : 둘레값 전송 API + 결과 페이지


### 3. commit rule
> **타입(파일): 제목** 

타입과 제목으로 구성됩니다.

타입은 **대문자**로 작성합니다.

> NEW: 새로운거 추가할 때 사용합니다.

> IMPROVE: 리팩토링 등과 같은 코드를 개선/향상할 때 사용합니다.

> FIX: 버그를 고칠 때 사용합니다.

> BUG: 코드에 에러 발생할 때 사용합니다.

> DOC: README.md 또는 문서를 추가할 때 사용합니다.

```
ex) NEW: react 화면 페이지 전환 추가

ex) IMPROVE: react 화면 페이지 전환 개선/수정

ex) BUG: react 화면 페이지 전환 중 에러 발생

ex) FIX: react 화면 페이지 전환 중 버그 해결

ex) DOC: react README.md 파일 추가/수정/삭제
```
### 4. commit message
커밋 메시지는 크게 제목, 본문(body) 두 가지 파트로 구성됩니다.

본문의 경우에는 "_"으로 구분하며 개조식으로 작성합니다.

커밋 메시지는 모두 한글로 통일합니다.

명령문으로 작성합니다.

ex) `git commit -m "NEW: react 화면 페이지 전환 추가"`

`git commit -m "DOC(README.md) : 내용 수정`

```
NEW: react 화면 페이지 전환 추가 // -> 제목
(한 줄을 띄워 분리합니다.)
- body // -> 본문(생략 가능합니다.)
- body
```

