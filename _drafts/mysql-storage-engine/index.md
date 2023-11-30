---
layout: note
---

# MySQL Storage Engine

- MySQL은 각 database(scheme)를 file system 안의 data directory의 하위 direcory로 저장함

- table을 생성하면 MySQL은 table 이름과 같은 이름을 가진 .frm file을 만들고 그 안에 table 정의 정보를 저장함
    - ex
        - MyTable이라는 table을 만들 경우 MySQL은 MyTable.frm에 table 정의를 저장함
        - MySQL은 database 이름과 table 정의를 저장하는 데에 file system을 사용하므로 대/소문자 구분은 platform에 따라 결정됨
            - Windows MySQL instance에서 table과 database 이름에는 대/소문자 구분이 없으나, Unix 계열 system에서는 대/소문자를 구분함

- storage engine에 따라 table data와 index를 저장하는 방식이 다르지만 table 정의는 server에서 담당함



---



## 종류

- InnoDB Engine
- MyISAM Engine
- Memory Engine
- Archive Engine
- CSV Engine
- Federated Engine




---




## 선택 시 고려사항

- table 별로 storage engine을 선택할 수 있음
    - 각 table이 어떻게 사용되고 data가 어떻게 저장되는지 고려해야 함
    - 응용 program을 전체적으로 이해하고 확장 가능성을 아는 것도 선택에 유용함

- 응용 program에 transaction이 필요함 -> InnoDB engine이 가장 안정적임

- transaction이 필요없고, DML 중 select가 main인 업무 -> MyISAM engine
    - data 실무에서 transaction을 지원하지 않는 것은 말이 되지 않는 상황이지만 logging과 같은 환경에서는 유리함

- 삽입과 읽기만 하면 된다면 MyISAM으로도 충분하지만 여러 작업이 서로 interrupt 없이 동시에 실행되려면 Row 수준 잠금 기능이 있는 InnoDB engine을 선택해야 함




---




## 특정 table이 어떤 storage engine을 사용하는지 확인하기

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
| --- | --- |
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




---




# Reference

- https://nomadlee.com/mysql-%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80-%EC%97%94%EC%A7%84-%EC%A2%85%EB%A5%98-%EB%B0%8F-%ED%8A%B9%EC%A7%95/