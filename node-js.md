# Node.js

- 공식 site에서 내린 Node.js의 정의 
  - "Node.js는 Chrome V8 JavaScript Engine으로 build된 JavaScript Runtime입니다. Node.js는 event 기반, non-blocking I/O model을 사용해 가볍고 효율적이빈다. Node.js의 package 생태계인 npm은 세계에서 가장 큰 open source library 생태계이기도 합니다."
- javascript runtime이 browser 밖에 존재하지 않았으나, 그 한계를 극복하고 Node.js가 나옴

## 특징

- Google V8 javascript engine
- 고성능 network server
- 단일 thread(single thread) event loop 기반
- 비동기 I/O 처리(non-blocking I/O)
- javascript
- 개발 생산성 향상
- 방대한 module 제공 (NPM)

## thread 기반 동기 방식 & single thread event loop 기반 비동기 방식

- thread 기반 동기 방식 (blocking I/O)
  - 하나의 thread가 request를 받으면 모든 처리가 완료될 때까지 기다리다가 처리 결과가 완료되면 다시 응답을 보냄
  - 기존 업무 처리가 완료되기 전에 또 다른 request가 있으면 새로운 thread가 업무를 처리함
  - 동시 request가 많은 경우 많은 thread가 필요하게 되어 서버 과부하
- single thread event loop 기반 비동기 방식 (non-blocking i/o)
  - 하나의 thread가 request를 받으면 바로 다음 처리에 요청을 보내놓고 다른 작업을 처리하다가 먼저 요청한 작업이 끝나면 event를 받아서 응답을 보냄
  - 동시 request가 오더라도 처리가 완료될 때까지 기다리지 않아도 되기 때문에 server 부하가 적음

## advantage

- javascript를 동일하게 사용해서 server단 logic을 처리할 수 있음
  - front-end 개발자의 경우, 새로운 언어를 습득하지 않도고 javascript를 활용해 server 구현 가능
- 가벼움
  - local에서 server만 켜봐도 얼마나 가볍게 돌아가는지 알 수 있음 (확연한 차이)
- 개발이 빠르고 쉬움
  - server install부터 화면 띄우기까지 금방 처리 됨
- non-blocking I/O와 single thread event loop를 통한 높은 처리 성능
- event 기반 비동기 방식이기 때문에 server 무리가 적음
  - java(JSP)는 thread에 의한 동기 방식이기 때문에 요청이 오면 반드시 결과를 받은 후에 다음 logic이 처리될 수 있음
- NPM;Node Package Manager을  통한 다양한 module(package) 제공
  - NPM을 이용해 자신이 필요한 library와 package를 검색해서 설치할 수 있기 때문에 개발 속도와 효율성이 크게 향상됨

## disadvantage

- event 기반 비동기 방식이라 server단 logic이 복잡한 경우 callback 함수의 늪에 빠질 수 있음
  - 한번에 요청에 대해 DB에서 조회한 결과값에 따라 다른 logic을 처리해야 할 때, 이런 logic이 여러 개인 경우 callback 함수 늪(callback hell)에 빠짐
- code를 순차적으로 실행하는 것이 아니라 비동기 방식으로 event를 보내고, 응답(event)이 오면 처리하는 방식이기 때문에, java 개발 방식으로 설계하고 programming하면 큰 문제 발생
- single thread이기 때문에 하나의 작업 자체가 오래 걸리는 web service에는 어울리지 않음
  - 게시판 형태와 같이 가벼운 I/O가 많은 web service에 어울림
- code가 수행되어야 code에 error가 있는지 알 수 있으며, error가 날 경우 process가 내려가기 때문에 test가 굉장히 중요
  - 반드시 모든 case에 대해 source code를 검증해야함

## Node.js가 어울리는 web service

- simple logic
- 대용량 : 동시에 여러 request를 처리
- 빠른 응답 시간 요구
- 빠른 개발 요구
- 비동기 방식에 어울리는 service : network streaming service, chatting service 등

## Node.js가 어울리지 않는 web service

- 단일 처리가 오래 걸리는 경우 : single thread이기 때문
- server check logic이 많은 경우 : 비동기 방식이기 때문에 callback hell에 빠질 수 있음
- 업무 복잡도/난이도 높은 경우 : error가 나면 server가 죽기 때문에 code 품질 필요

---

# Reference

- https://junspapa-itdev.tistory.com/3
- https://perfectacle.github.io/2017/06/18/what-is-node-js/
  - Node.js의 오해


