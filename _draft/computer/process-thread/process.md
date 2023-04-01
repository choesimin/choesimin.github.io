---
layout: note
---

# Process

| Program | Process |
| - | - |
| 실행 가능한 **정적인** 명령어(instruction)의 집합 | Memory에 적재(load)되어 **동적으로** 실행되고 있는 Program |

- process는 정적인 program과 달리 실제 실행 중인 program을 일컫기 때문에 동적이라고 표현함

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

- kernel memory 안에는 kernel이 관리하고 있는 각각의 process에 대한 data들이 있고, PCB(Process Control Block) 자료구조로 저장됨

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

- process 간 통신이 필요할 경우에 사용하는 최소한의 interface
    - 각 process가 다른 process의 정보를 변경하는 것을 방지하기 위해 최소한의 기능만 제공
- ex) Unix pipelining
    ```sh
    cat many-names | sort | uniq
    ```

## Multitasking & Context Switch

- Multitasking : 하나의 computer에서 여러 가지 작업을 동시에 하는 것
    - ex) 음악을 들으면서 code editor를 켜놓고 chrome에서 검색하기

- 현대적인 모든 운영 체제는 모두 multitasking을 지원함

### Multitasking은 Time sharing 기법으로 작동됨

- computer는 process들을 짧은 순간 동안만 작업하게 하고(CPU자원을 주고) 다른 process에 CPU 자원을 쓰게 함 (이 과정의 반복)
- process는 다시 자기 차례가 되었을 때 자신이 마지막으로 어떤 작업 중이었는지 기억해야기 때문에 작업을 중단했을 때의 Context 정보는 process가 전환될 때 PCB에 저장함
- 이후 자신의 차례가 다시 왔을 때 PCB에 저장된 상태에서 적업을 재개함

- 이렇게 'process가 전환되면서 Context를 전환하는 것'을 **Context Switch**라고 함
    - 이때 작업 중이던 Context를 저장하고 새로운 Context를 load하면서 overhead가 발생함
        - CPU register 상태 변환, stack pointer 추적, 명령어를 추적하는 Program Counter 등에 대한 작업을 처리하기 때문
    - 그럼에도 multitasking에 대한 수요가 확실하기 때문에 많은 운영체제가 Context Switch를 최적화하는 데 집중하고 있음




---




# Reference

- https://shoark7.github.io/programming/knowledge/difference-between-process-and-thread
- https://gmlwjd9405.github.io/2018/09/14/process-vs-thread.html
