# JDBC (Java DataBase Connectivity)
- java를 이용한 database 접속과 sql 문장의 실행, 그리고 실행 결과로 얻어진 data의 handling을 제공하는 방법과 절차에 관한 규약
- java program 내에서 sql 문을 실행하기 위한 java API
- sql과 programming 언어의 통합 접근 중 한 형태
- java는 표준 interface인 JDBC API를 제공
- database vendor, 또는 기타 third party에서는 JDBC interface를 구현한 driver를 제공
	- vender : an entity that offers one or more databases to customers for license or sale
---




# JDBC 환경 구성
- JDK 설치
- JDBC Driver 설치
- Maven에 다음과 같은 의존성을 추가
	- MySQL 사이트에서 다운로드
---




# JDBC를 이용한 programming 방법
1. import java.sql.*;
2. driver load
3. Connection 객체를 생성
4. Statement 객체를 생성 및 질의 수행
5. sql문에 결과물이 잇다면 ResultSet 객체를 생성
6. 모든 객체 닫기
---




# JDBC class의 생성 관계
1. DriverManager를 이용해서 Connection instance 얻기
2. Connection을 통해서 Statement 얻기
3. Statement를 이용해 ResultSet 얻기
---




# JDBC 단계별 사용
1. import
```
import java.sql.*;
```
2. driver load
```
Class.forName("com.mysql.jdbc.Driver");
```
3. Connection 얻기
```
String dburl = "jdbc:mysql://localhost/dbName";
Connection connection = DriverManager.getConnection(dburl, ID, PWD);
```
4. Statement 생성
```
Statement statement = connection.createStatement();
```
5. 질의 수행 & ResultSet으로 결과 받기
```
ResultSet resultSet = statement.executeQuery("select no from user");
while (resultSet.next()) {
	System.out.println( resultSet.getInt( "no") );
}
```
6. close
```
resultSet.();
statement.();
connection.close();
```
---




# References
- https://hzoou.tistory.com/64
- https://itlaw.wikia.org/wiki/Database_vendor
- https://ss-o.tistory.com/132
	- 이 참고 자료에 대한 내용 추가 필요