---
layout: skill
permalink: /201
title: AWS AutoScaling - 부하에 따라 Instance 갯수를 자동으로 조정하기
description: AWS의 AutoScaling service는 수평적 확장과 축소를 통해 application의 부하(load)를 처리할 수 있는 정확한 수의 instance를 보유하도록 보장합니다.
date: 2023-07-30
---


## EC2 AutoScaling

- AutoScaling은 application의 부하에 따라 Instance의 갯수를 자동으로 조정하는 서비스입니다.
    - application의 부하가 증가하면 Instance를 늘리고, 부하가 감소하면 Instance를 줄입니다.
    - 이를 통해 application의 부하를 처리할 수 있는 최적의 Instance 갯수를 유지합니다.

- AutoScaling은 EC2 Instance를 기반으로 동작합니다.
    - 따라서 AutoScaling Group을 생성할 때는 EC2 Instance를 먼저 생성해야 합니다.
    - AWS에서는 CloudWatch가 현재 상황을 지표와 비교하여, Instance의 갯수를 자동으로 조정합니다.


### Scaling의 종류 : Scale Out/In vs Scale Up/Down

| Scale Out/In | Scale Up/Down |
| 