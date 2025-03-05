---
layout: skill
permalink: /72
title: Event 기반 Architecture와 CDC
description: CDC는 Event 기반 Architecture에서 사용하기 좋은 기술입니다.
date: 2024-12-20
---


## Event 기반 Architecture에서 CDC를 사용하는 이유

- data 변경에 대한 event message는 **application 기반으로 발행**할 수도 있고, **DB 기반으로 발행**할 수도 있습니다.
    - CDC는 DB 기반으로 message를 발행하는 쪽에 속합니다.

- CDC는 DB 기반으로 message를 발행하기 때문에, **data 변경에 의해 발행되는 모든 event의 관리 지점을 data로 모을 수 있다는 장점**이 있습니다.
    - CUD(Create, Update, Delete)에 의해 data가 수정되면 자동으로 event가 발행되기 때문입니다.

- **application 기반 message 발행 방식은 병렬 형태로 data를 처리**합니다.
    - event가 발생했을 때, application이 DB에 변경 사항도 반영하고 message queue에 message도 등록합니다.
        - DB CUD와 message를 등록하는 두 가지 작업을 application이 주체가 되어 모두 처리(dual write)합니다.
    - 해당 data를 변경하는 곳은 application상에 무수히 많이 존재하므로, event message를 발행하는 logic도 data를 변경하는 모든 곳에 추가해줘야 합니다.
        - DB에 CUD를 하는 logic이 API, batch, worker 등 여러가지가 있다면, 모든 logic에 event message 발행 과정을 추가해야 합니다.
        - 개발자가 어느 한 곳이라도 놓치면, message 발행이 누락됩니다.

```mermaid
