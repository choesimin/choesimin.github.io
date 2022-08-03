# Build

- source code file을 computer에서 실행할 수 있는 독립 software 가공물로 변환하는 과정 또는 그에 대한 결과물
    - 작성한 source code(java), project에서 쓰인 각각의 file 및 자원 등(.xml, .jpg, .jar, .properties)을 Tomcat같은 WAS가 인식할 수 있는 구조로 packaging하는 과정 및 결과물

## Build Tool

- project 생성, test build, 배포 등의 작업을 위한 전용 program
- 빠른 기간 동안 계속해서 늘어나는 library 추가, project를 진행하며 library의 version 동기화의 어려움을 해소하고자 등장
- 초기의 java build 도구로 Ant를 많이 사용했으나, 최근 많은 build 도구들이 생겨나 Maven이 많이 쓰였고 현재는 Gradle이 많이 사용됨
    - Ant는 script 작성이 많고 library의 의존 관리가 되지 않아 불편함

---

# Reference

- https://goddaehee.tistory.com/199
