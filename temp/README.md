Ubuntu 20.04 서버에 사용 가능한 latest package로 기본 시스템을 update
```bash
apt -y update
```
React App은 JavaScript 라이브러리이므로 Node.js가 서버에 설치되어 있어야 합니다. 기본적으로 최신 버전의 Node.js는 Ubuntu 표준 리포지토리에서 사용할 수 없으므로 NodeSource에서 설치
```bash
apt install -y curl gnupg2
```
Node.js repository를 추가합니다.
```bash
apt install -y nodejs
```
NPM을 latest version으로 update 합니다.
```bash
npm install npm@latest -g
```
Nodejs의 버전을 확인합니다.
```bash
node -v
```
작성 기준 아래와 같이 버전 확인이 가능합니다.
```bash
v14.17.2
```
React에서 새 프로젝트를 생성하려면 create-react-app 도구를 설치해야 합니다.
```bash
npm install -g create-react-app
```
create-react-app을 통해서 새로운 프로젝트를 생성합니다.
```bash
create-react-app new_project
```

Dockerfile을 이용하여 react 개발환경 이미지 생성

current directory에서 default로 Dockerfile을 먼저 찾습니다.
```bash
docker build -t react:dev .
```
위에서 생성한 이미지로 컨테이너를 생성합니다.
```
docker run -it --rm --name react -p 3000:3000 -v current directory path:/react react:dev
```

create-react-app을 통해서 react 개발환경을 생성합니다.
```bash
create-react-app front_end template cra-template-pwa
```
---