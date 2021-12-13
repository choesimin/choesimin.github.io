# Maven

- project를 build하고 library를 관리해주는 도구

## LIfecycle

- 종류
    - default lifecycyle : compile -> test -> package -> install -> deploy
    - clean lifecycle : clean
    - site lifecycle : site -> site-deploy
- 'mvn install'이란 명령을 내리면 compile부터 install 단계까지 모두 실행됨

## 명령어

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
- mvn site : 문서 site 생성
- mvn deploy : 배포
    - 원격 repository가 등록되어 있다면 해당 원격 repository에 배포함
- mvn archetype:generate : architype 생성
- mvn dependency:tree : dependency tree 보기
- mvn spring-boot:run : Spring Boot 실행

## pom.xml

- <groupId>
    - project를 구분하는 값으로 사용됨
    - domain을 주로 사용
- <artifactId>
    - project를 구분하는 값으로 사용됨
    - project명을 사용
- <properties>
    - POM 내에서 공통적으로 사용되는 값들을 설정
    - pom.xml file의 다른 곳에서 ${org.springframework-version} 처럼 사용
- <repositories>
    - library를 받아올 저장소를 지정함
- <dependencies>
    - project에서 사용되는 library를 지정함
- <build>
    - project의 build 방법을 지정함

---

# Reference

