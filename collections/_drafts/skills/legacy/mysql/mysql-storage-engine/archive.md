---
layout: note
---

# Archive Engine

- 아주 빠르게 INSERT 구문을 처리할 수 있는 engine입니다.
    - 가장 빠른 data load 속도를 제공합니다.

- MyISAM보다 disk 입출력을 훨씬 적게 일으킵니다.
    - data 쓰기를 buffering하고, 각 행이 삽입될 때마다 자동적오르 zlib으로 압축하기 때문입니다.

- index를 지원하지 않습니다.

- INSERT/REPLACE/SELECT 구문과 같이 data를 삽입하거나 읽는 것만 가능합니다.
    - DELETE/UPDATE와 같이 data를 삭제하거나 수정할 수는 없습니다.

- transaction을 지원하지 않고 row-level locking을 사용합니다.

- 주로 많은 양의 log data를 저장하고 읽는 데에 사용합니다.


---


## Reference

- <https://nomadlee.com/mysql-%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80-%EC%97%94%EC%A7%84-%EC%A2%85%EB%A5%98-%EB%B0%8F-%ED%8A%B9%EC%A7%95/>