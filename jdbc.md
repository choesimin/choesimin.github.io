# JDBC (Java DataBase Connectivity)

- java를 이용한 database 접속과 sql 문장의 실행, 그리고 실행 결과로 얻어진 data의 handling을 제공하는 방법과 절차에 관한 규약
- java program 내에서 sql 문을 실행하기 위한 java API
  - java.sql package에 위치 (JDBC programming을 할 때, java.sql의 interface로 작업함)
  - JDBC Driver : java.sql의 interface들을 상속하여 method의 몸체를 구현한 class file
- sql과 programming 언어의 통합 접근 중 한 형태
- java는 표준 interface인 JDBC API를 제공
- database vendor, 또는 기타 third party에서는 JDBC interface를 구현한 driver를 제공
  - vender : an entity that offers one or more databases to customers for license or sale
- 단점
  - DB에서 정보를 가져올 때마다 DB connection, disconnection을 해야함
  - 이로써 서버 과부하, 속도 저하 등의 문제가 있음 (그래서 JNDI를 사용)

# JDBC를 이용한 programming 방법

1. import java.sql.*;
2. driver load
  - Class.forName() : driver를 load
  - DriverManager : load된 driver를 통해서 Connection을 활성화해주는 객체
3. Connection 객체를 생성
  - Connection : database와의 연결
4. Statement 객체를 생성 및 질의 수행
  - Statement : SQL을 실행하는 객체
5. sql문에 결과물이 잇다면 ResultSet 객체를 생성
  - ResultSet : SQL문 실행 후 data를 받는 객체
6. 모든 객체 닫기

# JDBC class의 생성 관계

1. DriverManager를 이용해서 Connection instance 얻기
2. Connection을 통해서 Statement 얻기
3. Statement를 이용해 ResultSet 얻기

# JDBC 단계별 사용

1. import
```java
import java.sql.*;
```
2. driver load
```java
Class.forName("com.mysql.jdbc.Driver");
```
3. Connection 얻기
```java
String dburl = "jdbc:mysql://localhost/dbName";
Connection connection = DriverManager.getConnection(dburl, ID, PWD);
```
4. Statement 생성
```java
Statement statement = connection.createStatement();
```
5. 질의 수행 & ResultSet으로 결과 받기
```java
ResultSet resultSet = statement.executeQuery("select no from user");
while (resultSet.next()) {
	System.out.println( resultSet.getInt( "no") );
}
```
6. close
```java
resultSet.close();
statement.close();
connection.close();
```

# Statement & PreparedStatement

- SQL Query문 전송 시 사용하는 객체
- java는 주로 web 개발을 위해서 사용되는데, web 개발에서는 보안문제(SQL injection)때문에 PreparedStatement를 사용
- Statement
  - SQL문을 실행할 때마다 SQL을 매번 구문을 새로 작성하고 해석해야해서 overhead가 있음
    - ex) Spring sql = "insert customer (name, age) values('" + name + "', " + age + "')";
- PreparedStatement
  - 선처리 방식 사용 (준비된 statement)
  - SQL문을 미리 준비해놓고 binding 변수 (? 연산자)를 사용해서 반복되는 비슷한 SQL문을 쉽게 처리
    - ex) Spring sql = "insert customer (name, age) values(?, ?)"; pstmt.setString(1, name); pstmt.setInt(2, age);
  - 사용하기 적절한 경우
    - Dynamic SQL을 사용할 때 : Dynamic SQL을 사용한다면 매번 조건절이 달라지므로 statement가 적절
- query 실행 순서 : query 문장 분석 -> compile -> 실행
  - Statement를 사용하면 매번 query를 수행할 때마다 모든 실행 단계를 거침
  - PreparedStatement를 사용하면 처음 한 번만 세 단계를 cache에 담아 재사용함
  - 따라서, 반복적으로 query를 수행해야한다면 PreparedStatement가 성능이 더 좋음
  - 사용하기 적절한 경우
    - 사용자 입력값으로 query를 생성할 때
    - query 반복 수행 작업인 경우
- 두 class의 주요 method
  |Statement|PreparedStatement|
  |---|---|
  |ResultSet executeQuery(String sql) : select|ResultSet executeQuery(String sql) : select|
  |int executeUpdate(String sql) : insert, update, delete|int executeUpdate(String sql) : insert, update, delete|
  ||void setXXX(int index, ...) : ?에 binding 시킬 변수를 data type에 맞게 설정|

---

# Reference
- https://hzoou.tistory.com/64
- https://itlaw.wikia.org/wiki/Database_vendor
- https://ss-o.tistory.com/132
