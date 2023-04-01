---
layout: note
---

# Process & Thread

|  | Process | Thread |
| - | - | - |
| 자원 할당 여부 | 실행할 때마다 새로운 자원 할당|자신을 실행한 process의 자원을 공유 |
| 자원 공유 여부 | 일반적으로 자원을 공유하지 않음. 같은 program의 process일 경우 code를 공유하기는 함|같은 process 내의 thread들은 Stack을 제외한 나머지 세 영역을 공유함 |
| 독립성 여부|일반적으로 독립적|일반적으로 process의 하위 집합 |
| 주소 소유 여부 | 별개의 주소 공간 소유|주소 공간 공유 |
| 통신 여부 | 오직 system이 제공하는 IPC 방법으로만 통신|공유 변수 수정 등 자유롭게 다른 thread와 소통 |
| Context Switch | 일반적으로 thread에 비해 느림|일반적으로 process에 비해 빠름 |

- process : 운영 체제로부터 독립된 시간, 공간 자원을 할당 받아 실행됨
    - 서로 구분되는 자원을 할당 받아 정말 필요한 경우가 아니면 다른 process에 영향을 미치지 않고 실행되기 때문에 독립적임
    - 보유한 자원에 대한 별개의 주소 공간을 가짐
    - 오직 system이 제공하는 IPC mechanism을 통해서만 통신할 수 있음
        - 이는 system에 의해 관리되기 때문에 상대적으로 안전하다.
        - thread 통신보다 어려움

- thread : 한 process 내에서 여러 자원을 공유하면서 병렬적으로(concurrently) 실행됨
    - process의 하위 집합으로 여러 thread가 같은 process 자원을 공유하기 때문에 독립적이지 않음
    - process의 주소 공간을 공유함
    - 단순히 공유 변수 수정만으로도 thread간 통신을 구현할 수 있음
        - 따라서 통신이 비교적 쉽고 용이하지만, 안전한 program을 만들기 위해서는 신중해야 함

- Context Switch에 있어서 process보다 thread가 **일반적으로** 더 빠르고 자원소모가 적음
    - '압도적으로 thread Switching이 더 저렴하다', '운영체제, 배포판, process의 환경에 따라 거의 차이가 없을 수도 있다' 등등 성능에 대한 의견이 분분함




---




# Reference

- https://shoark7.github.io/programming/knowledge/difference-between-process-and-thread
- https://gmlwjd9405.github.io/2018/09/14/process-vs-thread.html
