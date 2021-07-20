# Jenkins

# pipeline 작성 방식

- Scripted와 Declarative 두 가지가 있음
  - 서로 호환되지 않아서 둘 중 하나로 통일하여 작성해야 함

### Scripted

- 장점
  - 더 많은 절차적인 code를 작성 가능
    - 더 다양한 작업을 생성할 수 있음
  - program 작성과 흡사
  - 기존 pipeline 문법이라 친숙하고 이전 version과 호환 가능
  - 필요한 경우 custom한 작업 생성이 가능하기 때문에 유연성 좋음
  - 보다 복잡한 workflow 및 pipeline modeling이 가능
- 단점
  - 일반적으로 더 많은 programming이 필요
    - 복잡하고 유지보수하기 더 힘듬
  - Groovy 언어 및 환경으로 제한된 구문 검사
  - 전통적인 Jenkins model과 맞지 않음
  - 같은 작업이라면 Declarative 문법보다 잠재적으로 더 복잡
- directive
  |Directive|설명|
  |--|--|
  |node|scripted pipeline을 실행하는 Jenkins agent. 최상단 선언 필요. Jenkins master-slave 구조에서는 parameter로 master-slave 정의 가능|
  |dir|명령을 수행할 directory/folder 정의|
  |stage|pipeline의 각 단계를 얘기하며, 해당 단계에서 어떤 작업을 실행할지 선언하는 곳 (== 작업의 본문)|
  |git|Git 원격 저장소에서 project clone|
  |sh|Unix 환경에서 실행할 명령어 실행 (Windows에서는 'bat')|
  |def|Groovy 변수 혹은 함수 선언 (javascript의 var같은 존재)|
- Node & Stage 간의 관계
  - Node > Stage > Step
  - Node
    - Stage
      - Step
      - Step
    - Stage
      - Step
      - Step
      - Step
    - ...
      - ...
- example
  ```groovy
  node {
    def hello = 'Hello jojoldu'  // 변수선언
    stage ('clone') {
      git 'https://github.com/simiin/example.git'  // git clone
    }
    dir ('sample') { // clone 받은 project 안의 sample directory에서 stage 실행
      stage ('sample/execute') {
        sh './execute.sh'
      }
    }
    stage ('print') {
      print(hello) // 함수 + 변수 사용
    }
  }

  // 함수 선언 (반환 type이 없기 때문에 void로 선언, 있다면 def로 선언하면 됨)
  void print(message) {
    echo "${message}"
  }
  ```
  ```groovy
  // try-catch 예시
  node {
    stage('Example') {
      try {
        sh 'exit 1'
      } catch (exc) {
        echo 'Something failed, I should sound the klaxons!'
        throw
      }
    }
  }
  ```

### Declarative

- Scripted보다 훨씬 간단하게 작성할 수 있는 방법
- Groovy Scrip에 친숙하지 않은 사용자를 위해 최근에 도입된 declarartive programming model
- 상대적으로 작성이 쉽고 가독성이 높은 편
- CI/CD pipeline이 단순한 경우에 적합하며 아직 많은 제약사항이 따름
  - Structure만 사용할 수 있기 때문
- derective
  |Directive|설명|
  |--|--|
  |pipeline|script 방식의 'node'대신 top에 위치. Jenkinsfile이 declarative pipeline 방식으로 작성되었음을 Jenkins에게 알려줌|
  |agent|bulid를 수행할 node 및 agent를 의미. any로 지정시 build 가능한 모든 agent 중 하나를 선택하여 build를 맡김. label을 설정하여 build할 agent를 따로 선택 가능|
  |stages|1개 이상의 stage를 포함한 block. 단 하나만 선언 가능|
  |stage|scripted 방식의 stage와 동일한 개념이나, task가 아닌 steps로 구성됨|
  |steps|하나의 stage에서 수행할 작업을 명시한 block|
- example
  ```
  pipeline {  // 최상단 element로 정의되어 있어야 한다.
    agent any  // pipeline black 내 최상단에 정의되어야 하며, 말 그대로 실행할 Agent가 할당됨. 여기서 'any'는 사용 가능한 어떠한 agent로도 실행해도 된다는 걸 나타냄. 이는 pipeline 아래 위치해도 되고 각 stage block에 위치해도 됨
    options {
        skipStagesAfterUnstable()
    }
    stages {
      stage('Build') {  // stage는 pipeline의 단계를 나타냄
        steps {  // 해당 stage에서 실행할 명령을 기술하는 부분
            sh 'make'  // 주어진 shell 명령을 수행
        }
      }
      stage('Test'){
        steps {
          sh 'make check'
          junit 'reports/**/*.xml'  // junit plugin을 통해 제공하는 기능. test 보고서를 집계
        }
      }
      stage('Deploy') {
          steps {
              sh 'make publish'
          }
      }
    }
  }
  ```

# How

- Jenkins 설치
- Jenkins 실행
  - terminal에 jenkins-lts 입력하면 실행됨
  - service로 실행하면 background에 떠있게 됨
- 해당 port로 url에 입력하여 접속

---

# Reference

- https://jojoldu.tistory.com/355
- https://jojoldu.tistory.com/356
  - scripted
- https://jayy-h.tistory.com/32
  - declarative
- https://www.jenkins.io/doc/book/pipeline/syntax/
  - Jenkins documentation pipeline syntax
- https://cwal.tistory.com/24
  - what is Jenkins pipeline
