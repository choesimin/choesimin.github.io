# WAS
- Web Application Server
- DB 조회나 다양한 logic 처리를 요구하는 동적인 contents를 제공하기 위해 만들어진 application server
- HTTP를 통해 computer나 창치에 application을 수행해주는 middleware(software engine)
- "Web Container" 혹은 "Servlet Container"라고도 불림
	- Container : JSP, Servlet을 실행시킬 수 있는 software
	- 즉, WAS는 JSP, Servlet 구동 환경을 제공
- ex) Tomcat, JBoss, Jeus, Web Sphere 등
---




# WAS의 역할
- WAS = Web Server + Web Container
- Web Server 기능들을 구조적으로 분리하여 처리하고자하는 목적으로 제시됨
	- 분산 tracsaction, 보안, messaging, thread 처리 등의 기능을 처리하는 분산 환경에서 사용됨
	- 주로 DB server와 같이 수행됨
- WAS가 가지고 있는 Web Server도 정적인 contents 처리에 있어 성능상 큰 차이가 없음
---




# WAS의 주요 기능
1. program 실행 환경과 DB 접속 기능 제공
2. 여려 개의 transaction(논리적인 작업 단위) 관리 기능
3. 업무를 처리하는 business logic 수행
---




# Web Server와 WAS를 구분하는 이유
- Web Server가 필요한 이유
	- Web Server에서는 static contents만 처리하도록 기능을 분배하여 server의 부담을 줄일 수 있음
		- image file과 같은 정적인 file들을 web 문서(HTML 문서)가 client로 보내질 때 함께 가는 것이 아님
		- client는 HTML 문설르 먼저 받고 그에 맞게 필요한 image file들을 다시 server로 요청하면 그때서야 image file을 받아옴
		- Web Server를 통해 정적인 file들을 Application Server까지 가지 않고 앞단에서 빠르게 보내줄 수 있음
- WAS가 필요한 이유
	- WAS를 통해 요청에 맞는 data를 DB에서 가져와 business logic에 맞게 그때그때 결과를 만들어 제공함으로써 자원을 효율적으로 사용할 수 있음
		- web page에는 static contents와 dynamic contents가 모두 존재
		- 사용자의 요청에 맞게 적절한 dynamic contents를 만들어서 제공해야함
		- 이 때, Web Server만을 이용한다면 사용자가 원하는 요청에 대한 결과값을 모두 미리 만들어 놓고 service해야 함
		- 이렇게 수행하면 자원이 부족해짐
- WAS가 Web Server의 기능도 모두 수행하지 않는 이유
	- 기능을 분리하여 server 부하 방지
	- 작성 중.....................................











# References
- https://gmlwjd9405.github.io/2018/10/27/webserver-vs-was.html