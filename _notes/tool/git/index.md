---
layout: note
title: Git - Source Code Version 관리하기
date: 2023-04-06
---




## Git : DVSC(Distributed Version Control System)

- 분산 Version 관리 System입니다.
    - 여러 명의 사용자들 간의 file에 대한 작업을 조율하는 데에 사용됩니다.
- 주로, 여러 명의 개발자가 하나의 software를 개발할 때, source code를 관리하기 위해 사용합니다.




## Git의 장점

- internet 연결이 되지 않은 곳에서도 개발을 진행할 수 있습니다.
- 중앙 저장소가 삭제되어도 복구가 가능합니다.
    - local 저장소에도 source가 저장되어 있기 때문입니다.
- 여러 개발자들이 병렬 개발하기 좋습니다.
    - 각 개발자들은 자신의 branch에서 개발한 뒤, main branch에 merge합니다.
