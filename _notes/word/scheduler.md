---
layout: note
---

# Scheduler

- 일괄 처리(Batch Processing)를 위해 주기적으로 발생하거나 반복적으로 발생하는 작업을 지원하는 도구
- 특정 업무를 원하는 시간에 처리할 수 있도록 지원하는 특성 때문에 job scheduler라고 함

## 종류

1. Spring Batch
    - Spring Source사와 Accenture사가 2007년에 공동으로 개발한 open source framework architecture
    - Architecture
        - Run Tier
            - batch의 실행을 담당
        - Job Tier
            - XMl로 기술된 Job 내의 각 step들을 순차적으로 실행
        - Application Tier
            - Job을 수행하는 데에 필요한 Item Reader, Item Writer, Item Processor 등의 component로 구성
        - Data Tier
            - database, file, queue 등 물리적 Data Source와의 결합이 이루어지는 영역
    - 핵심 component
        - Job Repository
            - Job Execution 관련 metadata를 저장하는 기반 component
        - Job Launcher
            - Job Execution 실행하는 기반 component
        - JPA; Java Persistence API
            - paging 기능 제공
        - Job
            - batch 처리를 의미하는 application component
        - Step
            - Job의 각 단계를 의미하며, Job은 일련의 연속된 Step으로 구성
        - Item
            - Data Source로부터 읽거나 저장하는 각 record
        - Chunk
            - 특정 크기를 갖는 Item 목록을 의미
        - Item Reader
            - Data Source로부터 Item을 읽어들이는 component
        - Item Processor
            - Item Reader로 읽어들인 Item Writer를 사용해 저장하기 전에 처리하는 component
        - Item Writer
            - Item Chunk를 Data Source에 저장하는 component
    - 핵심기능
        - Spring Framework 기반
            - DI; Dependency Injection, AOP; Aspect Oriented Programming 및 다양한 enterprise 지원 기능 사용
        - 자체 제공 component
            - batch 처리(database나 file로부터 data를 읽거나 쓰는 등) 시 공통적으로 필요한 component를 제공
        - 견고함과 안정성
            - 선언적 생략과 처리 실패 후 재시도 설정을 제공

2. Quartz Scheduler
    - Spring Framework에 plugin 되어 수행하는 Job과 실행 schedule을 정의하는 Trigger를 분리하여 유연성을 제공하는 open source scheduler
    - 구성요소
        - Scheduler
            - Quartz 실행 환경을 관리하는 핵심 개체
        - Job
            - 사용자가 수행할 작업을 정의하는 interface로서 Trigger 개체를 이용하여 schedule할 수 있음
        - JobDetail
            - 작업명과 작업 group과 같은 수행할 Job에 대한 상세 정보를 정의하는 개체
        - Trigger
            - 정의한 Job 개체의 실행 schedule을 정의하는 개체로써 Scheduler 개체에게 Job 수행 지점을 알려주는 갳[
    - Unix의 cron 명령어 유사한 opensource batch scheduler

## Batch Program 구현

1. Application 설계를 기반으로 batch program 확인
    1. program 관리 대장을 확인
    2. batch 설계서를 확인
        - program 관리 대장의 ID와 일치하는 batch 설계를 확인
2. Application 설계를 기반으로 batch program 구현
    1. batch program을 구현하기 위한 SQL문을 작성
    2. batch program을 구현하기 위한 I/O object(DTO; Data Transfer Object, VO; Value Object)를 정의
    3. batch program을 구현하기 위한 data 접근 object(DAOOo; Data Access Object) 작성
    4. batch program을 구현하기 위한 scheduler class를 작성
    - batch 설계서는 작성하지 않음
    
---

# Reference

- https://hyeonukdev.github.io/2020/05/10/Engineer_Information_Processing/ch15_서버프로그램구현/배치프로그램구현/배치프로그램/
