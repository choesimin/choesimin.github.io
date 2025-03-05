---
layout: skill
permalink: /73
title: Clean Architecture - 세부 사항
description: 세부 사항은 정책과 무관한 것으로, 정책이 갖는 행위에는 영향을 미치지 않습니다.
date: 2023-11-02
---


## 세부 사항 : 정책과 무관한 것

- 세부 사항(detail)은 사용자, 개발자, 외부 system이 **정책과 소통할 때 필요**하며, 정책이 갖는 행위에는 영향을 미치지 않습니다.

- 세부 사항에 대한 결정은 가능한 오래 미룰 수 있어야 합니다.
    - 세부 사항은 정책에 무관하기 때문에, 세부 사항의 결정을 뒤로 미뤄도 정책을 구현하는 데에 영향을 주어서는 안 됩니다.
        - 예를 들어, DB table 추가가 미뤄져도, business logic에 대한 개발은 진행할 수 있어야 합니다.
    - 따라서 정책을 설계할 때는 세부 사항에 몰두하지 않고, 가능한 많은 선택지를 가능한 오래 남겨 두어야 합니다.

- 세부 사항에는 입출력 장치, database, web system, server, framework, 통신 protocol 등이 있습니다.


---


## 세부 사항에 속하는 것들


### Main Component

- 모든 system에는 최소한 하나의 component가 존재하여 나머지 component를 생성/조정/관리하는데, 이 component를 main component라고 합니다.

- main component는 궁극적인 세부 사항으로, 가장 낮은 수준의 정책입니다.
    - main component는 system의 초기 진입점으로, 운영 체제를 제외하면 어떤 것도 main component에 의존하지 않습니다.

- main component는 초기 조건과 설정을 구성하고, 외부 자원을 모두 수집한 후 제어권을 application의 고수준 정책으로 넘기는 plugin입니다.
    - 고수준의 system을 위한 모든 것(factory, 전략, 기반 설비 등)을 load한 후, 제어권을 고수준의 system에게 넘깁니다.
    - plugin이므로 main component를 application의 설정 별로 하나씩 둬서 둘 이상의 main component를 만들 수도 있습니다.
        - main component를 plugin component로 여기고 architecture 경계 바깥에 위치시키면, 설정 관련 문제를 보다 쉽게 해결할 수 있습니다.

- 의존성 주입 framework를 이용해 의존성을 주입하는 일은 main component에서 이뤄져야 합니다.
    - main component에 의존성이 주입되고 나면, main은 의존성 주입 framework 없이도 의존성을 분배할 수 있어야 합니다.


### Database

- architecture 관점에서 database는 entity가 아닌 세부 사항이기 때문에, architecture의 구성 요소 수준으로 끌어올릴 수 없습니다.
    - 체계화된 data 구조와 data model은 architecture에서 중요하지만, database는 data model이 아닙니다.
    - data를 회전식 자기 disk 표면에서 이리저리 옮길 뿐인 기술과 system(database)은 architecture에 중요하지 않습니다.
        - database는 software이자 utility일 뿐입니다.

- 관계형 database는 data를 저장하고 접근하는데 탁월한 기술이지만, 결국 기술일 뿐입니다.
    - data를 table에 행 단위로 배치한다는 자체는 architecture 관점에서 중요하지 않습니다.
    - UseCase는 data 저장 방식을 알아서는 안되며 관여해서도 안 됩니다.
    - data가 table 구조를 가진다는 사실은 오직 architecture 경계의 외부에 위치한 최하위 수준의 utility 함수만 알아야 합니다.

- data는 중요하지만 database는 세부 사항입니다.


#### Application 성능과 Database

- application의 성능은 architecture의 관심사입니다.
- 하지만 data 저장소의 측면에서는 완전히 캡슐화(encapsulation)하여 업무 규칙과 분리할 수 있는 관심사입니다.
    - data 저장소에서 data를 빠르게 넣고 뺄 수 있어야 하는 것은 맞지만, 이는 저수준의 관심사입니다.
    - 저수준의 data 접근 mechanism 단에서 다룰 수 있고, 성능은 전반적인 architecture와는 관련이 없습니다.


### Web

- Web은 전달 mechanism(입출력 장치)이며, 언제 변할지 모르는 세부 사항입니다.
    - application이 Web으로 전달된다는 사실은 세부 사항(미루어야 할 결정 사항)이며, system 구조를 지배해서는 안 됩니다.
        - system architecture는 system을 어떻게 전달할지 몰라야 합니다.
    - 현대에는 Web 기반의 API(RESTful API)로 입력을 받고 출력을 보내는 것이 당연하지만, 입출력 장치는 계속해서 변해 왔습니다.

- 따라서 Web은 핵심 업무 규칙(business logic)에 결합되지 않도록, 분리하여 architecture 경계 바깥에 둡니다.
    - 분리를 위해 UI와 application 사이에 추상화된 경계를 정의해야 합니다.


### Framework

- framework는 세부 사항으로 남겨 두어야 합니다.
    - architecture는 system을 이야기해야 하며, system에 적용된 framework에 대해 얘기해서는 안 됩니다.
        - 어떻게 해야 architecture를 UseCase에 중점을 둔 채 그대로 보존할 수 있을지를 생각해야 합니다.
        - 새로 합류한 programmer는 system이 어떻게 전달될지 알지 못한 상태에서도 system의 모든 UseCase를 이해할 수 있어야 합니다.

- framework를 사용할 수는 있지만 결합해서는 안 되고, 적당히 거리를 두어야 합니다.
    - framework는 강력하고 유용하며, 그래서 업무 규칙과 결합되기 쉽지만, 한번 결합하면 그 관계를 깨기가 매우 어렵습니다.
    - 이후에 기술적인 이유 등으로 framework는 변경될 수 있기 때문에, 세부 사항으로 취급해야 합니다.

- framework를 architecture의 바깥쪽 원에 속하는 세부 사항으로 취급하고, architecture의 중심부로 들어오지 못하게 해야 합니다.
    - framework가 자신의 class로부터 파생을 요구한다면 proxy를 만들고, 업무 규칙에 plugin할 수 있는 component에 위치시켜야 합니다.
    - 핵심 code에 plugin할 수 있는 component에 framework를 통합하고, 의존성 규칙을 준수해야 합니다.
        - 예를 들어, Spring은 훌륭한 의존성 주입 framework이지만, 업무 객체는 `@Autowired` 등을 포함하여 절대로 Spring에 대해 알아서는 안 됩니다.


---


## Reference

- Clean Architecture (도서) - Robert C. Martin
- <https://mangkyu.tistory.com/276>
- <https://mangkyu.tistory.com/277>
