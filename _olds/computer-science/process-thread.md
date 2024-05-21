---
layout: skill
title: Process와 Thread
version: 2023-05-08
---




|  | Process | Thread |
| - | - | - |
| 자원 할당 | 실행할 때마다 새로운 자원을 할당받습니다. | 자신을 실행한 process의 자원을 공유합니다. |
| 자원 공유 | 자원을 공유하지 않습니다. 그러나 같은 program의 process일 경우, code는 공유합니다. | 같은 process 내의 thread들은 Stack을 제외한 나머지 세 영역을 공유합니다. |
| 독립성 | 독립적입니다. | process의 하위 집합입니다. |
| 주소 공간 | 별개의 주소 공간을 소유합니다. | process의 주소 공간을 공유합니다. |
| 통신 | 오직 system이 제공하는 IPC 방법으로만 통신합니다. 따라서 thread보다 통신이 어렵지만, system에 의해 관리되기 때문에 상대적으로 안전합니다. | 다른 thread와 자유롭게 소통합니다. 공유 변수를 수정하는 것만으로도 thread 간의 통신을 구현할 수 있습니다. 따라서 통신이 비교적 쉽고 용이하지만, 보안에 취약할 수 있습니다. |
| Context Switch | thread에 비해 느립니다. | process에 비해 빠릅니다. |




---


## Process와 Program

| Program | Process |
| - | - |
| 실행 가능한 **정적인** 명령어(instruction)의 집합 | memory에 적재(load)되어 **동적으로** 실행되고 있는 program |

- process == program의 instance
    ```
    program : process = class : instance
    ```
    - 한 class가 여러 instance를 생성할 수 있음
    - 한 program에서 실행되는 여러 process가 동시에 존재할 수 있음
        - ex) 메모장 여러 개 실행시키기
    - 차이는 program은 class처럼 다른 program을 상속하지는 않는다는 점 (library나 module이라는 이름으로는 사용할 수 있긴 함)

- 다른 computer에 위치한 두 process가 통신할 때 사용하는 것이 **Protocol**




## Process의 특징 : kernel에 의해 직접 관리됨

- kernel memory 안에는 kernel이 관리하고 있는 각각의 process에 대한 data들이 있고, PCB(Process Control Block) 자료 구조로 저장됨

- PCB(Process Control Block)에 저장되는 정보와 자원
    - program과 관련된 실행 가능한 기계어 image
    - 운영 체제와 관련해 할당된 자원의 식별자
        - Unix의 File Descriptor, Windows의 Handle 등
    - process의 소유자 등 process와 관련된 Permission 정보
    - Context라고 일컬어지는 process 상태
        - 물리적 memory 주소나 CPU 내 register의 내용, 실행 중인 명령어를 지정하는 Program Counter 등을 포함
    - 실행되는 process에 대한 memory 주소

- 'kernel memory 안에서 관리되는 PCB 정보'가 아닌 '사용자가 사용하는 memory 공간 상의 process 정보' 4가지
    1. Code(text) : program의 실제 code를 저장
    2. Data : process가 실행될 때 정의된 전역 변수, Static 변수들을 저장
    3. Heap : process runtime 중 동적으로 할당되는 변수들을 저장 (함수 내에서 할당되는 변수 등)
    4. Stack : 함수에서 다른 함수를 실행하는 등의 subroutine들의 정보를 저장 (재귀와 Stack이 관련 있는 이유)

- 운영 체제는 각각의 process를 '독립적으로' 관리
    - 따라서 서로 다른 process가 겹칠 일이 없음
    - 또한 사용 자원 영역 등이 겹치는 일이 발생해서도 안됨
        - 한 process가 다른 process의 정보 한 부분을 변경하면 치명적인 오류가 날 수도 있기 때문
    - 에외적으로 같은 program의 process들은 Code 영역은 공유함
        - '내용이 동일한 program의 code를 여러 개 복사해서 process마다 가지고 있는 것' 보다는 'memory 상의 code 공간을 주소로 참조하는 것'이 낫기 때문




## Inter Process Communication (IPC)

- process 간의 통신이 필요할 경우에 사용하는 최소한의 interface입니다.
    - 각 process가 다른 process의 정보를 변경하는 것을 방지하기 위해 최소한의 기능만 제공

- e.g., Unix Pipelining
    - `cat many-names | sort | uniq`




## Multitasking & Context Switch

- Multitasking는 하나의 computer에서 여러 가지 작업을 동시에 하는 것을 의미합니다.
    - e.g., 음악을 들으면서, code editor를 켜놓고, chrome에서 검색하기.

- 현대적인 모든 운영 체제는 모두 multitasking을 지원합니다.


### Multitasking은 Time sharing 기법으로 작동됨

- computer는 process들을 짧은 순간 동안만 작업하게 하고(CPU자원을 주고) 다른 process에 CPU 자원을 쓰게 함 (이 과정의 반복)
- process는 다시 자기 차례가 되었을 때 자신이 마지막으로 어떤 작업 중이었는지 기억해야기 때문에 작업을 중단했을 때의 Context 정보는 process가 전환될 때 PCB에 저장함
- 이후 자신의 차례가 다시 왔을 때 PCB에 저장된 상태에서 적업을 재개함

- 이렇게 'process가 전환되면서 Context를 전환하는 것'을 **Context Switch**라고 함
    - 이때 작업 중이던 Context를 저장하고 새로운 Context를 load하면서 overhead가 발생함
        - CPU register 상태 변환, stack pointer 추적, 명령어를 추적하는 Program Counter 등에 대한 작업을 처리하기 때문
    - 그럼에도 multitasking에 대한 수요가 확실하기 때문에 많은 운영체제가 Context Switch를 최적화하는 데 집중하고 있음







---




## Thread

- process 내에서 실행되는 흐름
- 일반적으로 하나의 process는 하나의 thread로 시작됨
    - 이를 'main thread'라고 하며, thread를 추가로 생성하지 않는 한 모든 program은 메인 thread에서 실행됨

- Concurrent(여러 thread가 동시에 존재할 수 있는) Multi-threading
    - 순차적인 처리 방식의 단점 : 한 작업이 오래 걸리면 전체 program이 지연되는 병목 현상이 생길 수 있음
    - 선형적으로 연결되어 실행되지 않아도 되는 경우엔 한 process 내에서 서로 순서상 의존하지 않는 작업이 다른 작업의 종료를 기다릴 이유가 없음
    - 이때 thread(실행되는 흐름)를 여러 개 두면 병목 현상에 걸리지 않고 전체 작업시간을 줄일 수 있음

- 운영체제적으로 한 process 안의 thread들은 stack 공간을 제외한 process의 나머지 공간과 system resource를 공유함




---




## 장점

- process 간 통신에 비해  간단함
    - 서로 공유하는 변수를 변경하기만 하면 되기 때문
    - 반면 process 간 통신은 그 위험성으로 까다롭게 관리됨
- system의 자원 소모가 줄어듬
    - 기존 process의 자원을 다른 thread와 공유하기 때문에 자원을 새로 할당하지 않아도 됨
- 전체 응답 시간이 단축됨
    - 시간도 자원이기에 overhead가 줄어들어 전체 응답이 짧아짐
    - 병목이 걸리는 작업과 다른 작업을 구분할 수 있어 전체 실행시간을 줄일 수 있음
- 위와 장점들은 web server가 각각의 HTTP 통신을 multi process가 아닌 multi thread로 구현하는 이유가 됨
    - process로 각 통신을 구현하려면 고유한 자원을 할당해야 하고 서로 간 통신도 까다롭기 때문


## 단점

- 여러 thread를 이용하는 program을 작성하는 경우엔 설계를 신경써서 해야 함
    - 미묘한 시간 차나 잘못된 변수를 공유함으로써 문제가 발생할 수 있기 때문
- debugging이 어려움






---




## Reference

- https://shoark7.github.io/programming/knowledge/difference-between-process-and-thread
- https://gmlwjd9405.github.io/2018/09/14/process-vs-thread.html
