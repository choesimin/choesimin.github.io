---
layout: note
permalink: /38
title: Clean Architecture - 경계 구축 비용
description: Architecture에서 경계를 구축하는 데에는 비용이 들어가기 때문에 경계를 어디에 둘지, 어떻게 구현할지를 신중하게 결정해야 합니다.
date: 2023-11-30
---


## Construction Cost of Boundary : 경계 구축 비용

- architecture 경계는 어디에나 존재하며, architecture 경계가 언제 필요한지를 신중하게 파악해야 합니다.
    - 경계를 제대로 구현하려면 비용이 많이 든다는 사실을 인지하고 있어야 합니다.
    - 동시에 경계가 무시되었다면 나중에 다시 추가하는 비용이 크다는 사실도 알아야 합니다.

- Agile 기법 관점에서는 'YAGNI(You Are not Going to Need It)' 원칙을 위배하는 선행적인 설계(architecture 경계를 완벽히 하는 것)는 좋지 않습니다.
    - 추상화가 필요할 것이라고 미리 함부로 예측해서는 안 됩니다.
    - over engineering이 under engineering보다 나쁠 때가 훨씬 많습니다.

- 반대로 architecture 경계가 필요하다는 사실을 너무 늦게 발견할 수도 있습니다.
    - 이때 경계를 추가하려면 비용이 많이 들고 큰 위험을 감수해야 합니다.

- 따라서, 경계 구축의 투자 대비 효용(ROI, Return On Investment)을 따져봐야 합니다.
    - clean architecture는 변경에 매우 유연하지만, 추상화하여 이를 전부 구현하려면 ROI가 떨어집니다.
    - trade-off가 필요하며, 추상화의 조짐이 보이는 시점에 비용을 예상해보는 것이 좋습니다.
    - 추상화 도입으로 비용이 더 커진다면, 그대로 두는 것이 더 낫습니다.
        - 예를 들어, 잠깐 사용하고 삭제할 code는 굳이 interface를 두고 구현체를 나누지 않습니다.

- software architect는 미래를 내다보고 현명하게 추측해야 합니다.
    - 비용을 산정하고, 어디에 경계를 둘지, 그리고 완벽하게 구현할 경계와 부분적으로 구현할 경계, 무시할 경계를 결정해야 합니다.
    - 이는 일회성 결정이 아니며, project 초반에는 구현할 경계와 무시할 경계인지를 쉽게 결정할 수 없으므로 빈틈없이 지켜봐야 합니다.
    - 경계가 필요할 수도 있는 부분에 주목하고, 경계가 존재하지 않아 생기는 마찰의 어렴풋한 첫 조짐을 신중하게 관찰해야 합니다.
    - 첫 조짐이 보이는 시점에 해당 경계를 구현하는 비용과 무시할 때 감수할 비용을 가늠해보고, 결정 사항을 자주 검토해야 합니다.
    - 목표는 경계의 구현 비용이 무시해서 생기는 비용보다 적어지는 그 변곡점에서 경계를 구현하는 것입니다.


---


## Reference

- Clean Architecture (도서) - Robert C. Martin
- <https://mangkyu.tistory.com/276>
