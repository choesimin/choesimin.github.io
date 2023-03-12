---
layout: note
---

# View

- MySQL 버전 5 이상부터 가능한 특정 명령문에 매칭된 가상 table
- SELECT, WEHRE, Sub Query, UNION, JOIN 등 다양한 결합과 조건으로 만들어진 data를 가상 table(View)에 넣어 편리하고 빠르게 data에 접근하도록 함

# 특징

- 실제로 data를 저장하지 않고 오직 보여주는데 중점을 둔 기능
- View의 기반 table의 data를 수정할 경우 View에도 반영됨
- View의 data를 수정할 경우 실제 data도 같이 바뀜
- View로 생성된 가상 table에도 data의 UPDATE 및 INSERT가 가능
    - 그러나 JOIN, UNION, Sub Query 등으로 만들어진 View에는 data를 조작할 수 없음

# 사용법

- 생성
    ```sql
    CREATE VIEW [view_name] AS
    SELECT [column1], [column2], ... FROM [table_naem] [조건문];

    -- example
    CREATE VIEW seoul_members AS
    SELECT LastName, FirstName, Address, City, Country FROM members where City = '서울';
    ```

- 정보 확인
    - table 확인 명령어와 동일함
    ```sql
    SHOW tables;
    SHOW CREATE TABLE seoul_members;
    DESC seoul_members;
    ```

- 삭제
    ```sql
    DROP VIEW seoul_members;

    -- View가 없을 때 Error 출력하지 않도록 하기
    DROP VIEW IF EXISTS seoul_members;
    ```

- INSERT
    ```sql
    INSERT INTO seoul_members VAlUES ('초', '코비', '주소3', '부산', '대한민국');
    ```

- 생성할 때 주었던 조건과 일치하는 data만 insert할 수 있도록 하기
    ```sql
    WITH CHECK OPTION
    ```
    - View를 생성할 때 검사 option 추가
        ```sql
        CREATE VIEW seoul_members AS
        SELECT LastName, FirstName, Address, City, Country FROM members where City = '서울'
        WITH CHECK OPTION;
        ```
        - City가 '서울'이 아닌 row를 insert하면 조건 불일치 Error 발생

- UPDATE
    ``` sql
    OR REPLACE
    ```
    - View는 일부분만을 update할 수 없음
    - 전체 덮어쓰기 형태로 udpate
        ```sql
        CREATE OR REPLACE VIEW [view_name] AS
        SELECT [column1], [column2], ... FROM [table_name] [조건문];
        ```

- Column 구조 변경
    ```sql
    ALTER VIEW [view_name] AS SELECT [column_name] FROM [table_name];
    
    -- example
    ALTER VIEW seoul_members AS SELECT LastName, FirstName FROM members where City = '서울';
    ```

---

# Reference

- https://seung.tistory.com/entry/MySQL-뷰View-사용법
