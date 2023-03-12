---
layout: note
---

# Tomcat

- HTTP(HyperText Transfer Protocol) server
- Java EE Container의 기능을 포함한 Web Application Server (WAS)
    - Servlet container의 역할을 함
        - Java Servlet을 실행하고 JSP(JavaServer Pages) 및 JSF(JavaServerFaces)를 Java Servlet으로 변환할 수 있음

## 핵심 단위 module (Core Component)

- Catalina : Servet Container : Java EE Container. Servlet-JSP Processing (Realm)
- Coyote : HTTP 1.1 protocol Web Server : Web Browser 와 Server 간의 HTTP 통신(Req/Res)을 담당
- Jasper : JSP Engine : JSP의 실행/해석
- Cluster : Load-Balancing, Session-Clustering

## Architecture

- Request 요청 시 Valve를 통해 'Server → Service → Engine → Host → Context → Wrapper' 순서로 거쳐서 Servet/JSP 가 실행됨
- /component
    - Server : Server = Catalina = Tomcat Instance
    - Context : Web Application (webapps)
    - Listeners : Tomcat Lifecycle Action
    - Manager : Http Session Manager
    - Logger : JULI
    - Valve : Container Request Processing (Pipeline)

## Folder

- bin : Tomcat binary와 시작 script
    - catalina 
        - startup.sh나, shutdown.sh을 실행하게 되면 내부적으로 catalina가 실행됨
            - tomcat을 실행 및 정지함
    - startup : 실행. 내부적으로 catalina.bat를 실행
    - shutdown : 정지. 내부적으로 catalina.bat를 실행
- conf : webapps 에 적용하는 전역 설정
    - 정책 file (Policy File) : catalina.policy
    - 등록 정보 file (Properties File) : catalina.properties, logging.properties
    - 구성 file (Configuration XML File)
        - server.xml (Tomcat 주 설정 file)
            -  server 설정 : connection 이름, host 이름, port 번호 등
        - web.xml (web application 배포 descriptors)
            - 가장 먼저 읽는 file
            - DefaultServlet 지정 및 Servlet-mapping
        - context.xml (global Tomcat-specific configuration)
            - WEB-INF/web.xml 을 읽도록 설정되어 있음
        - tomcat-users.xml (인증 및 접근 제어를 위한 user/password/권한 database
- lib : tomcat에서 사용하는 jar file 모음
- log
    - engine log : Catalina.{yyyy-mm-dd}.log
    - host log : localhost.{yyyy-mm-dd}.log
    - 그외 application log : manger and host-manager , Accescc log
- webapps : 기본 directory (localhost)
- work : compile된 file
- temp : tomcat이 실행되는 동안 임시 file 위치

## Configuration (/conf)

### Main Configuration File : server.xml

- server.xml은 tomcat의 주설정 file로 접근/접속에 관한 설정이 주 이룸
- 설치 시 <CATALINA_HOME>의 경로가 됨
- 설정할 수 있는 항목
    - Server port
    - Listener
    - Global Naming Resources : JNDI(Java Naming and Directory Interface) 정의
    - Services Name
    - Connectoer
    - Containers
    - Engine
    - Realm
    - Host
    - Cluster
    - Valve

### Other Configuration Files : web.xml, context.xml, tomcat-users.xml

- Sub 설정 file
- web.xml
    - URI 요청 시 어떤 식으로 반응할지에 대한 설정이 주를 이룸
    - tomcat 내에 2개 존재함
        - <CATALINA_HOME>\conf\web.xml : 전역 설정
            - directory 목록 : url 접근시 directory 목록의 사용 여부 설정
            - welcome page 설정 : url 접근 시 사용할 첫 page 설정
            - 자동 servlet reload : servlet이 다시 compile 되었을 때 자동으로 reload할지 여부 설정
            - 특정 Webaapp 에 대한 directory 목록 사용 설정
            - web context root directory 및 요청 URL 설정
            - 기본 webapps directory 변경
        - ContextRoot\WEB-INF\web.xml : 지역 설정

## 배포, 실행 방법

- (mybatis를 사용하는 경우) server.xml, context.xml에 dataSource 설정하기
- webapps에 ROOT.war 넣기
- bin/startup.sh : 가동
- bin/shutdown.sh : 정지

## Tomcat 10 Error : javax.servlet.ServletContextListener ClassNotFoundException

- Tomcat 10을 사용하려면 servlet-api dependency에 javax가 아닌 jakarta를 사용해야 함 (JavaEE -> JakartaEE)
- Spring 5는 JakartaEE보다 JavaEE가 환경 설정이 수월함
- 조합
    - Tomcat 9 + Spring 5 + JavaEE
    - Tomcat 10 + Spring 6 + JakartaEE

---

# Reference

- https://cassandra.tistory.com/4
    - Tomcat이란
- https://m.blog.naver.com/goddlaek/220937395931
    - context 설정
- https://stackoverflow.com/questions/66711660/tomcat-10-x-throws-java-lang-noclassdeffounderror-on-javax-servlet
    - java.lang.ClassNotFoundException: javax.servlet.ServletContextListener
