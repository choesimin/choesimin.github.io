# Kotlin 학습 문서 작성 계획

## 완료된 문서

### kotlin/
- [x] index.md - Kotlin 개요

### kotlin/basic/
- [x] index.md - 기초 문법 개요
- [x] variable.md - 변수 선언 (val, var, const, lateinit, lazy)
- [x] data-type.md - 기본 type
- [x] function.md - 함수
- [x] null-safety.md - Null Safety
- [x] control-flow.md - 제어문

### kotlin/class/
- [x] index.md - Class 개요


---


## 작성 예정 문서

### kotlin/class/
- [x] primary-constructor.md - Primary/Secondary Constructor, init block
- [x] data-class.md - Data Class
- [x] sealed-class.md - Sealed Class
- [x] object.md - Object, Companion Object
- [x] inheritance.md - 상속, Interface, Abstract Class

### kotlin/functional/
- [x] index.md - 함수형 programming 개요
- [x] lambda.md - Lambda 표현식
- [x] higher-order-function.md - 고차 함수
- [x] extension-function.md - Extension Function
- [x] collection-operations.md - Collection 연산 (map, filter, reduce 등)
- [x] sequence.md - Sequence (Lazy Evaluation)

### kotlin/coroutine/
- [x] index.md - 기존 coroutine.md 이동
- [x] suspend-function.md - Suspend 함수
- [x] coroutine-builder.md - launch, async, runBlocking
- [x] dispatcher.md - Dispatcher
- [x] scope.md - CoroutineScope, Structured Concurrency
- [x] flow.md - Flow (Cold Stream)
- [x] channel.md - Channel (Hot Stream)
- [x] exception-handling.md - Exception 처리

### kotlin/advanced/
- [x] index.md - 고급 주제 개요
- [x] generics.md - Generics
- [x] delegation.md - Delegation
- [x] dsl.md - DSL


---


## 작성 순서 권장

1. **class/** - 객체 지향 기초
2. **functional/** - 함수형 programming
3. **coroutine/** - 비동기 programming
4. **advanced/** - 고급 주제


---


## 사용 가능한 Permalink 번호

- 114, 248, 249, 250, 251, 252, 253, 254, 262, 266, 267, 269, 270, 328, 333 (총 15개)
- published: false 상태인 draft 문서들의 번호를 재사용


### 번호 할당

| 번호 | 문서 |
| --- | --- |
| 114 | dispatcher.md |
| 248 | scope.md |
| 249 | flow.md |
| 250 | channel.md |
| 251 | exception-handling.md |
| 252 | kotlin/advanced/index.md |
| 253 | generics.md |
| 254 | delegation.md |
| 262 | dsl.md |
| 266 | coroutine-builder.md |
| 267 | sequence.md |
| 269 | (예비) |
| 270 | (예비) |
| 328 | (예비) |
| 333 | (예비) |


---


## 작성 규칙 요약

- 영어 용어는 영어로 표기 (type, parameter, code, null check, matching 등)
- 모든 문장은 `-`로 시작하는 list 형식
- 제목 아래에는 반드시 bullet point 설명
- 금지 표현 : "다음과 같은", "이를 통해", "다룹니다", "소개합니다"
- 콜론 앞뒤 공백 (` : `)
- 이모지 사용 금지
- Mermaid.js 적극 활용


---


## 확인 필요

- 2025-01-06 작성 문서 (검토 필요)
    - functional/sequence.md
    - advanced/index.md
    - advanced/generics.md
    - advanced/delegation.md
    - advanced/dsl.md
