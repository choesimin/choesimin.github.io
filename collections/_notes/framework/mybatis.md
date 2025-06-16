---
layout: note
published: false
---

# MyBatis

## #{} & ${}

- #{}
    - PreparedStatement 생성
    - PreparedStatement 매개변수 값을 안전하게 설정
    - PreparedStatement가 제공하는 set 계열의 method를 사용하여 물음표(?)를 대체할 값을 지정
    - 들어오는 data를 문자열로 인식하기 때문에 자동으로 따옴표(')가 붙음
    - ${}보다 안전함
    - compile이 미리 되어있기 때문에 Statement를 사용하는 ${}에 비해 더 빠름
        - prepared(준비된)이기 때문에
    - ex)
        ```sql
        SELECT count(*) FROM 
        ExUSER_TB
        WHERE USER_ID = #{id} AND USER_PW = #{pw}
        ```
- ${}
    - Statement 생성
    - Statement 매개변수 값을 '그대로' 전달
        - 따라서 문자열에 따옴표(')가 붙지 않음
        - table column type이 varchar여도 숫자 그대로 들어감
    - ex)
        ```sql
        SELECT count(*) FROM 
        ExUSER_TB 
        WHERE USER_ID = "${id}" AND USER_PW = "${pw}"
        ```
    - ORDER BY 함수를 사용할 때 많이 사용함
        ```sql
        ORDER BY ${columnName}
        ```
    - SQL Injection 같은 문제에 취약함

---

## Reference

- https://java119.tistory.com/39
    - #{}, ${} 차이
