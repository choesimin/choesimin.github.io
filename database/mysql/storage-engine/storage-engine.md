# MySQL Storage Engine

- MySQL은 각 database(scheme)를 file system 안의 data directory의 하위 direcory로 저장함
- table을 생성하면 MySQL은 table 이름과 같은 이름을 가진 .frm file을 만들고 그 안에 table 정의 정보를 저장함
    - ex
        - MyTable이라는 table을 만들 경우 MySQL은 MyTable.frm에 table 정의를 저장함
        - MySQL은 database 이름과 table 정의를 저장하는 데에 file system을 사용하므로 대/소문자 구분은 platform에 따라 결정됨
            - Windows MySQL instance에서 table과 database 이름에는 대/소문자 구분이 없으나, Unix 계열 system에서는 대/소문자를 구분함
- storage engine에 따라 table data와 index를 저장하는 방식이 다르지만 table 정의는 server에서 담당함

- 특정 table이 어떤 storage engine을 사용하는지 확인하기
    ```sql
    SHOW TABLE STATUS LIKE 'user';
    ```
    ```
    *************************** 1. row ***************************
    Name: user
    Engine: InnoDB
    Version: 10
    Row_format: Dynamic
    Rows: 7
    Avg_row_length: 2340
    Data_length: 16384
    Max_data_length: 0
    Index_length: 0
    Data_free: 4194304
    Auto_increment: NULL
    Create_time: 2020-06-14 13:09:58
    Update_time: NULL
    Check_time: NULL
    Collation: utf8_bin
    Checksum: NULL
    Create_options: row_format=DYNAMIC stats_persistent=0
    Comment: Users and global privileges
    ```
    | 항목 | 설명 |
    | - | - |
    | Name | table 이름 |
    | Engine | table의 storage engine |
    | Row_format | record format. MyISAM table은 Dynamic(동적), Fixed(고정), Compressed(압축)의 형식을 취할 수 있음. Dynamic record는 VARCHAR 또는 BLOB과 같은 column을 갖기 때문에 길이가 다양함. 항상 크기가 같은 Fixed record는 CHAR 이나 INTEGER처럼 길이가 변하지 않고 고정된 column으로 구성됨 |
    | Rows | table 내 행의 개수. 이 수치는 비-transaction table에서는 항상 정확하지만 transaction 테이블에서는 주로 추정 값임 |
    | Avg_row_length | 행의 평균 byte 수 |
    | Data_length | table의 전체 data 양 (Byte) |
    | Max_data_length | table이 가질 수 있는 최대 data 양 |
    | Index_length | index data의 디스크 공간 소비량 |
    | Data_free | MyISAM table에 할당되었으나 아직 사용하지 않은 공간. 이전에 삭제된 행이 남아있으며 나중에 INSERT 구문이 실행될 때 재사용될 수 있음 |
    | Auto_increment | 다음 AUTO INCREMENT 값 |
    | Create_time | table이 처음 생성된 시기 |
    | Update_time | data가 마지막으로 갱신된 시기 |
    | Check_time | table이 CHECK TABLE이나 myisamchk를 사용하여 마지막으로 검사된 시기 |
    | Collation | table 내 character record의 기본 Character Set 과 Collations |
    | Checksum | table 전체 contents의 유효한 checksum 값 |
    | Create_options | table 생성 시에 지정된 별도 option |
    | Comment | 다양한 부수 정보. MyISAM table은 table이 생성되었을 때 설정된 주석이 표시됨. InnoDB table에서는 InnoDB table space에 있는 빈 공간에 대한 정보가 표시됨. table이 view라면 ‘VIEW’라는 문자 표시 |

- 종류
    - InnoDB Engine
    - MyISAM Engine
    - Memory Engine
    - Archive Engine
    - CSV Engine
    - Federated Engine

- 선택 시 고려사항
    - table 별로 storage engine을 선택할 수 있으므로 각 테이블이 어떻게 사용되고 데이터가 어떻게 저장되는지 확실히 이해해야 하며, 응용프로그램을 전체적으로 이해하고 확장 가능성을 아는 것도 유용함
    - 응용프로그램에 트랜잭션이 필요하다면 InnoDB 엔진이 가장 안정적이라고 할 수 있다.
        - MyISAM은 트랜잭션이 필요없는 사이트에 사용되며 DML 중 SELECT가 메인인 업무에 적합하다고 보면 된다.
        - 데이터 실무에서 트랜잭션을 지원하지 않는 것은 말이 되지 않는 상황이지만 로깅과 같은 환경에서는 유리하다고 볼 수 있다.

    - 동시에 삽입과 읽기만 하면 된다면 MyISAM으로도 충분하지만 여러 작업이 서로 인터럽트 없이 동시에 실행되려면 Row 수준 잠금 기능이 있는 InnoDB 엔진을 선택해야 한다.

    - 서버가 백업이 시행되는 주기에 맞춰 섯다운 가능하다면 스토리지 엔진이 다루기 쉬워진다.
        - 그러나 어떤 형식으로든 온라인 백업(서버가 실행되어 있는 상태에서 백업)을 해야 한다면 선택의 여지가 불분명해진다.

---

# InnoDB Engine

- InnoDB는 트랜잭션을 처리하기 위해 고안됐는데 대부분의 경우 롤백되지 않고 완료되는(즉 정상 종료되는) 짧은 트랜잭션이 많은 경우를 처리하기 좋게 되어 있다.

- InnoDB는 가장 많이 사용되는 Storage Engine 으로 ACID 트랜잭션을 지원하는 대표적인 MySQL의 대표적이고 뛰어난 성능과 장애 복구 기능을 가진 엔진이다. 결제 정보와 같이 정보의 무결성을 가져야하고 손실되면 안되는 중요한 데이터를 필요로 할 때 사용한다.

- InnoDB 테이블은 클러스터 인덱스(clustered index) 위에 구성 되어있으며 InnoDB의 인덱스 구조는 대 부분의 MySQL 스토리지 엔진의 인텍스 구조와는 매우 상이하다. 그 결과 매우 신속한 기본 키 (primary key) 조회가 가능하다.

- 그러나 보조 인덱스(기본 키가 아닌 인텍스)는 기본 거 행을 포함하므로 만약 기본 키가 크다면 다른 인텍스 또한 클 것이다. 테이블이 여러 인텍스를 가진다면 기본키가 작은 값을 갖게 해야 한다.




- 프라이머리 키에 의한 클러스터링
    - 모든 테이블은 기본적으로 프라이머리 키를 기준으로 클러스터링되어 저장된다. 즉 키값 순서대로 디스크에 저장이 된다는 뜻이며 이로 인해 프라이머리 키에 의한 Range 스캔은 상당히 빨리 처리될 수 있다는 것이다.

- 잠금이 필요 없는 일관된 읽기
    - MVCC(Multi Version Concurrency Control) 기술을 이용해 락을 걸지 않고 읽기 작업을 수행하여 락을 걸지 않기 때문에 InnoDB에서 읽기 작업은 다른 트랜잭션이 가지고 있는 락을 기다리지 않아도 된다.

- 외래키 지원
    - InnoDB 스토리지 엔진 레벨에서 지원하는 기능으로 MylSAM이나 MEMORY 테이블에서는 사용할 수 없다. 외래키는 여러 가지 제약사항 탓으로 인해 실무에서는 잘 사용하지 않기 때문에 그렇게 필수적이지는 않지만 개발 환경의 데이터베이스에서는 좋은 가이드 역할을 할 수 있다.

- 자동 데드락 감지
    - 그래프 기반의 데드락 체크 방식을 사용하기 때문에 데드락이 발생함과 동시에 바로 감지되고, 감지된 데드락은 관련 트랜잭션 중에서 ROLLBACK이 가장 용이한 트랜잭션을 자동적으로 강제 종료한다. 그래서 데드락 때문에 쿼리가 타임아웃(timeout) 또는 슬로우 쿼리로 기록되는 경우는 많지 않다.

- 자동화된 장애 복구
    - 손실이나 장애로부터 데이터를 보호하기 위해 여러 메커니즘이 탑재되어 있으며 MySQL 서버가 시작될 때 완료되지 못한 트랜잭션이나 디스크에 일부만 기록된 트랜잭션(Partial write) 등에 대한 일련의 복구 작업이 자동으로 진행된다.

- 오라클의 아키텍처 적용
    - InnoDB 스토리지 엔진의 기능은 오라클 DBMS의 기능과 상~히 비슷한 부분이 많다 대표적으로 MVCC 기능이 제공된다는 것과 언두{Undo) 데이터가 시스멈 테이블 스페이스에 관리된다는 것이고 추가로 테이블 스페이스의 개념 등이 유사하다.



---

# MyISAM Engine

- MySQL 의 기본 스토리지 엔진인 MyISAM은 전문 (full-text) 인덱싱, 압축, 공간 (Geographic Information System, GIS, 지리정보시스템) 함수 등 여러 유용한 기능을 제공하지만 Table lock 사용하여 트랜잭션이나 Row 수준의 잠금을 지원하지 않는다. MyISAM은 Transaction을 지원하지 않기 때문에 InnoDB보다 심플하고 기본적으로 빠르지만 동시성 제어가 어렵다는 단점이 있다. 그래서 Read 쿼리가 많은 DW 환경에서 많이 사용된다.

- MyISAM은 각 태이블을 데이터 파일과 인텍스 파일 두 곳에 주로 저장하는데, 이 두 파일의 확장자는 각각 .MYD와 .MYI다. MyISAM 테이블은 동적인 행과 정적인(고정된 길이) 행을 모두 가질 수 있는데 MySQL이 테이블 정의를 토대로 하여 사용할 포멧을 결정한다.

- Key Cache
    - InnoDB의 버퍼풀과 비슷한 역할을 하는 것이 MyISAM의 Key Cache 이다. 하지만 이름 그대로 Key Cache는 인덱스만 대상으로 작동하며 또한 인덱스의 디스크 쓰기 작업에 대해서만 부분적으로 버퍼링 역할만 한다.

- 잠금과 동시성
    - MyISAM은 행 단위가 아니라 테이블 전체를 잠근다. 읽기동작(reader)은 읽어야 할 모든 테이블에 대한 공유된 읽기 권한을 쓰기동작(writer)은 배타적 쓰기 잠금 권한을 얻는다. select쿼리 실행 중에도 이 테이블에 새 행을 삽입할 수 있는데(동시 삽입), 이 기능은 매우 중요하며 유용하게 쓰인다.

- 수동복구
    - CHECK T ABLE mytable과 REPAIR TABLE mytable 명령을 이용하면 테이블 오류를 조사하고 복구할 수 있다. myisamchk 명령어를 사용하면 서버가 오프라인일 때에도 테이블을 조사하고 복구할수 있다.

- 지연된 키 쓰기
    - 테이블을 생성할 때 DELAY_KEY_WRITE 옵션이 ON으로 설정된 MyISAM 테이블은 쿼리 실행 마지막에 변경된 인텍스 데이터를 디스크에 기록하지 않고, 대신 메모리 상의 커 버퍼에 변경 내용을 버퍼링한다.

- MyISAM 테이블은 버퍼를 정리하거나 테이 블을 닫을 때 인텍스 블록을 디스크로 플러시(flush)한다 이러한 작업은 이용 빈도수가 높고 데이터 변경 이 잦은 테이블의 성능을 높여 준다. 그러나 서버나 시스템에 충돌이 나면 인덱스가 손상되므로 이를 복구해야 한다. 서버를 다시 시 작하기 전 myisamchk을 실행하는 스크립트나 자동 복구 옵션을 이용해 이 상황을 처리한다(DELALKEY_WRITE 옵션을 사용하지 않더라도 이렇게 하는 것은 매우 좋은 생각이다). DELAY_KEY_WRITE는 전역적으로 또는 개별 테이블 기준으로 설정할 수 있다.


---

# Memory Engine

- 메모리에 데이터를 저장하는 엔진이며 Transaction을 지원하지 않고 table-level locking을 사용한다.
- 메모리를 사용하기 때문에 기본적으로 속도가 아주 빠른 편이지만 데이터를 읽어버릴 위험이 있다. 그렇기 때문에 중요하지 않지만 빠른 처리가 필요한 임시 테이블로 많이 사용하는 편이다. 메모리 테이블의 모든 데이터는 메모리 안에 저장되므로 쿼리가 디스크 입출력을 기다릴 필요가 없다.
- HEAP 테이블이라 불리던 메모리 테이블은 불변하는 데이터나 재시작 이후 지속되지 않는 데이터에 빠르게 접근하는 데 유용하다. 메모리 테이블의 테이블 구조는 서버가 재시작해도 지속되지만 데이터는 지속되지 않는다.
- 메모리 테이블의 사용 예시
    - 조회용 또는 매핑용 테이블(ex: 우편번호를 주소에 매핑하는 테이블)
    - 주기적으로 집계되는 데이터의 결과 캐시용
    - 데이터 분석 시 중간결과저장용
- 쿼리를 처리할 때 중간 결과를 저장할 임시 테이블이 필요하
- MySQL은 내부에서 메모리 엔진을 사용한다 중간 결과가 메모리 테이블에 저장하기에 너무 커지거나 TEXT 또는 BLOB 칼럼이 포함되어 있다면 MySQL은 디스크에 MyISAM 테이블을 만들어 처리한다.

```
사용자들은 자주 메모리 테이블을 CREATE TEMPORARY TABLE 구문으로 만들어진 임시 테이블과 혼동한다. 임시 테이블은 어떤 스토리지 엔진이든 사용할 수 있으며 메모리 스토리지 엔진을 사용하는 테이블과는 다르다. 임시 테이블은 단일 연결에만 보이며 연결이 끝나면 사라진다.
```


## Memory engine으로 변경하기

```sql
alter table table_name engine=memory;
```

---

# Archive Engine

- 아카이브 엔진(Archive Engine)은 아주 빠르게 INSERT 쿼리를 처리할 수 있는 엔진이다. MyISAM보다 디스크 입출력을 훨씬 적게 일으키는데, 데이터 쓰기를 버퍼링하고 각 행이 삽입될 때마다 zlib으로 압축하기 때문이다.

- Index를 지원하지 않으며 INSERT/REPLACE/SELECT 쿼리와 같이 데이터를 삽입하거나 읽는 것은 가능하지만 DELETE/UPDATE와 같이 데이터를 삭제하거나 수정할수는 없다. transaction을 지원하지 않고 row-level locking을 사용하며 주로 많은 양의 로그성 데이터를 저장하고 읽는데 주로 사용된다.

---

# CSV Engine

- CSV 엔진은 쉽표로 구분된 값(Comma Separated Values)으로 구성된 파일을 테이블로 처리할수 있지만 인덱스를 지원하지는 않는다. CSV 엔진은 서버가 실행되는 동안에 데이터베이스 내외로 파일을 복사하게 해준다. 스프레드시트에서 CSV 파일을 내보내 MySQL 서버의 데이터 디렉터리에 저장하면 서버는 그 즉시 이 파일을 읽을 수 있다. 마찬가지로 CSV 테이블에 데이터를 기록하면 외부 프로그램이 이를 바로 읽을 수 있다.

---

# Federated Engine

- Federated 엔진은 데이터를 자체 스토리지에 저장하지 않는다. 각 Federated 테이블은 원격 MySQL서버 내의 태이블을 참조하는데, 결국 모든 작업에 있어서 원격 서버에 연결한다고 볼 수 있다.

- 현재 Federated 엔진을 구현하는 방법에는 여러 문제점과 제한점이 있다.

- Federated 엔진은 특유의 작동 방식 때문에 기본키를 이용한 단일 행 조회나 원격 서 버 에 실행될 INSERT 쿼리에 가장 유용하지만 집계 쿼리나 조인 또는 다른 기본적인 작업에는 성능이 떨어진다.

---

# Blackhole Engine

- Blackhole 엔진은 저장 메커니즘을 전혀 갖고 있지 않으며 모든 INSERT 구문을 실행하지 않고 그냥 버림
    - 그러나 서버는 Blackhole 테이블에 대한 쿼리를 로그에 기록하므로 그 정보가 슬레이브에 복제되거나 로그에 남아 있을 수 있음
- 복잡한 복제 구성과 감사용 logging에 유용하게 사용할 수 있음

---

# Reference

- https://nomadlee.com/mysql-%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80-%EC%97%94%EC%A7%84-%EC%A2%85%EB%A5%98-%EB%B0%8F-%ED%8A%B9%EC%A7%95/