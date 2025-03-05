---
layout: skill
permalink: /96
title: ksqlDB Window - 시간 기준으로 Data Group 만들기
description: ksqlDB Window를 사용하여 시간을 기준으로 data를 grouping하고 분석할 수 있습니다.
date: 2025-01-16
---


## ksqlDB Window : 시간 기반 Data 분석

- Window는 **시간을 기준으로 data를 grouping하는 방법**입니다.

- Window를 통해 무한한 stream data를 유한한 시간 단위로 나누어 분석할 수 있게 됩니다.
    - streaming data는 계속해서 들어오기 때문에, 특정 시점의 집계나 분석이 어렵습니다.
    - Window는 이렇게 실시간으로 흘러들어오는 data stream을 시간 단위로 잘라서 분석할 수 있게 해줍니다.
    - 예를 들어, "최근 1시간 동안의 주문량은 얼마인가?", "지난 30분간 가장 많이 팔린 상품은?" 등의 질문에 답하기 위해서는 시간을 기준으로 data를 나누어 처리해야 합니다.

- Window는 **시간 범위로 구분된 data의 논리적 container**로, 시작 시간(start time)과 종료 시간(end time)으로 정의되는 특정 시간 구간입니다.
    - Window는 특정 시간 구간 내에 발생한 모든 event들을 포함하며, 하나의 독립적인 처리 단위로 작동합니다.
    - 예를 들어, Start Time이 12:00:00이고 End Time이 12:05:00인 시간 구간은 "5분 Window"라고 정의할 수 있습니다.
        - Window는 이 5분 동안 발생한 모든 event들을 포함하는 논리적 group이며, ksqlDB에서 이 Window 내의 data들은 하나의 단위로 집계되거나 처리됩니다.


### Window의 구성 요소

- ksqlDB Window의 구성 요소는 크게 **Window 자체를 정의하는 요소**와 **data를 처리하는 요소**로 구분할 수 있으며, 이러한 구성 요소들이 모여 하나의 완전한 Window를 형성하게 됩니다.

#### Window 정의 요소

- **Start Time** : **Window가 시작되는 timestamp**를 나타냅니다.
    - event가 발생한 시점을 기준으로 합니다.
    - Window의 시작점이 되어 event의 소속을 결정합니다.

- **End Time** : **Window가 종료되는 timestamp**를 나타냅니다.
    - Start Time에 Window 크기를 더한 값입니다.
    - 해당 시점은 Window에 포함되지 않습니다.

- **Window Bound** : Start Time과 End Time으로 정의되는 **Window의 경계**입니다.
    - `[Start Time, End Time)` 형태의 반개방 구간입니다.
    - 이 경계(bound) 내의 모든 event를 처리 대상으로 합니다.

#### Data 처리 요소

- **Window Type** : **Window의 동작 방식**을 결정합니다.
    - Window Bound의 형성 방식을 정의합니다.
    - data 처리의 기본 전략을 제공합니다.

- **Window Key** : **Window 내 data grouping의 기준**이 됩니다.
    - 같은 key를 가진 record들이 함께 처리됩니다.
    - 집계 연산의 단위가 됩니다.


