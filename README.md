![header_image](/images/header_image.png)

이 프로젝트는 쇼핑몰 프로젝트로, Create React App(CRA)를 사용하지 않고 Webpack을 사용하여 프로젝트 환경을 직접 구성하였습니다.
상품과 사용자를 관리할 수 있는 관리자 페이지를 구현하였고, 상품 필터 기능 등을 구현하였습니다.

<br/>

<div align='center'>

🚀 **Demo** | https://msg-market.netlify.app/

</div>

<br/><br/>

# ⚙️ 기술스택

#### Frontend

[![My Skills](https://skillicons.dev/icons?i=babel,webpack,ts,react,redux,bootstrap&theme=dark)](https://skillicons.dev)

#### Backend

[![My Skills](https://skillicons.dev/icons?i=nodejs,express,mongodb&theme=dark)](https://skillicons.dev)

<br/><br/>

# 🛠️ 주요기능

### 상품 목록 조회

- 상품 목록을 조회할 수 있습니다.
- 상품을 클릭하면 상세 페이지로 이동합니다.

![상품 목록 조회](/images/product_list.gif)

<br/>

### 상품 필터 기능

- 사용자는 원하는 상품을 찾기 위해 다양한 필터와 정렬 옵션을 사용할 수 있습니다.
- 가격대를 설정하거나 이름순, 평점순으로 정렬할 수 있습니다.

![상품 필터 기능](/images/product_filter.gif)

<br/>

### 상품 상세 페이지

- 상세 페이지에서는 해당 상품의 이름, 가격, 이미지, 제조사, 브랜드 등의 기본 정보가 표시됩니다.
- 상품을 장바구니에 담거나 구매할 수 있습니다.
- 상품에 대한 리뷰를 확인할 수 있습니다.

![상품 상세 페이지](/images/product_detail.gif)

<br/>

### 장바구니 및 결제 페이지

- 장바구니에 담은 상품을 확인하고 수량 변경 및 삭제가 가능합니다.
- 결제 시, 배송지 정보가 등록 되어있지 않으면 배송지 정보를 입력하도록 유도합니다.

![장바구니 및 결제 페이지](/images/cart_purchase.gif)

<br/>

### 리뷰 등록 기능

- 구매한 상품에 대한 리뷰를 등록할 수 있습니다.

![리뷰 등록 기능](/images/review.gif)

<br/>

### 프로필 수정

- 사용자는 프로필을 수정할 수 있습니다.
- 변경 가능한 정보는 비밀번호, 이름, 주소, 전화번호입니다.
- 사용자 정보가 변경되면 쿠키를 재발급하여 변경된 정보를 적용합니다.

![프로필 수정](/images/profile.gif)

<br/>

### 관리자 상품 관리 페이지

- 관리자 로그인 후 상품을 등록, 수정, 삭제할 수 있습니다.
- 등록할 상품 이미지는 cloudinary를 사용하여 업로드하였습니다.

![관리자 상품 관리 페이지](/images/admin_product.gif)

<br/><br/>

# 📝 개발 기록

기능 구현 및 성능 개선에 대한 기록은 [Wiki](https://github.com/CH4MD0M/market-project/wiki)에서 자세히 확인하실 수 있습니다.
