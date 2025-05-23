---
layout: note
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


---


## 정책 수준 (Policy Level)

- 수준은 **입출력까지의 거리**를 의미합니다.

- 모든 source code 의존성이 고수준 정책을 향한다면, 변경의 영향도를 줄일 수 있습니다.
    - system의 최저 수준에서 중요하지 않지만 긴급한 변경이 발생하더라도, 보다 높은 위치의 중요한 수준에 미치는 영향이 거의 없게 됩니다.

| 고수준 정책 | 저수준 정책 |
| --- | --- |
| 입력과 출력 모두로부터 멀리 위치한 정책입니다. | 입력과 출력을 다루는 정책입니다. |
| 고수준 정책은 저수준 정책에 비해 덜 빈번하게 변경되고, 보다 **중요한 이유로 변경**되는 경향이 있습니다. | 저수준 정책은 더 **빈번하게 변경**되며, 보다 **긴급성을 요구**하며, 덜 중요한 이유로 변경되는 경향이 있습니다. |


### Architecture와 Design의 정책 수준

| Architecture | Design |
| --- | --- |
| **고수준**의 것들을 가리킵니다. | **저수준**의 구조 또는 결정 사항 등을 의미합니다. |
| 입출력과 거리가 먼 Business 영역(Domain 객체, Usecase 등)입니다. | 입출력과 가까운 Infra 영역(HTTP, DB, Cache 등)입니다. |

- **고수준에서 저수준으로 향하는 의사결정의 연속성만이 있을 뿐**, 본질적으로 architecture와 design에는 차이가 없습니다.
    - 저수준의 세부 사항(design)과 고수준의 구조(architecture)는 모두 전체 설계의 구성 요소입니다.
    - 세부 사항과 구조는 개별로 존재할 수 없으며, 단절 없이 이어져 system의 구조를 정의합니다.


---


## Reference

- Clean Architecture (도서) - Robert C. Martin
- <https://mangkyu.tistory.com/276>
