---
# layout: note
# title: Clean Architecture - 고수준과 저수준을 구분하기
# date: 2023-11-04
---



- "수준"은 **입출력까지의 거리**를 의미하며, Architecture는 고수준, Design은 저수준입니다.




## Architecture와 Design의 관계 : 고수준과 저수준

| Architecture | Design |
| - | - |
| **고수준**의 것들을 가리킵니다. | **저수준**의 구조 또는 결정사항 등을 의미합니다. |
| 입출력과 거리가 먼 Business 영역(Domain 객체, Usecase 등)입니다. | 입출력과 가까운 Infra 영역(HTTP, DB, Cache 등)입니다. |

- **고수준에서 저수준으로 향하는 의사결정의 연속성만이 있을 뿐**, 본질적으로 Architecture와 Design에는 차이가 없습니다.
    - 저수준의 세부사항(Design)과 고수준의 구조(Architecture)는 모두 전체 설계의 구성 요소입니다.
    - 세부사항과 구조는 개별로 존재할 수 없으며, 단절없이 이어져 system의 구조를 정의합니다.




---




# Reference

- Clean Architecture (도서) - Robert C. Martin
