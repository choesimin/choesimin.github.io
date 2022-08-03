# Servlet

- client의 요청을 처리하고, 그 결과를 반환하는 servlet class의 구현 규칙을 지킨 java web programming 기술
- java를 사용하여 web을 만들기위해 필요한 기술

## Servlet 특징

- client의 요청에 대해 동적으로 작동하는 web application component
- html을 사용하여 요청에 응답
- java thread를 이용하여 동작
- MVC pattern에서 controller로 이용됨
- http protocol service를 지원하는 javax.servlet.http.HttpServlet class를 상속받음
- UDP보다 처리 속도가 늦음
- html 변경 시, servlet을 다시 complie해야 하는 단점

## Servlet 동작 방식

1. client가 url을 입력하면 http request가 servlet container로 전송됨
2. 요청을 받은 servlet container는 HttpServletRequest, HttpServletResponse 객체 생성
3. web.xml을 기반으로 사용자가 요청한 url이 어느 servlet에 대한 요청인지 찾음
4. 해당 servlet에서 service method를 호출한 후, client의 get, post 여부에 따라 doGet() or doPost()를 호출
5. doGet() or doPost() method는 동적 page를 생성한 후, HttpServletResponse 객체에 응답을 보냄
6. 응답이 끝나면 HttpServletRequest, HttpServletResponse 두 객체를 소멸시킴

## Servlet Container

- servlet을 관리해주는 container
- server에 servlet을 만들었다해서 스스로 작동하는 것이 아니기 때문에, servlet을 관리해주는 역할을 함
- servlet이 어떤 역할을 수행하는 정의서라고 보면, servlet container는 그 정의서를 보고 수행한다고 볼 수 있음
- client의 요청을 받아주고 응답할 수 있게 web server와 socket으로 통신
    - ex) tomcat (실제로 web server와 통신하여 jsp와 servlet이 작동하는 환경을 제공)

## Servlet Container의 역할

- web server와의 통신 지원
    - servlet과 손쉽게 통신할 수 있게 해줌
    - 만약 없었다면 socket을 만들고 listen, accept 등을 해야함
    - servlet container는 이런 기능을 API로 제공하여 복잡한 과정을 생략할 수 있도록 함
- Servlet Life Cycle 관리
    - servlet container는 servlet의 탄생과 죽음을 관리
    - servlet class를 loading하여 instance화 하고, 초기화 method를 호출하고, 요청이 들어오면 적절한 servlet method를 호출
    - servlet이 생명을 다 한 순간에는 적절하게 garbage collection을 진행하여 편의 제공
- Multi Thread 지원 및 관리
    - servlet container는 요청이 올 때마다 새로운 java thread를 하나 생성
    - http service method를 실행하고나면, thread는 자동으로 죽게 됨
    - 원래는 thread를 관리해야하지만, server가 다중 thread를 생성 및 운영해줌
        - thread의 안정성에 대해 걱정하지 않아도 됨
- 선언적인 보안 관리
    - servlet container를 사용하면 개발자가 보안에 관련된 내용을 servlet 또는 java class에 구현해놓지 않아도 됨
    - 일반적으로 보안 관리는 xml 배포 서술자에 기록하므로, 보안에 대해 수정할 일이 생겨도 java source code를 수정하여 다시 compile하지 않아도 보안 관리가 가능

## Servlet의 생명주기

1. client의 요청이 들어오면 container는 해당 servlet이 memory에 있는지 확인하고, 없을 경우 init() method를 호출하여 적재
    - init() method는 처음 한 번만 실행되기 때문에, servlet의 thread에서 공통적으로 사용해야하는 것이 있다면, overriding하여 구현하면 됨
    - 실행 중 servlet이 변경될 경우, 기존 servlet을 파괴하고 init() method를 통해 새로운 내용을 다시 memory에 적재
2. init() method가 호출된 후, client의 요청에 따라서 service() method를 통해 요청에 대한 응답이 doGet()과 doPost()로 분기됨
    - 이 때, servlet container가 client의 요청이 오면 가장 먼저 처리하는 과정으로 생성된 HttpServletRequest, HttpServletResponse에 의해 request와 response 객체가 제공됨
3. container가 servlet에 종료 요청을 하면 destroy() method가 호출됨
    - init() method와 마찬가지로 한 번만 실행됨
    - 종료 시에 처리해야하는 작업들은 destroy() method를 overriding하여 구현

---

# JSP (Java Server Page)

- java code가 들어가있는 html code
- servlet은 java source code 속에 html source code가 들어가는 형태
- jsp는 servlet과 반대로 html source code 속에 java source code가 들어가는 구조
- <% source code %>, <%= source code %> 형태로 들어감
    - 이 부분은 web browser로 보내는 것이 아니라, web server에서 실행되는 부분
- compile과 같은 과정을 할 필요 없이, jsp page를 작성하여 web server의 directory에 추가만하면 사용이 가능
- 결과적으로 jsp는 WAS(Web Application Server)에 의해 servlet class로 변환되어 사용됨

## JSP 동작 구조

1. web server가 사용자로부터 servlet에 대한 요청을 받으면, servlet container에 그 요청을 넘김
2. 요청을 받은 container는 http request와 http response 객체를 만들어 이들을 통해 servlet의 doPost()나 doGet() method 중 하나를 호출
    - 만약 servlet만 사용하여 요청한 web page를 보여주려면 out 객체의 println method를 사용하여 html문서를 작성해야 함
    - 이는 추가/수정을 어렵게 하고, 가독성을 떨어뜨리기 때문에, jsp를 사용하여 business logic과 presentation logic을 분리
3. servlet은 data의 입력, 수정 등에 대한 제어를 jsp에게 넘겨서 presentation logic을 수행한 후, container에게 response를 전달
4. 이렇게 만들어진 결과물은 사용자가 해당 page를 요청하면 compile이 되어 java file을 통해 .class file이 만들어지고, 두 logic이 결합되어 class화 됨
    - out 객체의 println method를 사용해서 구현해야하는 번거로움을 jsp가 대신 수행해주는 것

---

# Reference

- https://mangkyu.tistory.com/14
