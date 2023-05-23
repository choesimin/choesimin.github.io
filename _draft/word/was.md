---
layout: note
---

# WAS

- Web Application Server
- DB 조회나 다양한 logic 처리를 요구하는 동적인 contents를 제공하기 위해 만들어진 application server
- HTTP를 통해 computer나 창치에 application을 수행해주는 middleware(software engine)
- "Web Container" 혹은 "Servlet Container"라고도 불림
    - Container : JSP, Servlet을 실행시킬 수 있는 software
    - 즉, WAS는 JSP, Servlet 구동 환경을 제공
- ex) Tomcat, JBoss, Jeus, Web Sphere 등

## WAS의 역할

- WAS = web server + Web Container
- web server 기능들을 구조적으로 분리하여 처리하고자하는 목적으로 제시됨
    - 분산 tracsaction, 보안, messaging, thread 처리 등의 기능을 처리하는 분산 환경에서 사용됨
    - 주로 DB server와 같이 수행됨
- WAS가 가지고 있는 web server도 정적인 contents 처리에 있어 성능상 큰 차이가 없음

## WAS의 주요 기능

1. program 실행 환경과 DB 접속 기능 제공
2. 여려 개의 transaction(논리적인 작업 단위) 관리 기능
3. 업무를 처리하는 business logic 수행

## web server와 WAS를 구분하는 이유

- 자원 이용의 효율성 및 장애 극복, 배포 및 유지보수의 편의성을 위해 web server와 WAS를 분리
    - web server를 WAS 앞에 두고 필요한 WAS들을 web server에 plugin 형태로 설정하면 더욱 효율적인 분산 처리 가능
- web server가 필요한 이유
    - web server에서는 static contents만 처리하도록 기능을 분배하여 server의 부담을 줄일 수 있음
        - image file과 같은 정적인 file들을 web 문서(HTML 문서)가 client로 보내질 때 함께 가는 것이 아님
        - client는 HTML 문설르 먼저 받고 그에 맞게 필요한 image file들을 다시 server로 요청하면 그때서야 image file을 받아옴
        - web server를 통해 정적인 file들을 Application Server까지 가지 않고 앞단에서 빠르게 보내줄 수 있음
- WAS가 필요한 이유
    - WAS를 통해 요청에 맞는 data를 DB에서 가져와 business logic에 맞게 그때그때 결과를 만들어 제공함으로써 자원을 효율적으로 사용할 수 있음
        - web page에는 static contents와 dynamic contents가 모두 존재
        - 사용자의 요청에 맞게 적절한 dynamic contents를 만들어서 제공해야함
        - 이 때, web server만을 이용한다면 사용자가 원하는 요청에 대한 결과값을 모두 미리 만들어 놓고 service해야 함
        - 이렇게 수행하면 자원이 부족해짐
- WAS가 web server의 기능도 모두 수행하지 않는 이유
    1. 기능을 분리하여 server 부하 방지
        - WAS는 DB 조회나 다양한 logic을 처리하느라 바쁘기 때문에 단손한 static contents는 web server에서 빠르게 client에 제공하는 것이 좋음
        - WAS는 기본적으로 dynamic contents를 제공하기 위해 존재하는 server
            - static contents 요청까지 WAS가 처리한다면? -> 정적 data 처리로 인해 부하가 커지게 됨 -> dynamic contents의 처리가 지연됨에 따라 수행 속도가 느려짐 -> page 노출 시간이 늘어남
    2. 물리적으로 분리하여 보안 강화
        - SSL에 대한 암복호화 처리에 web server를 사용
    3. 여러 대의 WAS를 연결 가능
        - load balancing을 위해서 web server를 사용
        - fail over(장애 극복), fail back 처리에 유리
        - 대용량 web application의 경우(여러 개의 server 사용) web server와 WAS를 분리하여 무중단 운영을 위한 장애 극복에 쉽게 대응 가능
            - 예를 들어, 앞 단의 web server에서 오류가 발생한 WAS를 이용하지 못하도록 한 후 WAS를 재시작함으로써 사용자는 오류를 알아채지 못하고 이용할 수 있음
    4. 여러 web application service 가능
        - 하나의 server에서 PHP application과 java application을 함께 사용하는 경우
    5. 기타
        - 접근 허용 IP 관리, 2대 이상의 server에서의 session 관리 등도 web server에서 처리하면 효율적

## Web Service Architecture

1. client -> web server -> DB
2. client -> WAS -> DB
3. client -> web server -> WAS -> DB
    1. web server는 web browser client로부터 HTTP 요청을 받음
    2. web server는 client의 요청(request)을 WAS에 보냄
    3. WAS는 관련된 servlet을 memory에 올림
    4. WAS는 web.xml을 참조하여 해당 servlet에 대한 thread를 생성
        - thread pool 이용
    5. HttpServletRequest와 HttpServletResponse 객체 생성하고 servlet에 전달
        1. thread는 servlet의 service() method 호출
        2. service() method는 요청에 맞게 doGet() 또는 doPost() method 호출
            - protected do Get(HttpServletRequest request, HttpServletResponse response)
    6. doGet() 또는 doPost() method는 인자에 맞게 생성된 적절한 동적 page를 Response 객체에 담아 WAS에 전달
    7. WAS는 Response 객체를 HttpResponse 형태로 바꾸어 web server에 전달
    8. 생성된 thread를 종료하고, HttpServletRequest와 HttpServletResponse 객체 제거

---

# Reference

- https://gmlwjd9405.github.io/2018/10/27/webserver-vs-was.html
