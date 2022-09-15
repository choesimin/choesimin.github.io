# Memory Engine

- memory에 data를 저장하는 engine이며 transaction을 지원하지 않고 table-level locking을 사용함
- memory를 사용하기 때문에(+ hash index 사용) 기본적으로 속도가 아주 빠른 편이지만 data를 읽어버릴 위험이 있음
    - memory table의 모든 data는 memory 안에 저장되므로 query가 disk 입출력을 기다릴 필요가 없음
    - 중요하지 않지만 빠른 처리가 필요한 임시 table로 많이 사용함
- HEAP table이라 불리던 memory table은 불변하는 data나 rebooting 이후 지속될 필요 없는 data에 빠르게 접근하는 데 유용함
- memory table의 table 구조는 server rebooting 후에도 지속되지만 data는 지속되지 않음
- memory table의 사용 예시
    - 조회용 또는 mapping table
        - ex) 우편번호를 주소에 mapping하는 table
    - 주기적으로 집계되는 data의 결과 cache 용도
    - data 분석 시 중간 결과 저장용
        - query를 처리할 때 중간 결과를 저장할 임시 table이 필요함
- MySQL은 내부에서 memory engine을 사용함
    - 이때 중간 결과가 memory table에 저장하기에 너무 커지거나 TEXT 또는 BLOB column이 포함되어 있다면 MySQL은 disk에 MyISAM table을 만들어 처리함

```
사용자들은 memory table을 CREATE TEMPORARY TABLE 구문으로 만들어진 임시 table과 자주 혼동한다. 임시 table은 어떤 storage engine이든 사용할 수 있으며 memory storage engine을 사용하는 table과는 다르다. 임시 table은 단일 연결에서만 보이며 연결이 끝나면 사라진다.
```

## 사용법

- table create
    ```sql
    CREATE TABLE table_name(seq LONG, value CHAR(20)) ENGINE=MEMORY;
    ```

- memory engine으로 변겅
    ```sql
    alter table table_name engine=memory;
    ```

---

# Reference

- https://nomadlee.com/mysql-%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80-%EC%97%94%EC%A7%84-%EC%A2%85%EB%A5%98-%EB%B0%8F-%ED%8A%B9%EC%A7%95/