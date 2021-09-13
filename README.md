## 마켓 UI 제작(React Native)

> **구현 사항**

- 필수 기능
  - [x] **리스트**: 소미마켓 상품 리스트를 보여줄 수 있어야 합니다
  - [ ] **검색**: 소미마켓 상품 리스트 내에서 검색을 할 수 있어야 합니다. (단, 정렬 순서는 가장 검색 결과와 비슷한 상품 순서대로 노출합니다.)
  - [x] **상세**: 소미마켓 상품을 클릭할 시, 상품 상세 페이지로 이동할 수 있어야 합니다
  - [x] **장바구니**: 사용자가 원하는 상품을 장바구니에 추가할 수 있어야 합니다
  - [x] **구매하기**: 장바구니에 있는 상품과 총 금액을 확인하고, 구매할 수 있는 UI를 제공해야 합니다
  - [x] **문서작성**: 과제에 대한 설명이 작성되어 있는 문서를 소스에 같이 포함시켜주세요!
- Challenge
  - [ ] 상품을 카테고리별로 볼 수 있는 화면을 제공합니다
  - [x] 상품을 다양한 방법으로 정렬할 수 있는 기능을 제공합니다
  - [ ] 상품을 다른 사람들과 공유할 수 있는 기능을 제공합니다
  - [x] 추가 기능



#### 실행 방법

> react-native , android studio 사용.

1. node modules 설치

   ```
   yarn install
   ```

2. 실행

   ``` 
   yarn run android
   ```



#### 개발 환경

```
    "@react-native-async-storage/async-storage": "^1.15.7",
    "@react-navigation/native": "^6.0.2",
    "@react-navigation/stack": "^6.0.7",
    "axios": "^0.21.4",
    "css-loader": "^6.2.0",
    "file-loader": "^6.2.0",
    "react": "17.0.2",
    "react-dom": "^17.0.2",
    "react-native": "0.65.1",
    "react-native-gesture-handler": "^1.10.3",
    "react-native-render-html": "^6.1.0",
    "react-native-safe-area-context": "^3.3.2",
    "react-native-screens": "^3.7.0",
    "react-native-vector-icons": "^8.1.0",
    "react-redux": "^7.2.5",
    "redux": "^4.1.1",
    "redux-devtools-extension": "^2.13.9",
    "redux-persist": "^6.0.0",
    "redux-thunk": "^2.3.0",
```



#### 파일 구조

<img src="C:\Users\hanta\AppData\Roaming\Typora\typora-user-images\image-20210913081724415.png" alt="image-20210913081724415" style="zoom: 67%;" />

- components : 기본 컴포넌트 폴더 ( Button.js, ProductCard.js, Carousel.js ...)
- pages : 각 화면들이 있는 폴더(ProductList, ProductDetail, Cart)

- api: api 요청 파일 index.js, api.js
- hooks : redux 데이터 불러오는 hook 파일 저장
- store : redux 관련 폴더

#### 상세 구현 사항

> 기본적인 디자인은 현재 운영되고 있는 소미마켓을 참고하여 구현하였습니다.

##### 1. 데이터 관리

- 여러 컴포넌트에서 공유하는 데이터의 경우 Redux를 활용하여 저장 및 조회를 하였습니다.
- 한 컴포넌트에서만 사용하는 경우, `useState`를 활용해서 값을 관리했습니다.



##### 2. ProductList

> 해당 화면에서는 상품 리스트들이 보여야하며, 각 상품 클릭 시 Detail페이지로 이동해야합니다.
>
> **무한스크롤** 및 **정렬 기능**을 구현하였습니다.

- 무한스크롤

  - react native의 `FlatList`를 활용해 해당 화면 마지막의 0.3만큼 스크롤이 이동했을 때 다음 페이지 값을 api로 요청하도록 구현하였습니다
  - 추가로 요청될 때마다 `FlatList`의 하위 요소인 제품(`ProductCard`)의 데이터 값이 계속 생성되어지는 문제가 발생했는데 이 문제의 경우 `useCallback`으로 해결할 수 있었습니다.

- 정렬

  - 정렬의 경우 `낮은 가격 순` , `높은 가격 순`, `최신 순` 으로 각각에 맞게 api요청을 보내 정렬을 구현했습니다 

- Detail 페이지 이동

  - Redux에 `selected` 값을 설정해 현재 선택된 상품의 `Prefix` 값을 저장하였습니다.
  - Detail페이지로 이동 후 저장 된 `Prefix` 값을 통해 api 요청으로 구현하였습니다.

  



##### 3. ProductDetail

> 사용자가 선택한 상품에 대한 이미지와 가격, 분할 결제 정보, 상세 정보가 보여져야 합니다.
>
> **react-native-render-html** 사용해 상세 정보, 이미지 Carousel을 구현하였습니다.

- Carousel
  - `FlatList`를 활용해 Carousel을 구현하였으며 하단에 pagenation을 구현하여 사진의 개수 및 현재 사진이 몇 번째 사진인지 표시하였습니다.

- 상품 정보
  - api로 받아 오는 data에 대해 사용자에게 각 항목별로 보여질 수 있도록 표시하였습니다.
  - 가격의 경우 정규표현식으로 천의 단위로 `,`를 표기하였으며, 할인율 계산, 분할 결제 및 배송비 정보도 보여주었습니다.
- 상세 정보
  - api 응답 데이터 중 `description`의 경우 html태그 정보로 구성되어 있었습니다. 이를 그대로 앱에서 render해주기 위해 `react-native-render-html`라이브러리를 사용하였습니다.
- 주문하기
  - 주문하기 버튼을 클릭하면 장바구니로 이동 및 장바구니에 해당 제품을 추가하도록 구현하였습니다.
  - 같은 제품을 2번 주문 한 경우, 장바구니에 담겨 있는 기존 제품의 수량이 변경되도록 구현하였습니다.
  - 장바구니의 경우 `Rdux`를 사용하여 장바구니에 담긴 상품 정보를 관리하였습니다.



##### 4. Cart

> 장바구니에 담긴 제품과 수량 그리고 가격과 총 가격을 사용자가 확인할 수 있어야 합니다.
>
> 장바구니 **제품 정보 표시**, **총 수량**, 주문했을 때 **장바구니 비우기 기능**을 구현하였습니다

- 장바구니

  - 각 추가 된 제품의 `thumbnail`, `제품명`, `수량` ,`가격`을 표기해주었으며 총 합산 가격도 표기해주었습니다.

- 주문하기

  - 주어진 api의 경우 `prefix`가 `Path Parameters`로 전달되어 한 번에 하나의 제품만 요청을 보낼 수 있었습니다. 제품의 수량 정보 등 다른 정보는 보낼 수 없을 것 같아 사용자가 주문하기 버튼을 눌렀을 때 장바구니에 담긴 모든 `prefix`에 대하여 요청을 보냈습니다.
  - 주문이 성공적으로 완료가 되면 `Redux`의 카트 정보를 초기화 시키고 성공적으로 주문이 되었다는 `modal`을 띄워 사용자에게 알려주었습니다.
  - 주문이 다 완료 되면 `ProductList`화면으로 이동하도록 하였습니다.

  

#### 아쉬운 점

1.  검색 기능 미구현

   해당 기능에 대해서는 검색 api가 있어서 서버에 요청하거나 혹은 전체 상품 리스트가 필요하다고 생각했습니다. 그러나 주어진 api안에서는 각 page 별로 요청을 보내고 (전체 리스트를 얻으려면 총 8 번) 그 데이터 안에서 구현을 하는 방안으로 계획을 했었는데 구현하지 못했습니다.

   

2.  카테고리 별 분류 미구현

   카테고리 별 분류의 경우 정렬과 동일한 로직으로 구현을 하면 돼서 어렵지 않았지만, 시간이 부족해 다 구현하지 못하였습니다.

   

3.  반응형 앱 관련

   현재 기기별 화면은 `Dimensions` 를 통해 화면  width와 height를 구해 사용을 했었는데 이 부분을 리팩터링하지 못한 점이 아쉽습니다. 또한 명확한 스타일 가이드를 설정하지 않고 개발을 시작해, padding, margin 등에 대한 통일성을 주지 못한 점이 아쉽습니다. 시간이 충분했더라면, 해당 부분을 조금 더 보완하고 싶습니다.



4. 웹 관련

   앱과 동시에 web에서도 화면을 볼 수 있도록 설정을 하고 개발을 시작했으나, script오류로 인하여 현재 웹에서 확인할 수 없었습니다. 이 부분도 오류를 해결하여 웹에서도 확인할 수 있는 프로젝트가 되었다면 더 좋았을 것 같습니다.





#### 구현 화면(사진)

- **ProductList**

<img src="C:\Users\hanta\Desktop\DHC\Desktop\Screenshot_1631453980.png" alt="Screenshot_1631453980" style="zoom:25%;" />

<img src="C:\Users\hanta\Desktop\DHC\Desktop\Screenshot_1631453986.png" alt="Screenshot_1631453986" style="zoom:25%;" />

<img src="C:\Users\hanta\Desktop\DHC\Desktop\Screenshot_1631453983.png" alt="Screenshot_1631453983" style="zoom:25%;" />

- **ProductDetail**

<img src="C:\Users\hanta\Desktop\DHC\Desktop\Screenshot_1631445355.png" alt="Screenshot_1631445355" style="zoom:25%;" />

<img src="C:\Users\hanta\Desktop\DHC\Desktop\Screenshot_1631445360.png" alt="Screenshot_1631445360" style="zoom:25%;" />

- **Cart**

<img src="C:\Users\hanta\Desktop\DHC\Desktop\Screenshot_1631445389.png" alt="Screenshot_1631445389" style="zoom:25%;" />

<img src="C:\Users\hanta\Desktop\DHC\Desktop\Screenshot_1631445393.png" alt="Screenshot_1631445393" style="zoom:25%;" />

