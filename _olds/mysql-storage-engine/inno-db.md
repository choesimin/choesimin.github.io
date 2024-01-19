---
layout: note
---

# InnoDB Engine

- 뛰어난 성능과 장애 복구 기능을 가진 가장 많이 사용되는 MySQL의 storage engine
- tracsaction을 처리하기 위해 고안됨
    - rollback되지 않고 완료되는(== 정상 종료되는) 짧은 tracsaction이 많은 경우를 처리하기 좋게 되어 있음
- ACID tracsaction 지원
    - 결제와 같이 무결성을 가져야하고 손실되면 안 되는 중요한 data를 다룰 때 사용함
- B-Tree와 Clustered Index를 지원하기 때문에 빠른 속도의 primary key 조회가 가능함
    - index 구조가 다른 engine과 다름
- 특정 data와 Index에 대한 memory cache를 지원함
- table space당 64TB data의 저장을 지원함
- 다른 engine들에 비해 data load 속도가 느림
- data 압축 option을 제공하지 않음
- row 레벨의 lock을 지원하며 여러가지 isolation level을 지원함

- Primary key에 의한 clustering
    - 모든 table은 기본적으로 primary key를 기준으로 clustering되어 저장됨
    - key값 순서대로 disk에 저장이 된다는 뜻이며, 이로 인해 primary key에 의한 Range scan은 상당히 빠르게 처리됨

- 잠금이 필요없는 일관된 읽기
    - MVCC(Multi Version Concurrency Control) 기술을 이용해 lock을 걸지 않고 읽기 작업을 수행함
    - lock을 걸지 않기 때문에 InnoDB에서의 읽기 작업은 다른 transaction션이 가지고 있는 lock을 기다리지 않아도 됨

- Foreign key 지원
    - InnoDB storage engine level에서 지원하는 기능
        - MylSAM이나 MEMORY table에서는 사용할 수 없음
    - foreign key는 여러가지 제약사항 탓으로 인해 실무에서는 잘 사용하지 않기 때문에 그렇게 필수적이지는 않지만, 개발 환경 database에서는 좋은 guide 역할을 할 수 있음

- 자동 Deadlock 감지
    - graph 기반의 deadlock check 방식을 사용하기 때문에 deadlock이 발생함과 동시에 바로 감지할 수 있음
    - 감지된 deadlock은 관련 transaction 중에서 ROLLBACK이 가장 용이한 transaction을 자동적으로 강제 종료함
        - 그래서 deadlock 때문에 query가 timeout 또는 slow query로 기록되는 경우는 많지 않음

- 자동화된 장애 복구
    - 손실이나 장애로부터 data를 보호하기 위해 여러 mechanism이 탑재되어 있음
    - MySQL server가 시작될 때 완료되지 못한 transaction이나 disk에 일부만 기록된 transaction(partial write) 등에 대한 일련의 복구 작업이 자동으로 진행됨

- Oracle의 architecture 적용
    - InnoDB storage engine의 기능은 Oracle DBMS의 기능과 비슷한 부분이 많음
        - MVCC 기능
        - Undo data가 system table space에 관리됨
        - table space의 개념
        - ...

# 장단점

- 장점
    - data 무결성이 보장됨
    - 제약조건, foreign key의 생성이 가능하며, 동시성 제어 등 다양한 기능을 지원
    - Row level의 Lock을 사용하기 때문에 변경 작업에 대한 속도가 빠름

- 단점
    - 많은 기능을 제공하다보니 data model design에는 많은 시간이 필요함
    - system resource를 많이 사용함

# 적합한 사용처

- Online transaction을 지원하는 system
- 민감한 정보를 갖는 table
- 갱신 위주의 transaction이 요구되는 table
- Index가 많이 걸린 대량의 table

---

## Reference

- https://nomadlee.com/mysql-%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80-%EC%97%94%EC%A7%84-%EC%A2%85%EB%A5%98-%EB%B0%8F-%ED%8A%B9%EC%A7%95/
- https://kchanguk.tistory.com/133