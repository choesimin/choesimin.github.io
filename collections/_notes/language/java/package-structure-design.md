---
layout: note
permalink: /35
title: Java - Package Design Guide
description: Java package 구조를 설계할 때, Layer Package Structure와 Domain Package Structure 중 하나를 선택할 수 있습니다.
date: 2023-12-05
---


## Java Package 구조 설계하기 : Layer vs Domain

- Java의 package 구조는 크게 **Layer Package Structure**와 **Domain Package Structure**로 나뉩니다.
    - Layer Package Structure는 package를 계층(layer)에 따라 분리합니다.
    - Domain Package Structure는 package를 업무(domain)에 따라 분리합니다.

- 각 구조의 특성을 이해하고, 상황에 맞추어 선택해야 합니다.
    - 규모가 작고 domain이 적은 경우, Layer Package Structure를 선택합니다.
    - 규모가 크고 domain이 많은 경우, Domain Package Structure를 선택합니다.


---


## Layer Package Structure

```txt
application
│
├── controller
│   ├── ProductController
│   ├── MemberController
│   └── OrderController
│
├── service
│   ├── ProductService
│   ├── MemberService
│   └── OrderService
│
├── dao
│   ├── ProductDao
│   ├── MemberDao
│   └── OrderDao
│
├── dto
│   ├── ProductDto
│   ├── MemberDto
│   └── OrderDto
│
└── entity
    ├── Product
    ├── Member
    └── Order
```

- layer package 구조는 application에서 사용하는 계층 별로 package를 구성하는 방식입니다.
    - layered architecture와 관련이 있습니다.


### 장점

1. project에 대한 전반적인 이해도가 낮아도, package 구조만 보고 전체적인 구조를 파악할 수 있습니다.
    - application의 API를 보고 흐름을 파악하고 싶다면, Controller package 하나만 보고 파악할 수 있습니다.
    - application의 비즈니스 로직을 보고 싶다면, Service package 하나만 보고 파악할 수 있습니다.

2. 계층별 응집도가 높아집니다.
    - 계층별 수정이 일어날 때, 하나의 package만 보면 됩니다.


### 단점

1. domain별 응집도가 낮습니다.
    - package로 application의 기능을 구분할 수 없습니다.
    - domain의 흐름을 파악하기 어렵습니다.
        - 하나의 package 안에 여러 domain들이 섞여 있습니다.
        - domain의 흐름을 보고 싶을 때, 모든 계층 package를 봐야 합니다.
    - domain과 관련된 Spec이나 기능을 변경할 때, 여러 package에서 변경이 일어납니다.

2. UseCase(사용자의 행위) 표현이 어렵습니다.
    - 규모가 커지면, UseCase별로 class를 분리할 때가 있습니다.
        - 예를 들어, 상품 등록 UseCase를 `ProductRegistrationService`로 분리합니다.
    - 계층형 구조에서는 계층으로 package가 묶이기 때문에, domain 구조에 비해 분리하기 어렵습니다.

3. 하나의 package 안에 여러 class들이 모여서 구분이 어렵습니다.
    - 규모가 커지면, 수십 개의 class 사이에서 관련된 domain class 하나를 찾아야 할 수도 있습니다.


---


## Domain Package Structure

```txt
application
│
├── product
│   ├── controller
│   ├── service
│   ├── dao
│   ├── dto
│   └── entity
│
├── member
│   ├── controller
│   ├── service
│   ├── dao
│   ├── dto
│   └── entity
│
└── order
    ├── controller
    ├── service
    ├── dao
    ├── dto
    └── entity
```

- domain package 구조는 domain 단위로 directory를 구성합니다.
    - domain 단위로 나눈다고 하더라도, directory 내부는 계층형으로 구성됩니다.

- 큰 규모의 project에 적합한 구조입니다.
    - 규모가 크고 domain이 많은 만큼, domain의 응집도를 높게 유지하는 것이 중요합니다.
    - 규모가 크면 UseCase별로 class를 분리할 경우가 많습니다.


### 장점

1. domain별 응집도가 높습니다.
    - domain의 흐름을 파악하기 쉽습니다.
        - domain의 흐름을 보고 싶을 때, package 하나만 보면 됩니다.
    - domain과 관련된 Spec이나 기능을 변경할 때, 해당 domain package 내에서만 변경이 일어납니다.

2. UseCase별로 세분화해서 표현이 가능합니다.
    - domain별로 package가 나뉘기 때문에 domain의 UseCase를 분리하기 쉽습니다.
        - 예를 들어, 상품 등록 UseCase는 `ProductRegistrationService`로, 상품 검색 UseCase는 `ProductSearchService`로 쉽게 분리할 수 있습니다.
 

### 단점

1. application의 전반적인 흐름을 한눈에 파악하기 어렵습니다.
    - 흐름을 파악하기 위해 여러 package를 확인해야 할 경우가 많습니다.

2. class의 domain 분류 기준이 개발자마다 다를 수 있습니다.
    - class의 역할이 확실히 특정한 domain에 속한다면 해당 domain package에 포함시키면 됩니다.
    - 그러나 class의 역할이 domain으로 정확히 나뉘기 애매한 경우, 개발자마다 다른 기준으로 다른 package에 위치시키게 됩니다.
        - 예를 들어, '청구서 결제' 기능을 어떤 개발자는 '청구서'로 분류하고, 어떤 개발자는 '결제'로 분류할 수 있습니다.
    - 이후에 다른 개발자가 class의 위치가 자신이 예상하는 package와 다를 때, 해당 class를 찾기가 어렵습니다.
    - 따라서 내부적으로 합의된 domain 분류 기준이 있어야 합니다.


---


## Package 구조 설계 예시 : 청구/결제 Service

```txt
application
│
├── domain
│   ├── bill
│   │   ├── controller
│   │   │   ├── BillController
│   │   │   └── dto
│   │   │       ├── BillSearchRequest
│   │   │       ├── BillSendRequest
│   │   │       ├── BillDestroyRequest
│   │   │       └── BillSearchResponse
│   │   ├── service
│   │   │   ├── BillSearchService
│   │   │   ├── BillSendService
│   │   │   ├── BillDestroyService
│   │   │   ├── entity
│   │   │   │   ├── Bill
│   │   │   │   ├── BillSend
│   │   │   │   └── PaymentCancel
│   │   │   └── dto
│   │   │       ├── BillDestroyDto
│   │   │       └── rest
│   │   │           ├── SmsBillSendRequest
│   │   │           ├── SmsBillSendResponse
│   │   │           ├── KakaotalkBillSendRequest
│   │   │           └── KakaotalkBillSendResponse
│   │   └── mapper
│   │       ├── BillMapper
│   │       ├── MemberMapper
│   │       ├── CustomerMapper
│   │       ├── dto
│   │       │   ├── BillInsertParameter
│   │       │   ├── BillUpdateParameter
│   │       │   ├── BillSearchParameter
│   │       │   ├── BillSearchResult
│   │       │   ├── BillEntity
│   │       │   ├── MemberEntity
│   │       │   └── CustomerEntity
│   │       └── enumeration
│   │           ├── BillType
│   │           └── BillState
│   ├── payment
│   │   ├── controller
│   │   │   ├── PaymentController
│   │   │   └── request
│   │   │       ├── PaymentRequest
│   │   │       └── PaymentCancelRequest
│   │   ├── service
│   │   │   ├── PaymentService
│   │   │   ├── PaymentCancelService
│   │   │   ├── entity
│   │   │   │   ├── Bill
│   │   │   │   ├── Payment
│   │   │   │   └── PaymentCancel
│   │   │   ├── dto
│   │   │   │   └── rest
│   │   │   │       ├── PaymentApprovalRequest
│   │   │   │       ├── PaymentApprovalResponse
│   │   │   │       ├── PaymentCancelApprovalRequest
│   │   │   │       └── PaymentCancelApprovalResponse
│   │   │   └── enumeration
│   │   │       ├── PaymentType
│   │   │       └── PayerType
│   │   └── mapper
│   │       ├── BillMapper
│   │       ├── PaymentLedgerMapper
│   │       ├── PayMethodMapper
│   │       ├── vo
│   │       ├── dto
│   │       │   ├── PaymentLedgerInsertParameter
│   │       │   ├── BillEntity
│   │       │   ├── PaymentLedgerEntity
│   │       │   └── PayMethodEntity
│   │       └── enumeration
│   │           ├── BillType
│   │           ├── BillState
│   │           └── PaymentLedgerState
│   ├── member
│   │   ├── controller
│   │   │   ├── MemberController
│   │   │   ├── MemberLoginController
│   │   │   ├── MemberPointController
│   │   │   └── request
│   │   │       ├── PaymentRequest
│   │   │       └── PaymentCancelRequest
│   │   ├── service
│   │   └── mapper
│   └── customer
│       ├── controller
│       ├── service
│       └── mapper
│
│── web
│   ├── bill
│   │   ├── controller
│   │   ├── service
│   │   └── mapper
│   ├── store
│   │   ├── controller
│   │   ├── service
│   │   └── mapper
│   ├── admin
│   │   ├── controller
│   │   ├── service
│   │   └── mapper
│   ├── receipt
│   │   ├── controller
│   │   ├── service
│   │   └── mapper
│   └── landing
│       ├── controller
│       ├── service
│       └── mapper
│
└── global
    ├── aspect
    │   ├── ErrorExceptionControllerAdvice
    │   └── BusinessExceptionControllerAdvice
    ├── exception
    │   ├── CommonErrorException
    │   └── CommonBusinessException
    ├── auth
    │   └── TokenAuthenticationManager
    ├── util
    │   ├── JsonUtil
    │   ├── DateUtil
    │   ├── EncryptionUtil
    │   ├── SmsUtil
    │   └── KakaotalkUtil
    └── property
        └── ExtraServiceProperty
```


---


## Reference

- <https://ksh-coding.tistory.com/96#%F0%9F%8E%AF%200.%20%EB%93%A4%EC%96%B4%EA%B0%80%EA%B8%B0%20%EC%A0%84-1>
- <https://minchul-son.tistory.com/m/505>
