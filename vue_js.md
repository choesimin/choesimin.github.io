#Vue.js
- Evan You가 만들었으며, 2014년 release를 시작
- controller 대신 view model을 가지는 MVVM(Model-View-ViewModel) pattern을 기반으로 design됨
- Template과 Component를 사용하여 재사용이 가능한 사용자 interface를 묶고 view layer를 정리하여 사용
- front-end와 back-end의 개발을 나누고 하나의 view file을 재사용할 수 있음
	- 계속 추가되는 javaScript code와 화면으로 무거워지는 system을 관리하기 위함
- 다른 framework와 달리 유연하고 가벼움
	- 또한 비교적 쉽게 배울 수 있음
- 일부 화면만 적용하는 것이 가능
- SPA(Single Page Application)개발 지원
- 간단한 vue project는 script tag로 등록하여 별도의 변환작업 없이 사용할 수 있음
- vue-router를 이용하여 SPA를 개발 가능
- 특징
	- Approachable : 접근성이 좋음
	- Versatile : 가변성이 있음 = 다재다능하며, 여기저기 적용하기 좋음
	- Perfomant : 성능이 좋음
	- Maintainable : 유지보수가 좋음
	- Testable : test 가능
---




# 호환성
- vue는 기본적으로 javascript 객체를 vue instance data option으로 정의할 때, 모든 속성들을 Object.defineProperty를 사용하여 Getter/Setter로 변환
	- ES5에서 새로 등장한 기능으로 하위 호환이 불가능
	- 따라서, IE8 이하를 지원하지 않음
---




# MVVM Pattern
- Model - View - ViewModel
- logic과 UI의 분리를 위해 설계된 pattern
- web page는 dom과 javascript로 만들어지게 되는데, dom이 view 역할을 하고, javascript가 model 역할을 함
- ViewModel이 없는 경우에는 직접 model과 view를 연결해야 함
	- 그러나 ViewModel이 중간에서 연결해주는 것이 MVVM임
---




# 가상돔 (Virtual DOM)
- dom 요소가 많아지면 javascript로 돔을 handling하는 일이 무거워짐
- 그래서 돔과 비슷한 구조로 javascript를 만듬
- 이것은 진짜 돔과는 달리 memory에 올라가있는 것이기 때문에 비교적 매우 빠른 성능을 보임
- vue.js가 가상 돔을 수정하면 돔을 수정하는 것보다 빠름
- vue는 가상돔이 변경될 대마다 진짜 돔과 비교해서 차이를 찾고 차이난 부분의 돔만 수정하는 작동을 하게 됨
---




# Component
- 화면에 비춰지는 view의 단위를 쪼개어 재활용이 가능한 형태로 관리하는 것
- vue에서 component는 미리 정의된 option을 가진 viw instance
- 전역 등록과 지역 등록이 존재
- component.vue = HTML + JS + CSS
---




# 생명주기 (Lifecycle)
1. creation : component 초기화 단계
2. mounting : dom 작성 단계
3. updating : 상태 변와로 인한 rendering 단계
4. destruction : 소멸 상태
---




# Vue Instance
- new Vue로 선언하여 만들어진 객체를 vue instance라고 부름
	- el : tag에 지정한 ID, class name, tag name으로 해당 tag와 vue instance를 연결하는 option
	- data : kay와 value를 지정하는 json 형식으로 data 입력 option
	- computed : getter/setter를 지정하는 option
---




# 설치
- npm install -g vue-cli
	- vue-cli 전역 설치, 권한 error시 sudo 추가
	- 3.x version인 경우
		- npm install -g @vue/cli-init
			- 2.x template을 가져오기 위한 vue init 기능 제공
---




# Project 생성
- vue.js가 2.xx version인 경우
	- vue init [template-name] [proejct-name]
		- ex) vue init webpack my-project
- vue.js가 3.xx version인 경우
	- vue create [project-name]
---




# References
- https://wikidocs.net/17653
- https://kr.vuejs.org/v2/guide/installation.html
- https://cli.vuejs.org/guide/
	- Vue CLI Guide
- https://medium.com/witinweb/vue-cli-로-vue-js-시작하기-browserify-webpack-22582202cd52
	- vue cli로 시작하기
- https://blog.metafor.kr/201
	- vue create [project]와 vue init webpack [project]의 차이
- Quick Start Vue.js - 원형섭 지음
	- https://github.com/stepanowon/vuejs_book_2nd
		- example code
- https://velog.io/@leyuri/Vue.js-프로젝트-구성-방법
	- vue 처음 시작 쉽게 설명된 곳
