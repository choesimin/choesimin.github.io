---
layout: skill
title: MySQL View - 가상 Table을 만들어 명령문에 연결하기
date: 2023-08-04
---


- View는 MySQL 5.0부터 사용 가능한 특정 명령문에 연결되는 가상 table이며, data를 실제로 저장하지 않고 오직 보여주는데 중점을 둔 기능입니다.
    - SELECT, WEHRE, SubQuery, UNION, JOIN 등 다양한 결합과 조건으로 만들어진 data를 View에 넣어, 편리하고 빠르게 data에 접근하도록 할 수 있습니다.

- View의 기반 table의 data를 수정하면, View에도 반영됩니다.
    - 반대로 View의 data를 수정하면, 기반 table의 data도 같이 바뀝니다.

- View로 생성된 가상 table에도 data의 UPDATE 및 INSERT가 가능합니다.
    - 예외적으로, JOIN, UNION, SubQuery 등으로 만들어진 View는 data를 조작할 수 없습니다.


---


## 사용법


### View 생성하기

```sql
CREATE VIEW [view_name] AS
SELECT [column1], [column2], ... FROM [table_naem] WHERE [condition];

-- example
CREATE VIEW seoul_members AS
SELECT last_name, first_name, address, city, country FROM members WHERE city = 'SEOUL';
```


### View 정보 확인하기

- table 확인 명령어와 동일합니다.

```sql
SHOW tables;
SHOW CREATE TABLE seoul_members;
DESC seoul_members;
```


### View 삭제하기

```sql
DROP VIEW seoul_members;

-- View가 없을 때 오류를 출력하지 않도록 합니다.
DROP VIEW IF EXISTS seoul_members;
```


### View에 Data 넣기

```sql
INSERT INTO seoul_members VAlUES ('초', '코비', '주소3', '부산', '대한민국');
```


### Check Option을 추가하여 View 생성하기

- `WITH CHECK OPTION` keyword를 추가하여, 생성할 때 주었던 조건과 일치하는 data만 넣을 수 있도록 제한할 수 있습니다.
    
```sql
-- city가 'SEOUL'이 아닌 row를 insert하면 조건 불일치 오류가 발생합니다.
CREATE VIEW seoul_members AS
SELECT last_name, first_name, address, city, country FROM members WHERE city = 'SEOUL'
WITH CHECK OPTION;
```


### View의 Data 수정하기

- View는 일부분만을 update할 수 없으며, 전체를 덮어쓰며 update합니다.

```sql
CREATE OR REPLACE VIEW [view_name] AS
SELECT [column1], [column2], ... FROM [table_name] WHERE [condition];
```


### View의 Column 구조 변경하기

```sql
ALTER VIEW [view_name] AS SELECT [column_name] FROM [table_name];

-- example
ALTER VIEW seoul_members AS SELECT last_name, first_name FROM members where city = 'SEOUL';
```


---


## Reference

- <https://seung.tistory.com/entry/MySQL-뷰View-사용법>