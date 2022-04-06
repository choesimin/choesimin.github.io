# Process & Thread

- 차이
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

- Context Switch에 있어서 process보다 thread가 “일반적으로” 더 빠르고 자원소모가 적음
  - process는 Switch될 때의 Context를 PCB 등에 저장하는 등 overhead가 발생하는데 thread는 그런 부하가 적음
  - '압도적으로 thread Switching이 더 저렴하다', '운영체제, 배포판, process의 환경에 따라 거의 차이가 없을 수도 있다' 등등 성능에 대한 의견이 분분함

||Process|Thread|
|-|-|-|
|자원 할당 여부|실행할 때마다 새로운 자원 할당|자신을 실행한 process의 자원을 공유|
|자원 공유 여부|일반적으로 자원을 공유하지 않음. 같은 program의 process일 경우 code를 공유하기는 함|같은 process 내의 thread들은 Stack을 제외한 나머지 세 영역을 공유함|
|독립성 여부|일반적으로 독립적|일반적으로 process의 하위 집합|
|주소 소유 여부|별개의 주소 공간 소유|주소 공간 공유|
|통신 여부|오직 system이 제공하는 IPC 방법으로만 통신|공유 변수 수정 등 자유롭게 다른 thread와 소통|
|Context Switch|일반적으로 thread에 비해 느림 (상황에 따라 다름)|일반적으로 process에 비해 빠름 (상황에 따라 다름)|

---

# Process

- program과 process
  - program : 실행가능한 "정적인" 명령어(instruction)의 집합
  - process : memory에 적재(load)되어 "동적으로" 실행되고 있는 program
  - process는 정적인 program과 달리 실제 실행 중인 program을 일컫기 때문에 동적이라고 표현하기도 함
  - process == program의 instance
    - 'program ~ process' 관계와 'class ~ instance' 관계의 공통점
      - 한 class가 여러 instance를 생성할 수 있음
      - 한 program에서 실행되는 여러 process가 동시에 존재할 수 있음
        - ex) 메모장 여러 개 실행시키기
      - 차이는 program은 class처럼 다른 program을 상속하지는 않는다는 점 (library나 module이라는 이름으로는 사용할 수 있긴 함)
- process는 kernel에 의해 직접 관리됨
  - kernel memory 안에는 kernel이 관리하고 있는 각각의 process에 대한 data들이 있고, PCB(Process Control Block) 자료구조로 저장됨
  - PCB(Process Control Block)에 저장되는 정보와 자원
    - program과 관련된 실행 가능한 기계어 image
    - 운영 체제와 관련해 할당된 자원의 식별자 (Unix의 File Descriptor, Windows의 Handle 등)
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
  - Inter Process Communication (IPC)
    - process 간 통신이 필요할 경우에 사용하는 최소한의 interface
      - 각 process가 다른 process의 정보를 변경하는 것을 방지하기 위해 최소한의 기능만 제공
    - ex) Unix pipelining
      ```sh
      cat many-names | sort | uniq
      ```
  - Protocol
    - 다른 computer에 위치한 두 process가 통신할 때 사용

## Multitasking & Context Switch

- Multitasking : 하나의 computer에서 여러 가지 작업을 동시에 하는 것
  - ex) 음악을 들으면서 code editor를 켜놓고 chrome에서 검색하기
- 현대적인 모든 운영 체제는 모두 multitasking을 지원함
- multitasking은 Time sharing 기법으로 작동됨
  - computer는 process들을 짧은 순간 동안만 작업하게 하고(CPU자원을 주고) 다른 process에 CPU 자원을 쓰게 함 (이 과정의 반복)
  - process는 다시 자기 차례가 되었을 때 자신이 마지막으로 어떤 작업 중이었는지 기억해야기 때문에 작업을 중단했을 때의 Context 정보는 process가 전환될 때 PCB에 저장함
  - 이후 자신의 차례가 다시 왔을 때 PCB에 저장된 상태에서 적업을 재개함
  - 이렇게 'process가 전환되면서 Context를 전환하는 것'을 'Context Switch'라고 함
    - 이때 작업 중이던 Context를 저장하고 새로운 Context를 load하면서 CPU register 상태 변환, stack pointer 추적, 명령어를 추적하는 Program Counter 등에 대한 작업을 처리하기 때문에 overhead가 발생함
    - 그럼에도 multitasking에 대한 수요가 확실하기 때문에 많은 운영체제가 Context Switch를 최적화하는 데 집중하고 있음

---

# Thread

- 

---

# Reference

- https://shoark7.github.io/programming/knowledge/difference-between-process-and-thread
- https://gmlwjd9405.github.io/2018/09/14/process-vs-thread.html