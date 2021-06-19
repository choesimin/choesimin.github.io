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
- 모두 loading하고 화면을 띄우기 때문에 한번에 완성된 화면을 보여줌
	- 원래는 HTML, CSS, javascript file 따로따로 loading해서 완전한 화면이 한번에 나오지 않는 경우가 있음
	- 환성된 화면을 만들고 띄워야하기 때문에 약간 느리다는 단점
- vue는 기본적으로 javascript 객체를 vue instance data option으로 정의할 때, 모든 속성들을 Object.defineProperty를 사용하여 Getter/Setter로 변환
	- ES5에서 새로 등장한 기능으로 하위 호환이 불가능
	- 따라서, IE8 이하를 지원하지 않음
---




# MVVM Pattern
- Model - View - ViewModel
	- View : user interface
		- <div id="simple"> <h2> {{message}} </h2> </div>
	- View Model : 상태와 연산
		- var simple = new Vue({ ... })
	- Model : domain 특화 data
		- var model = { message: "..." }
- logic과 UI의 분리를 위해 설계된 pattern
- web page는 dom과 javascript로 만들어지게 되는데, dom이 view 역할을 하고, javascript가 model 역할을 함
- ViewModel이 없는 경우에는 직접 model과 view를 연결해야 함
	- 그러나 ViewModel이 중간에서 연결해주는 것이 MVVM임
---




# 가상dom (Virtual DOM)
- dom 요소가 많아지면 javascript로 돔을 handling하는 일이 무거워짐
- 그래서 dom과 비슷한 구조로 javascript를 만듬
- 이것은 진짜 dom과는 달리 memory에 올라가있는 것이기 때문에 비교적 매우 빠른 성능을 보임
- vue.js가 가상dom을 수정하면 dom을 수정하는 것보다 빠름
- vue는 가상dom이 변경될 때마다 진짜 dom과 비교해서 차이를 찾고 차이난 부분의 dom만 수정하는 작동을 하게 됨
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




# Commands
- npm install -g vue-cli
	- vue-cli 전역 설치, 권한 error시 sudo 추가
	- 3.x version인 경우
		- npm install -g @vue/cli-init
			- 2.x template을 가져오기 위한 vue init 기능 제공
- vue init [template-name] [proejct-name]
	- vue.js가 2.xx version인 경우 project 생성
		- ex) vue init webpack my-project
- vue create [project-name]
	- vue.js가 3.xx version인 경우 project 생성
- npm run dev
	- vue server 실행
	- 'http://localhost:8080'으로 접속 가능
---




# Directive
- v-text, {{ }}
	- innerText 속성에 연결됨
	- tag 문자열을 HTML encoding하여 나타내기 대문에 tag 문자열이 그대로 나타남
- v-html
	- innerHTML 속성에 연결됨
	- tag 문자열을 parsing하여 화면에 나타냄
	- <script> tag도 그대로 binding함
		- XSS(Cross Site Scripting) 공격 등에 취약
		- 따라서 꼭 필요한 경우가 아니라면 v-text를 사용하는 것이 더 안전
- v-bind
	- 요소(Element) 객체의 속성들의 바인딩하기 위해 사용
		- 요소의 content 영역(시작 tag와 종료 tag 사이의 영역)을 설정하는 것이 아님
	- v-bind directive를 매번 작성하는 것이 부담스럽다면?
		- v-bind:src에서 v-vind를 생략하고 :src와 같이 작성해도 됨
	- 연산 logic이 필요한 경우
		- 계산형 속성(computed property) 사용
		- Vue 객체를 만들 때 computed라는 속성과 함께 함수를 등록해두면 마치 속성처럼 이용할 수 있음
		- example
			```javascript
			var vmSum = new Vue({
				el : "#example",
				data : { num : 0 },
				computed : {
					sum : function() {
						var n = Number(this.num);
						if (Number.isNaN(n) || n < 1)  return 0;
						return ((1+n) * n) / 2;
					}
				}
			});
			```
- v-model
	- HTML 요소에서 값을 변경하면 model 객체의 값이 바뀜
- v-show, v-if, v-else, v-else-if
	- v-if : vue 객체의 data 속성 값에 따라 rendering 여부를 결정할 수 있는 기능
	- v-if vs v-show
		- v-if directive는 조건에 부합되지 않으면 rendering을 하지 않음	
		- v-show는 일단 HTML 요소를 rendering한 후에 display style 속성으로 화면에 보여줄지 결정
			- 조건에 부합하지 않으면 display none으로 처리
		- 자주 화면이 변경되는 부분에 대해서는 v-if directive보다는 v-show directive를 사용하는 것이 좋음
- v-for
	- 반복 rendering directive : for문의 기능을 함
	- 원본 data가 어떤 형식인가에 따라 사용 방법이 조금씩 달라짐
		- 배열 또는 유사 배열인 경우
			- 배열에서 하나씩 data를 꺼내서 변수에 할당하며 반복
		- 객체인 경우
			- key를 이용해 값에 접근하는 HashMap 구조이기 때문에 Key, Value를 얻어낼 수 있는 구조 사용
	- v-for directive와 v-if directive의 적용 순서
		- v-for directive가 먼저 실행되고 v-if directive가 적용됨
	- 여러 요소의 group을 반복 rendering하는 경우
		- <template> tag 사용
- v-pre
	- v-pre는 HTML요소에 대한 compile을 수행하지 않음
	- template 문자열을 compile하지 않고 그대로 내보내기 위해 사용
	- ex) <span v-pre>{{message}}</span>
- v-once
	- HTML 요소를 단 한 번만 rendering하도록 설정
	- ex) <span v-once>{{message}}</span>
	- Vue instance의 data를 변경하더라도 다시 rendering을 수행하지 않음
		- 초기값이 주어지면 변경되지 않는 UI를 만들 때 사용
- v-cloak
	- 화면 초기에 compile되지 않은 template은 나타나지 않도록 할 수 있음
	- v-for directive를 이용해 많은 data를 출력하거나 할 때에 {{}} 표현식이 화면에 일시적으로 나타나는 경우가 있음
		- 이것은 Vue instance가 el option의 template을 compile할 때 발생하는 시간 때문에 일어나는 현상
		- 복잡한 UI일수록 이런 경우가 빈번하게 발생
		- 이 때, v-cloak 사용 가능
- v-on
	- input event나 keyup event등의 처리를 수행할 수 있게 해줌
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
