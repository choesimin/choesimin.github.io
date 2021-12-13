# MySQL

## Comment 조회

- table comment
    ```sql
    SELECT 
        table_name, table_comment
    FROM
        information_schema.tables
    WHERE
        table_schema = 'DB 이름' AND table_name = '테이블 이름';
    ```

- column comment
    ```sql
    SELECT
        table_name, column_name, column_comment
    FROM
        information_schema.columns
    WHERE
        table_schema = 'DB 이름' AND table_name = '테이블 이름';
    ```

---

# Reference

- https://extbrain.tistory.com/97
