---
layout: note
---

# MyISAM Engine

- MySQL의 기본 storage engine
- data를 매우 효율적으로 저장하고, 실질적인 제한이 없음
- 빈번한 data 사용의 부하를 잘 소화함
- B-tree, R-tree, Full-text Index를 지원함
- 특정 Index에 대한 memory cache를 지원함
- data 압축에 대한 option을 제공함
- 공간(Geographic Information System, GIS, 지리정보시스템) 함수 기능을 제공함

- transaction 미지원
    - table lock을 사용하며, transaction이나 row 수준의 잠금을 지원하지 않음
    - 그래서 InnoDB보다 simple하고 빠름
    - 하지만 동시성 제어가 어렵기 때문에 Read query가 많은 DW 환경에서 많이 사용됨

- 각 table을 주로 data file과 index file 두 곳에 저장함
    - 확장자는 각각 .MYD와 .MYI
    - MyISAM table은 동적인 행과 정적인(고정된 길이) 행을 모두 가질 수 있음
    - MySQL이 table 정의를 토대로 하여 사용할 format을 결정함

- Key Cache
    - InnoDB의 buffer pool과 비슷한 역할
    - 하지만 Key Cache는 index만 대상으로 작동함
    - 또한 index의 disk 쓰기 작업에 대해서만 부분적으로 buffering함

- 잠금과 동시성
    - MyISAM은 행 단위가 아니라 table 전체를 잠금
    - 읽기 동작(reader)은 읽어야 할 모든 table에 대한 공유된 읽기 권한을 얻음
    - 쓰기 동작(writer)은 배타적 쓰기 잠금 권한을 얻음
    - select query 실행 중에도 이 table에 새 행을 삽입할 수 있음 (동시 삽입)
        - 이 기능은 매우 중요하며 유용하게 사용됨

- 수동복구
    - ```CHECK TABLE mytable```과 ```REPAIR TABLE mytable``` 명령을 이용하면 table 오류를 조사하고 복구할 수 있음
    - ```myisamchk``` 명령어를 사용하면 server가 offline일 때에도 table을 조사하고 복구할 수 있음

- 지연된 key 쓰기
    - table을 생성할 때 DELAY_KEY_WRITE option이 ON으로 설정된 MyISAM table은 query 실행 마지막에 변경된 index data를 disk에 기록하지 않고, 대신 memory 상의 buffer에 변경 내용을 buffering함
    - MyISAM table은 buffer를 정리하거나 table을 닫을 때, index block을 disk로 flush함
        - 이러한 작업은 이용 빈도수가 높고 data 변경이 잦은 table의 성능을 높여줌
        - 그러나 server나 system에 충돌이 나면 index가 손상되므로 이를 복구해야 함
        - server를 다시 시작하기 전, ```myisamchk```을 실행하는 script나 자동 복구 option을 이용해 이 상황을 처리함
            - DELAY_KEY_WRITE option을 사용하지 않더라도 이렇게 대처하는 것이 좋음
    - DELAY_KEY_WRITE는 전역적 설정, 개별 table 기준 설정이 가능함

# 장단점

- 장점
    - data model design이 단순함
    - 전체적으로 속도가 InnoDB보다 빠름
    - Select 작업 시 속도가 빠르므로 읽기 작업에 적합
    - Full-Text Indexing이 가능하여 검색하고자 하는 내용에 대한 복합 검색이 가능

- 단점
    - table level의 lock을 사용하기 때문에 쓰기 및 수정 작업 속도가 느림
    - data 무결성 보장이 되지 않음

# 적합한 사용처

- traffic이 많은 web site
- data warehouse
- 정적인 table, log table
- 쓰기 작업이 별로 없는 select 위주의 table
- log table
    - Read시에 Insert가 가능하기 때문 (Current Insert 기능)

---

# Reference

- https://nomadlee.com/mysql-%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80-%EC%97%94%EC%A7%84-%EC%A2%85%EB%A5%98-%EB%B0%8F-%ED%8A%B9%EC%A7%95/
- https://kchanguk.tistory.com/133