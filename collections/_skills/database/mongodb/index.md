---
layout: skill
permalink: /30
title: MongoDB - 빠른 확장이 가능한 NoSQL Database
description: MongoDB는 문서 지향적인 database입니다.
date: 2023-12-29
---


## MongoDB : 문서 지향적인 NoSQL Database

- MongoDB는 고성능, 고가용성 및 쉬운 확장성을 제공하는 NoSQL, 문서 지향(document-oriented) database입니다.
    - NoSQL은 "Not Only SQL"의 약자로, 전통적인 SQL database와는 다른 특징을 가집니다.

- MongoDB는 빠른 확장이 가능하고, data modeling이 자유로운 특징을 가지고 있습니다.
    - 이는 개발자가 data 구조를 빠르게 변경하고 확장할 수 있도록 합니다.


### BSON 형식으로 Data 저장

- MongoDB는 **BSON**(Binary JSON) 형식으로 data를 저장하고 전송합니다.

- BSON은 "Binary JSON"의 줄임말로, 이진 형식 data 직렬화를 위해 설계된 format입니다.
    - BSON은 이진 data로 표현되어 있어 JSON보다 더 효율적으로 저장하고 전송할 수 있습니다.

- BSON은 JSON과 유사하며, JSON에서 사용되는 data 유형에 몇 가지를 추가적으로 제공합니다.
    - 예를 들어, binary data, 날짜, 정규 표현식 등.


### 자유로운 Schema
    
- MongoDB는 schema가 고정되어 있지 않습니다.
    - table 구조에 맞추어 data를 넣어야 하는 SQL database와는 반대되는 특징입니다.

- 동일한 collection 내에 다양한 schema를 가진 문서를 포함할 수 있습니다.
    - 그러나 이는 주로 특수한 경우에 사용되며, 일반적으로는 한 collection 내에서는 동일한 유형의 문서를 유지하는 것이 좋습니다.
    - 동일한 schema를 유지해야 query와 indexing이 더 효율적으로 수행되기 때문입니다.

- 이러한 유연성 덕에 개발자는 application의 요구 사항에 맞추어 data model을 쉽게 변경하고 확장할 수 있습니다.
    - shema를 변경할 때는 data의 일관성이 깨지지 않도록 주의해야 합니다.


