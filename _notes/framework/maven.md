---
layout: note
---

# Maven

- project를 build하고 library를 관리해주는 도구

---

## Lifecycle

### 종류

- Default Lifecycyle : compile -> test -> package -> install -> deploy
- clean Lifecycle : clean
- site Lifecycle : site -> site-deploy

### Command

- mvn clean : 생성된 target folder 삭제
- mvn validate
- mvn compile : source code compile
    - target/classes folder가 만들어지고 compile된 class file 생성됨
- mvn test : test code 실행
    - 실패하면 build가 멈춤
    - target/test-classes folder와 안에 compile된 class file이 생성됨
    - target/surefire-reports folder에 test 결과가 기록됨
- mvn package : jar 또는 war file(산출물) 생성
    - 해당 project를 지정한 확장자로 묶어주는 단계
    - "artifactId-version.packaging"형태의 파일을 target폴더안에 생성
    - 확장자 type은 pom.xml에 packaging tag로 묶임
- mvn verify
- mvn install : 배포
    - local repository(Maven이 설치되어 있는 PC)에 배포
    - compile부터 install 단계까지 실행
- mvn site : 문서 site 생성
- mvn deploy : 배포
    - 원격 repository가 등록되어 있다면 해당 원격 repository에 배포함
- mvn archetype:generate : architype 생성
- mvn dependency:tree : dependency tree 보기
- mvn spring-boot:run : Spring Boot 실행

---

## Maven 설정 file

### settings.xml

- Maven build tool과 관련한 설정 file
- MAVEN_HOME/conf directory에 위치 (Maven 설치 시 기본 제공)
- settings.xml에서 원하는 local 저장소의 경로를 지정, 변경할 수 있음
  - Maven을 build할 때 의존 관계에 있는 library, plugin을 중앙 저장소에서 개발자 PC로 download함
  - 이 때 download하는 위치(local 저장소)의 기본 설정값은 'USER_HOME/.m2/repository'

### POM (pom.xml)

- Project Object Model
- Maven을 이용하는 project의 root에 존재하는 xml file
  - 하나의 Java project에 build tool을 Maven으로 설정하면, project 최상위 directory에 'pom.xml'이라는 file이 생성됨
- Maven의 기능을 이용하기 위해서 POM이 사용됨
- file은 project마다 1개이며, pom.xml만 보면 project의 모든 설정, 의존성 등을 알 수 있음
- pom.xml element
    - modelVersion
        - POM model의 version
    - parent
        - project의 계층 정보
    - groupId
        - project를 생성하는 조직의 고유 id를 결정함
        - 일반적으로 domain 이름을 거꾸로 적음
    - artifactId
        - project build시 file 대표 이름
        - groupId 내에서 유일해야 함
        - project명을 사용
    - packaging
        - packaging 유형 (jar, war, ear 등)
    - name
        - project 이름
    - description
        - project에 대한 간략한 설명
    - url
        - project에 대한 참고 reference site
    - properties
        - version 관리 시 용이함
            - dependencies에서 활용 가능
        - POM 내에서 공통적으로 사용되는 값들을 설정
        - pom.xml file의 다른 곳에서 ${org.springframework-version} 처럼 사용
    - repositories
        - library를 받아올 저장소를 지정함
    - dependencies
        - project와 의존 관계에 있는 library들을 관리하
    - build
        - project의 build에 사용할 plugin 목록

---

# Reference

- https://goddaehee.tistory.com/199
