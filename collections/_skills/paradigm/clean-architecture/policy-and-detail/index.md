---
layout: skill
permalink: /79
title: Clean Architecture - 정책과 세부 사항
description: software system은 추상화 수준에 따라서 정책과 세부 사항으로 분리할 수 있습니다.
date: 2023-11-02
---


## 정책과 세부 사항

- 모든 software system은 **정책**(policy)과 **세부 사항**(detail)으로 분해할 수 있습니다.

- architect의 목표는 system에서 **정책을 가장 핵심적인 요소로 식별**하고, **세부 사항은 정책에 무관**하게 만드는 system을 구축하는 것입니다.
    - 세부 사항을 정책으로부터 신중하게 가려내고, 정책이 세부 사항과 결합되지 않도록 분리해야 합니다.
    - 이를 통해 정책은 세부 사항에 관한 어떠한 지식도 갖지 못하며, 어떤 경우에도 세부 사항에 의존하지 않게 됩니다.


