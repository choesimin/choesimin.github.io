---
layout: skill
permalink: /37
title: Observer Pattern - 객체 상태 변화에 대한 알림 받기
description: Observer Pattern은 관찰자들이 관찰하고 있는 대상자의 상태 변화가 있을 때마다 대상자는 직접 목록의 각 관찰자들에게 통지하고, 관찰자들은 알림을 받아 조치를 취하는 행동 pattern입니다.
date: 2024-01-10
---


## Observer Pattern

- Observer Pattern은 객체의 상태 변화를 관찰하는 객체들에게 자동으로 알리는 방식으로 객체 간의 결합도를 낮추고 상호 작용을 관리하는 design pattern입니다.

- Observer Pattern에서는 한 객체의 상태가 바뀌면 그 객체에 의존하는 다른 모든 객체들한테 연락이 가고, 자동으로 내용이 갱신되는 방식으로 작동합니다.
    - 따라서, 객체들 사이에서 일대다(one-to-many) 의존성을 정의하게 됩니다.

- Observer Pattern에서 변하는 것은 'subject의 상태'와 'observer의 개수, 형식' 뿐입니다.
    - 변하는 부분을 변하지 않는 부분으로부터 분리시켜서, subject를 바꾸지 않고도 subject의 상태에 의존하는 객체들을 바꿀 수 있습니다.
    - subject와 observer 사이의 관계는 상속이 아니라 구성에 의해서 이루어집니다.

- **Subject는 data의 주인**입니다.
    - Observer Pattern에서 상태를 저장하고 지배합니다.
    - 합성(composition)을 활용하여 observer들을 관리합니다.

- **Observer는 관찰자**입니다.
    - data의 주인은 subject이기 때문에 subject에게 의존성을 가집니다.
    - observer가 또 다른 객체의 subject가 될 수도 있습니다.
    - observer는 계속해서 정보를 받을지 여부를 실행 중에 결정할 수 있습니다.

- observer와 subject의 관계 예시로 '신문 구독'을 들 수 있습니다.
    - 구독자(observer)가 신문을 구독(observer 등록)을 하면, 출판사(subject)는 구독자(observer)에게 신문(data)을 보내줍니다.
    - 구독자(observer)가 신문 구독을 해지(observer 해제)하면, 출판사(subject)는 더 이상 구독자(observer)에게 신문(data)을 보내지 않습니다.


