---
layout: skill
permalink: /199
title: 자료 구조 - 연결 List (Linked List)
description: Linked List는 data 요소들이 서로 연결된 자료 구조로, 동적으로 크기를 조절할 수 있습니다.
date: 2024-05-29
---


## 연결 List - 요소를 선형으로 저장하기

- 연결 List(Linked List)는 data 요소들이 선형으로 연결된 자료 구조입니다.
    - 각 요소는 node라고 불리며, 각 node는 data와 다음 node를 가리키는 pointer를 포함합니다.
    - 연결 List는 배열(Array)과 달리 요소들이 memory 상에 연속적으로 저장되지 않으며, node에 저장한 pointer로 연결됩니다.

- 연결 List는 node를 동적으로 추가하거나 삭제할 수 있어, list의 크기를 유연하게 조절할 수 있습니다.

- 연결 List는 node들이 서로 연결되는 방식에 따라 **단일 연결 List**, **이중 연결 List**, **원형 연결 List**로 나뉩니다.
    - 연결 List는 기본적으로 data를 저장하는 node들이 pointer를 통해 서로 연결된 구조를 가지며, 구조의 변형을 통해 다르게 구현될 수 있습니다.


### 연결 List의 장점

- **동적 크기 조절** : 배열과 달리 연결 List는 동적으로 크기를 조절할 수 있습니다.
- **삽입/삭제 효율** : list의 중간에 요소를 삽입하거나 삭제할 때, 배열보다 효율적입니다.


### 연결 List의 단점

- **추가 Memory 사용** : 각 node가 data 외에도 pointer를 저장하므로 추가 memory가 필요합니다.
- **순차 접근** : 배열과 달리 임의 접근(random access)이 불가능하며, 원하는 요소를 찾기 위해 처음부터 순회해야 합니다.
- **Cache 비효율성** : memory 상에서 node들이 분산되어 있어 cache 적중률이 낮을 수 있습니다.


### 연결 List의 기본 연산

- **Node 삽입(Insertion)** : list의 특정 위치에 새로운 node를 추가하는 연산. 앞, 끝, 중간에 삽입할 수 있습니다.
- **Node 삭제(Deletion)** : list에서 특정 node를 찾아 제거하는 연산. head, 마지막, 중간 node를 삭제할 수 있습니다.
- **Node 검색(Search)** : list에서 특정 값을 가진 node를 찾는 연산. 값을 비교하며 list를 순회합니다.
- **Node 순회(Traversal)** : list의 모든 node를 방문하며 data를 처리하는 연산. node의 data를 출력하거나 특정 조건을 확인할 수 있습니다.


