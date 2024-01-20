---
layout: skill
---

# ACID

- database transaction이 안전하게 수행된다는 것을 보장하기 위한 성질을 가리키는 약어
    - database transaction : data에 대한 하나의 논리적 실행 단계
        - ex) 은행에서의 계좌 이체 = '송신자 계좌의 금액 감소' + '수신자 계좌의 금액 증가'

---

## Atomicity : 원자성

- transaction과 관련된 작업들이 부분적으로 실행되다가 중단되지 않는 것을 보장하는 능력
- 분해가 불가능한 최소의 단위인 하나의 원자처럼 동작해야 함
- all or nothing : 오로지 성공과 실패
    - 한꺼번에 완전히 전체가 정상적으로 수행이 왼료 되거나, 나이면 어떠한 연산도 수행되지 않음
- 중간 단계 가지 실행되고 실패하는 일이 없도록 하는 것

## Consistency : 일관성

- transaction이 실행을 성공적으로 완료하면 언제나 일관성 있는 database 상태로 유지하는 것
    - 무결성 제약이 모든 계좌는 잔고가 있어야 한다면, 이를 위반하는 transaction은 중단됨

## Isolation : 독립성

- transaction을 수행 시 다른 transaction의 연산 작업이 끼어들지 못하도혹 보장하는 것
- 다른 transaction에 영향을 주어서도 안되고, 다른 transaction들에 의해 간섭을 받아서도 안됨
- transaction 밖에 있는 어떤 연산도 중간 단계의 data를 볼 수 없음
- 성능 관련 이유로, 이 특성은 가장 유연성 있는 제약 조건

## Durability : 지속성

- 성공적으로 수행된 transaction은 영원히 반영되어야 함
- 일련의 data 조작을 완료하고 완료 통지를 사용자가 받는 시점에서 그 조작이 영구적이 되어 결과를 잃지 않도록 해야함
    - system이 정상일 때 뿐만 아니라 database나 OS의 이상 종료, 즉 system 장애도 견딜 수 있어야 함
    - 전형적으로 모든 transaction은 log로 남고 system 장애 발생 전 상태로 되돌릴 수 있음
        - transaction은 log에 모든 것이 저장된 후에만 commit 상태로 간주될 수 있음
- system check, DB 일관성 check 등을 하더라도 유지되어야 함

---

## Reference

- https://ko.wikipedia.org/wiki/ACID
- https://covenant.tistory.com/85
