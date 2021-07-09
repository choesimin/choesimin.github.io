# JNDI

- Java Naming and Directory Interface
- WAS 단에 database connection 객체를 미리 naming 해두는 방식
- database와 연결된 connection을 미리 만들어서 저장해두고 있다가 필요할 때 저장된 공간(pool)에서 가져다 쓰고 반환하는 기법
	- connection pool을 이용하면 connection을 미리 만들어두고 사용하기 때문에 "driver load -> connection 객체 생성 -> connection 객체 종료"의 작업을 매번 할 필요 없음
	- database의 부하 감소
	- 자원의 효율적인 관리
	- DBCP와 같은 기능 (JNDI는 제어를 편하게 할 수 있도록 발전된 형태)
- DB connection을 WAS 단에서 제어하면서 server에서 하나의 connection pool을 가짐
	- 공유 객체를 사용한다고 이해하면 됨
- application이 DB에 직접 connection을 요청하는 것이 아니라 JNDI lookup을 통해 Datasource 객체를 획득하고 그것으로 connection 요청
	- 이것이 일반 DBCP와 차이점
	- DB 설정 정보를 파악하기 쉬움
		- WAS 단에 설정 정보를 통해 DB가 몇 개 붙어있는지 정보 파악이 수월
	- DB connection pool을 효율적으로 사용 가능

### JNDI 조회 밎 관련 참조

|JNDI 조회 이름|관련 참조|
|---|---|
|java:comp/env|응용 program 환경 항목|
|java:comp/enb/jdbc|JDBC dataSource 자원 관리자 연결 factory|
|java:comp/env/ejb|EJB 참조|
|java:comp/UserTransaction|UserTransaction 참조|
|java:comp/env/mail|JavaMail session 연결 factory|
|java:comp/env/url|URL 연결 factory|
|java:comp/enb/jms|JMS 연결 factory 및 대상|
|java:comp/ORB|응용 program 구성 요소 간에 공유되는 ORB instance|

---

# How to

- Servers -> tomcat -> context.xml -> <context></context> 하단에 추가
```
<ResourceLink global="jdbc/XE"
	name="jdbc/XE"
	type="javax.sql.DataSource" />
```
- Servers -> tomcat -> server.xml -> <GlobalNamingResources></GlobalNamingResources> 하단에 추가
```
<Resource name="jdbc/XE"
	auth="Container"
	type="javax.sql.DataSource"
	driverClassName="oracle.jdbc.driver.OracleDriver"
	factory="org.apache.tomcat.dbcp.dbcp2.BasicDataSourceFactory"
	url="jdbc:oracle:thin:@localhost:1521:XE"
	username="스키마이름"
	password="스키마비밀번호"
	maxActive="20"
	maxIdle="10"
	maxWait="-1" />
```

---

# Reference

- https://docs.oracle.com/cd/E19823-01/819-1552/jndi.html
- https://technet.tmaxsoft.com/upload/download/online/jeus/pver-20170202-000001/server/chapter_jndi.html
- https://badstorage.tistory.com/5
- https://itworldyo.tistory.com/16
- https://ss-o.tistory.com/133
