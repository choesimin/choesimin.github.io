---
layout: skill
title: Danfo.js - JavaScript의 Pandas
date: 2023-08-09
---


## Danfo.js : JavaScript에서 Pandas Library 사용하기

- Danfo.js는 Open-source JavaScript Library로, 자료(data)를 조작하고 분석하는 작업을 간편하게 수행할 수 있게 해줍니다.

- Danfo.js는 Python의 대표적인 data 분석 및 조작 library인 Pandas를 본따 만들어졌습니다.
    - 따라서 Danfo.js의 API와 Pandas의 API는 유사합니다.
    - Pandas를 사용해본 적이 있다면, Danfo.js도 쉽게 익힐 수 있습니다.

- Danfo.js는 TensorFlow.js(JavaScript machine learning library)를 지원합니다.
    - 예를 들어, Danfo.js의 자료형(`DataFrame`)을 TensorFlow.js의 자료형(`Tensor`)으로, 또는 그 반대로 간단하게 변환할 수 있습니다.


---


## Danfo.js의 기능


### Data CRUD 기능

- data를 간단하게 생성(Create), 조회(Read), 수정(Update), 삭제(Delete)할 수 있습니다.
- 2차원 data(`DataFrame`)인 경우, data 뿐만 아니라 column과 row에 대한 삽입(insert), 삭제(delete)를 지원합니다.


### Data 검색 기능

- 검색(querying) 기능을 사용할 수 있습니다.
- 또한 대규모 dataset에 대한 검색에 필요한 기능(label-based slicing, fancy indexing)을 지원합니다.


### Data 집계 기능

- Group 연산(split-apply-combine)을 지원합니다.
    - split-apply-combine : 쪼개고-적용하고-합치기.
- GroupBy 기능을 사용하여 집계한 통계 자료로 data를 직관적으로 분석할 수 있습니다.


### Data 변환 기능

- Array, JSON, List, Object, Tensor 등의 자료형을 Danfo.js의 `DataFrame` 객체로 변환할 수 있습니다.
- `DataFrame` 객체에서 `Series` 객체로, `Series` 객체에서 `DataFrame` 객체로 변환이 가능합니다.


### Data 전처리 기능

- One-hot Encoding(`OneHotEncoder`), Label Encoding(`LabelEncoder`), scaler(`StandardScaler`, `MinMaxScaler`) 등의 data 처리 기능(data preprocessing function)을 지원합니다.


### File Data 변환 기능

- CSV, Excel, JSON file로 저장된 data를 불러와서 `DataFrame`으로 변환하여 사용할 수 있습니다.


---


## Danfo.js의 자료형 : `Series`와 `DataFrame`

- Danfo.js는 자료형으로 `Series` 객체와 `DataFrame` 객체를 사용합니다.


### List를 표현하는 `Series` 객체

- `Series` 객체는 하나의 column을 가진 1차원 배열을 Danfo.js의 자료형으로 변환한 것입니다.

```js
var series = new dfd.Series([
    'row1',
    'row2',
    'row3'
]);
```


### Table을 표현하는 `DataFrame` 객체

- `DataFrame` 객체는 여러 column을 가진 2차원 배열을 Danfo.js의 자료형으로 변환한 것입니다.

```js
var dataFrame = new dfd.DataFrame([
    {'column1': 'row1', 'column2': 'row1', 'column3': 'row1'},
    {'column1': 'row2', 'column2': 'row2', 'column3': 'row2'},
    {'column1': 'row3', 'column2': 'row3', 'column3': 'row3'}
]); 
```


---


## Reference

- <https://danfo.jsdata.org/>
