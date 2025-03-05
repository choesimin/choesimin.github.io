---
layout: skill
permalink: /186
title: uber JAR - 모든 의존성을 하나의 JAR로 관리하기
description: 하나의 JAR file로 모든 의존성을 관리하기 위해 uber JAR를 사용할 수 있습니다.
date: 2025-01-17
---


## uber JAR : 모든 의존성을 하나의 JAR로 관리하기

- uber JAR(또는 fat JAR)는 Java application과 application이 의존하는 모든 library들을 하나의 실행 가능한 JAR file로 packaging한 것입니다.
    - 모든 dependency를 포함하기 때문에 `java -jar` 명령어로 쉽게 실행할 수 있습니다.
    - 하나의 file만 배포하면 되므로 의존성 관리가 쉽고, 배포가 간단합니다.
    - microservice나 cloud 환경에서 container 관리하기 좋습니다.

- uber JAR를 사용할 때 주의할 점은 JAR 크기가 커질 수 있고, 같은 class의 다른 version이 충돌할 수 있다는 것입니다.


