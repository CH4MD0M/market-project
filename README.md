<div align="center" >

# 모시깽 마켓

</div>
서비스의 A to Z 를 경험하고 싶어, 프론트 부터 백엔드까지 구현한 쇼핑몰 프로젝트입니다. 빌드 시간 최적화, 모듈 번들러의 학습 경험을 위해 create-react-app을 사용하지 않고 webpack으로 react, typescript 환경을 구성하였습니다.

<br/><br/>

## 배포 주소

> https://msg-market.netlify.app/

<br/>

## 실행 방법
backend, frontend 디렉토리에서 각각 `yarn install` 명령어를 실행합니다.
```shell
$ cd backend
$ yarn install

$ cd frontend
$ yarn install
```

backend 디렉토리에서 `yarn dev` 명령어를 실행합니다.
```shell
$ cd backend
$ yarn dev
```

<br/>

## 기술스택

### frontend

[![My Skills](https://skillicons.dev/icons?i=babel,webpack,ts,react,redux,bootstrap&theme=dark)](https://skillicons.dev)

### backend

[![My Skills](https://skillicons.dev/icons?i=nodejs,express,mongodb&theme=dark)](https://skillicons.dev)

<br/><br/>

## 실행화면

### 상품 목록 조회

![상품 목록 조회](/images/product_list.gif)

<br/>

### 상품 필터 기능

![상품 필터 기능](/images/product_filter.gif)

<br/>

### 상품 상세 페이지

![상품 상세 페이지](/images/product_detail.gif)

<br/>

### 장바구니 및 결제 페이지

![장바구니 및 결제 페이지](/images/cart_perchase.gif)

<br/>

### 리뷰 등록 기능

![리뷰 등록 기능](/images/review.gif)

<br/>

### 프로필 수정

![프로필 수정](/images/profile.gif)

<br/>

### 관리자 상품 관리 페이지

![관리자 상품 관리 페이지](/images/admin_product.gif)

<br/><br/>

## 프로젝트 기록

### useSelector의 잘못된 사용

### code splitting

<br/><br/>

## TODO
* [ ] socket 채팅 기능 구현
* [ ] 검색 기능 elastic search 적용
* [ ] react query or rtk query 적용해서 api 데이터 캐싱
* [ ] Docker로 개발환경 구성하기
* [ ] 테스트 코드 작성하기
* [ ] CI/CD 구축하기
