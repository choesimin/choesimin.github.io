---
layout: note
title: 자료구조
---

# Data Structure : 자료구조

- computer science에서 효율적인 접근 및 수정을 가능케 하는 자료의 조직, 관리, 저장을 의미
- 자료구조는 data 값의 모임, data 간의 관계, data에 적용할 수 있는 함수나 명령을 의미
- 신중히 선택한 자료구조는 보다 효율적인 algorithm을 사용할 수 있게 함
- 자료구조의 선택 문제는 대개 추상 자료형의 선태으로부터 시작하는 경우가 많음
- 효과적으로 설계된 자료구조는 실행시간 혹은 memory 용량과 같은 자원을 최소한으로 사용하면서 연산을 수행하도록 해줌
- 자료구조는 여러 종류가 있으며, 각각의 자료구조는 각자의 연산 및 목적에 맞추어져 있음
    - ex) B-tree는 database에 효율적, routing table은 network(internet, intranet)에 일반적
- 커다란 system을 제작할 때 구현 난이도와 최종 결과물의 성능은 자료구조에 크게 의존함
    - 자료구조가 선택되면 적용할 algorithm이 상대적으로 명확해지기 때문
        - 그러나 때때로 목표가 되는 연산이 특정 algorithm을 반드시 필요로 하며, 해당 algorithm이 특정 자료구조에서 가장 나은 성능을 발휘할 때, 반대 순서로 정해지기도 함
    - 자료구조에 의존한다는 관점은 algorithm보다 자료구조가 더 중요한 요소로 적용되는 많은 정형화된 개발론, programming 언어의 개발을 촉발시킴
        - 자료구조가 검증된 구현은 감춘 채 interface만을 이용하여 다양한 program에서 사용되는 것을 가능하게 해줌
            - 대부분의 언어는 일정 수준의 module 개념을 가지고 있기 때문에 가능한 것
            - C++, Java와 같은 객체지향 programming 언어는 특히 이러한 목적으로 객체를 사용함
            - ex) C++의 표준 Template Library, Java의 Java API, MicroSoft의 .NET




---



## 자료구조의 기초 단위

1. 행렬
2. Record
3. Union
4. 참조
    - ex) Nullable 참조 = 참조 + Union
    - ex) 연결 List = Record + Nullable 참조




---




## 분류

- 자료의 특성과 크기, 주요 사용법과 수행하는 연산의 종류, 구현에 필요한 기억 공간 크기에 따라 여러 가지 종류의 자료구조 중 하나를 선택할 수 있음
- 자료구조의 종류로는 자료형의 따라 분류하는 단순 구조와 자료 간 관계가 1:1인 선형 구조, 1:N 혹은 N:N 구조인 비선형 구조, 마지막으로 file 구조가 있음


### 구현에 따른 분류

- 배열
    - 가장 일반적인 구조
    - memory 상에 같은 type의 자료가 연속적으로 저장됨
    - 자료값을 나타내는 가장 작은 단위가 자료를 다루는 단위

- Tuple
    - 둘 이상의 자료형을 묶음으로 다루는 구조

- 연결 List
    - node를 단위로 함
    - node는 자료와 다음 node를 가리키는 참조값으로 구성되어 있음
    - node가 다음 node로 아무것도 가리키지 않으면 list의 끝

- 원형 연결 List
    - 각 node는 다음 node를 가리키고, 마지막 node가 처음 node를 가리키는 연결 list

- 이중 연결 List
    - 각 node는 이전 node와 다음 node를 가리키는 참조값으로 구성됨
    - 처음 node의 이전 node와 마지막 node의 다음 node는 없음

- 환형 이중 연결 List
    - 처음 node가 이전 node로 마지막 node를 가리키고, 마지막 node가 다음 node로 처음 node를 가리키는 이중 연결 list

- Hash Table
    - 개체가 hash값에 따라 indexing됨


### 형태에 따른 분류

- 선형 구조
    - Stack
        - 먼저 저장된 것이 꺼내어 쓸 때는 제일 나중에 나옴
        - 반대로, 가장 최근에 저장된 것이 꺼내어 쓸 때는 제일 먼저 나옴
        - 만약, 자료들의 나열 순서를 바꾸고 싶다면 stack에 집어 넣었다가 꺼내면 역순으로 바뀜
    - Queue
        - stack과 반대로, 먼저 저장된 것이 제일 먼저 나옴
        - 반대로, 가장 나중에 저장된 것이 꺼내어 쓸 때는 가장 나중에 나옴
    - 환형 Queue
        - 한정된 길이 안에서 부수적인 작업 없이 읽고 쓰기를 할 수 있는 queue
    - Deque
        - 양쪽에서 넣기와 빼기를 할 수 있는 일반화된 선형 구조

- 비선형 구조
    - Graph : 꼭짓점과 꼭짓점을 잇는 변으로 구성됨
        - 유향 graph & 무향 graph : 변이 방향성을 가지는지 가지지 않는지에 따른 graph의 분류
                - 무향 graph : 순환이 없는 연결 graph
                - 유향 graph : 변의 방향은 보통 부모를 가리키도록 구현됨
    - Tree : 뿌리와, 뿌리 또는 다른 꼭짓점을 단 하나의 부모로 갖는 꼭짓점들로 이루어진 구조 (부모 자식 관계는 변으로 표현됨)
        - 이진 Tree : 자식이 최대 두 개인 tree
            - Heap : 이진 tree의 일종으로 이진 tree에 어떤 특성을 부여한 것이라 할 수 있음




---




# Reference

- https://ko.wikipedia.org/wiki/자료_구조
