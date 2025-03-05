---
layout: skill
permalink: /35
title: Java - Package Design Guide
description: Java package 구조를 설계할 때, Layer Package Structure와 Domain Package Structure 중 하나를 선택할 수 있습니다.
date: 2023-12-05
---


## Java Package 구조 설계하기 : Layer vs Domain

- Java의 package 구조는 크게 **Layer Package Structure**와 **Domain Package Structure**로 나뉩니다.
    - Layer Package Structure는 package를 계층(layer)에 따라 분리합니다.
    - Domain Package Structure는 package를 업무(domain)에 따라 분리합니다.

- 각 구조의 특성을 이해하고, 상황에 맞추어 선택해야 합니다.
    - 규모가 작고 domain이 적은 경우, Layer Package Structure를 선택합니다.
    - 규모가 크고 domain이 많은 경우, Domain Package Structure를 선택합니다.


