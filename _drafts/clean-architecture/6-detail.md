---
layout: note
title: Clean Architecture Chapter 6 - 세부사항
date: 2023-11-02
---




## 30장. 데이터베이스는 세부사항이다

- database는 세부사항
    - architecture 관점에서 database는 entity가 아니며 세부사항이라서 architecture의 구성요소 수준으로 끌어올릴 수 없음
    - appilcation 내부의 data의 구조와 data model은 system architecture에 중요하지만, database는 data model이 아님
    - database는 data에 접근할 방법을 제공하는 utility이므로, 저수준의 세부사항(mechanism)일 뿐이므로 architecture와는 상관이 없음

- 관계형 database
    - 관계형 model이 성장함에 따라 관계형 database는 data 저장소의 지배적인 형태가 됨
    - 관계형 database는 data를 저장하고 접근하는 데 탁월한 기술이지만, 결국은 그저 기술일 뿐임 == 관계형 database는 세부사항
    - data를 table에 행 단위로 배치한다는 것 자체는 architecture적으로 볼 때 전혀 중요하지 않음
        - application의 usecase는 이러한 방식을 알고 있거나 관여하면 안 됨
        - data가 table 구조를 가진다는 사실은 오직 architecture의 외부에 위치한 최하위 수준의 utility 함수만 알아야 함
    - 많은 data 접근 framework가 table과 행이 객체 형태로 system 여기저기를 돌아다니게 허용하지만, 이는 architecture적으로는 잘못된 설계임
        - usecase, 업무 규칙, UI까지 관계형 database 구조에 결합되어 버림

- database system이 널리 사용되는 이유
    - 회전식 자기 disk(magnetic disk)는 현재 data 저장소의 중심에 있음
    - disk는 '느리다'라는 치명적인 단점이 있음
        - disk에서 data는 원형 trackdp wjwkdehla
        - track은 sector로 분할되고, 각 sector는 사용하기 편한 크기의 byte를 저장함(대체로 4K)
        - 각 platter는 대략 수백 개의 track으로 구성되고, disk는 십여개의 platter로 구성됨
        - disk에서 특정 byte를 읽는 법
            - head를 적절한 track으로 옮김
            - disk가 돌면서 head 위치에 적절한 sector가 올 때까지 기다림
            - 해당 sector에서 4K 모두를 RAM으로 읽으들임
            - 해당 RAM buffer의 색인을 찾아서 필요한 byte를 가져옴
        - processor에서 한 명령어를 처리하는 주기와 비교했을 때 백만 배 오래 걸림
    - disk 때문에 생기는 시간 지연을 완화하기 위해 필요한 것들
        - 색인
        - cache
        - query 계획 최적화
    - data 접근 및 관리 system
        - file system
            - 문서(document) 기반
            - 문서 전체를 자연스럽고 편리하게 저장하는 방법을 제공함
            - 일련의 문서를 이름 기준으로 저장하거나 조회할 때는 잘 동작함
            - 내용을 기준으로 검색할 때는 어렵고 오래걸림
        - 관계형 database 관리 system : RDBMS
            - 내용을 기반으로 record를 자연스업고 편리하게 찾는 방법 제공
            - record가 서로 공유하는 일부 내용에 기반해서 다수의 record를 연관 짓는 데에 매우 작원함
            - 정형화되지 않은 문서를 저장하고 검색하는 데에 부적합함

- disk가 없다면(RAM에 모든 것을 저장한다면) database라는 mechanism은 사라질 것임
    - 후일 disk가 RAM으로 대체된다면, data들은 연결 list, tree, hash table, stack, queue 등의 data 구조로 체계화될 것임
        - table 구조와 file 구조는 disk에 특화되어 있음
        - 사실 programmer가 다루기 편리한 형태는 list, 집합, stack, queue, tree 등의 data 구조임

- database는 disk 표면과 RAM 사이에서 data를 옮길 때 사용할 뿐이므로 mechanism에 불과함
    - 따라서 architecture 관점에서 본다면 회전식 자기 disk에 data가 있기만 한다면, data가 어떤 형태인지는 신경 써서는 안 됨

- 성능도 data 저장소의 측면에서 완전히 캡슐화하여 업무 규칙과는 분리할 수 있으므로, 저수준의 관심사임
    - 이 성능은 저수준의 data 접근 mechanism 단에서 다룰 수 있음
    - 성능은 system의 전반적인 architecture와는 관련 없음


## 31장. 웹은 세부사항이다

```
GUI는 세부사항이다.
web은 GUI다.
따라서 web은 세부사항이다.
```
- web은 입출력 장치
- web의 GUI는 특이하고 다채롭기 때문에 장치 독립적인 architecture를 구현하기 위해서는 usecase를 사용해야 함
    - UI와 application 사이에는 추상화가 가능한 usecase라는 경계가 존재함
    - 업무 logic은 다수의 usecase로 구성되며, 각 usecase는 사용자를 대신해서 일부 함수를 수행함
    - 각 usecase는 입력 data, 수행할 처리 과정, 출력 data를 기반으로 기술할 수 있음
    - 입력 data와 그에 따른 출력 data는 data 구조로 만들어서 usecase를 실행하는 처리 과정의 입력 값과 출력 값으로 사용할 수 있음
    - 이 방식으로 각 usecase가 장치 독립적인 방식으로 UI라는 입출력 장치를 동작시킨다고 간주할 수 있음


## 32장. 프레임워크는 세부사항이다

- 위험 요인
    - framework는 내가 풀어야 할 특별한 관심사를 염두에 두지 않음
        - framework 제작자는 자신과 주변에서 보이는 문제를 해결하기 위해 framework를 만듬
        - 나의 문제와 framework가 풀려는 문제가 많이 겹칠수록 framework는 더 유용함
    - framework의 architecture는 그다지 깔끔하지 않은 경우가 많음
        - 의존성 규칙을 위반하는 경향이 있음
            - 업무 객체(나만의 고유한 entity)를 만들 때, framework 제작자는 자신의 code를 상속할 것을 요구함
            - 이는 framework가 내부로 들어가게 하는 일이며, 이렇게 framework와 한번 결합하면 그 관계를 깨기 매우 어려움
    - framework는 application의 초기 기능을 만드는 데는 도움에 되지만, 제품이 성숙해지면서 framework가 제공하는 기능과 틀을 벗어나게 됨
    - framework는 나에게 도움되지 않는 방향으로 진화할 수도 있음
        - 신규 version으로 upgrade했을 때, 사용 중이던 기능이 사라지거나 반영하기 힘든 형태로 변경될 수도 있음
    - 새롭고 더 나은 framework가 등장해서 갈아타고 싶어질 수도 있음

- 해결책 : framework와 결합하지 않기
    - framework가 안쪽으로(고수준으로) 들어오지 못하게 해야 함
    - 업무 객체를 만들 때 framework가 자신의 기반 class로 부터 파생하기를 요구한다면, 거절하기
        - 대신 proxy를 만들고, 업무 규칙에 plugin할 수 있는 component에 이들 proxy를 위치하기
    - framework가 핵심 code 안으로 들어오지 못하게 하기
        - 대신 핵심 code에 plugin할 수 있는 component에 framework를 통합하고, 의존성 규칙을 준수하기




---




# Reference

- Clean Architecture (도서) - Robert C. Martin
