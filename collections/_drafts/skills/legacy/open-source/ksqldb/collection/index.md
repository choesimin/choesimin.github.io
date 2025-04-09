---
layout: notes
title: ksqlDB Collection - Data 저장소
date: 2025-02-27
---




## Collection

- ksqlDB에서 data를 저장하는 저장소를 **Collection**이라고 합니다.

- collection을 나누는 기준은 2가지입니다.
    1. **Source Collection** vs **Derived Collection**.
    2. **Stream** vs **Table**.

|  | **Source Collection** | **Derived Collection** |
| --- | --- | --- |
| **Stream** | Source Stream | Derived Stream |
| **Table** | Source Table | Derived Table |



- 카프카 토픽에서 데이터를 읽어와서 Collection을 생성한다. → Source Collection
    - 생성된 Collection은 카프카로 전달되지 않는다.

- ksqlDB에서 생성한 스트림, 테이블에서 파생된 Collection을 생성한다. → Derived Collection
    - 생성된 Collection은 카프카로 전달된다.



---


## Reference

- <https://ojt90902.tistory.com/1207>
