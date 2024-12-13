# 📚 Books

온라인 서점을 위한 웹 어플리케이션으로 사용자는 책을 검색할 수 있고, 정보 조회 및 수정, 삭제가 가능합니다.

## 배포 주소



## 프로젝트 실행 방법

1. 로컬 실행:
```
$ git clone https://github.com/ParkSohyunee/web-front-end-assignment.git

$ npm install
```

2. Server:
```
$ npm run start-json-server

# http://localhost:3001 접속
```

3. Frontend:
```
$ npm run dev

# http://localhost:3000 접속
```

<br>

## 아키텍쳐
- **Next.js (v.14.2.20)**
  - Route Handler를 사용하여 API 구현 및 fetch, RSC를 사용하기 위해 app routing을 선택하였습니다.
  - Node.js 버전 v.18.17 이상이 요구됩니다.
- **React (v.18)**
- **TypeScript (v.5)**
- **react-hook-form**
  - 효율적인 form 로직 관리 및 유효성 검사를위해 선택하였습니다.
- **json-server (v0.17.4)**
  - 만든 책 목록 JSON 목업데이터 활용 및 API 통신을 확인하기 위해 DB역할을 하는 json-server를 설치했습니다.
  - JSON Server는 개발 단계에서 프로토타이핑이나 Mocking API를 신속하게 생성하기 위한 도구입니다.
- **eslint, prettier**
- **CSS-module (스타일링)**
- **Vercel (배포)**

<br>

## 구현 기능

### 1. 책 목록 페이지 구현
- [x] 책 목록 조회 API 구현 및 연동 (GET, /api/books)
- [x] 페이지네이션 기능 (offset, limit 기반 페이징 처리)
- [x] 책 제목, 저자명으로 검색할 수 있는 검색바 기능 구현
- 참고 - [📌 책 목록 페이지 UI 및 기능 구현(페이지네이션, 검색바) PR](https://github.com/ParkSohyunee/web-front-end-assignment/pull/1)

### 2. 책 추가 기능

- [x] 책 추가 API 구현 및 연동 (POST, /api/books)
- [x] 제목, 저자, 소개, 가격, 수량을 입력해서 책을 추가하는 기능 구현
- [x] form 로직 및 유효성 검사를 위해 react-hook-from 활용, 각 인풋 유효성 검사 적용
- 참고 - [📌 책 추가 페이지 UI 및 기능 구현](https://github.com/ParkSohyunee/web-front-end-assignment/pull/2)

### 3. 책 상세 정보 페이지 구현

- [x] 책 상세 정보 조회 API 구현 및 연동 (GET, /api/books/:id)
- [x] fetch + RSC 사용하여 서버에서 데이터 조회 및 데이터 캐싱되도록 적용
- 참고 - [📌 책 상세 정보 페이지 UI 및 책 삭제, 수량 수정 기능 구현](https://github.com/ParkSohyunee/web-front-end-assignment/pull/3)

### 4. 책 삭제 기능

- [x] 책 삭제 API 구현 및 연동 (DELETE, /api/books/:id)
  
### 5. 책 수량 수정 기능

- [x] 책 수량 수정 API 구현 및 연동 (PUT, /api/books/:id
- [x] react-hook-form을 사용하여 form 관리 및 유효성 검사, 초기 값 설정은 서버에서 받아오도록 적용
- [x] 수정 후 책 상세 정보 API 조회하여 수정된 정보가 UI로 보여지도록 적용(화면 업데이트)
- [x] 수정/취소 버튼 useCallback 사용하여 메모이제이션

<br>

## 스크린샷

### 책 목록 (페이지네이션, 검색바)

![books](https://github.com/user-attachments/assets/c540607d-897e-4711-94c6-5ffe2eb5a7e1)

### 책 추가

![add](https://github.com/user-attachments/assets/c2c781a3-f767-4b89-aa03-206ac232511f)

### 책 상세, 수량 수정, 삭제

![detail](https://github.com/user-attachments/assets/61cf60f0-e21a-4692-a970-de12ff0f93fc)
