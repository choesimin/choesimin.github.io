# JNDI
- Java Naming and Directory Interface
- java programming 언어를 사용하여 작성된 application에 이름 지정 및 directory 기증을 제공하는 API(Application Programming Interface)
- database와 연결된 connection을 미리 만들어서 저장해두고 있다가 필요할 때 저장된 공간(pool)에서 가져다 쓰고 반환하는 기법
	- connection pool을 이용하면 connection을 미리 만들어두고 사용하기 때문에 "driver load -> connection 객체 생성 -> connection 객체 종료"의 작업을 매번 할 필요 없음
	- database의 부하 감소
	- 자원의 효율적인 관리
---




# JNDI 조회 밎 관련 참조
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




# References
- https://docs.oracle.com/cd/E19823-01/819-1552/jndi.html
- https://technet.tmaxsoft.com/upload/download/online/jeus/pver-20170202-000001/server/chapter_jndi.html
- https://badstorage.tistory.com/5
- https://itworldyo.tistory.com/16