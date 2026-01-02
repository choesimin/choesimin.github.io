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
- [ ] data-class.md - Data Class
- [ ] sealed-class.md - Sealed Class
- [ ] object.md - Object, Companion Object
- [ ] inheritance.md - 상속, Interface, Abstract Class

### kotlin/functional/
- [ ] index.md - 함수형 programming 개요
- [ ] lambda.md - Lambda 표현식
- [ ] higher-order-function.md - 고차 함수
- [ ] extension-function.md - Extension Function
- [ ] collection-operations.md - Collection 연산 (map, filter, reduce 등)

### kotlin/coroutine/
- [ ] index.md - 기존 coroutine.md 이동
- [ ] suspend-function.md - Suspend 함수
- [ ] coroutine-builder.md - launch, async, runBlocking
- [ ] dispatcher.md - Dispatcher
- [ ] scope.md - CoroutineScope, Structured Concurrency
- [ ] flow.md - Flow (Cold Stream)
- [ ] channel.md - Channel (Hot Stream)
- [ ] exception-handling.md - Exception 처리

### kotlin/advanced/
- [ ] index.md - 고급 주제 개요
- [ ] generics.md - Generics
- [ ] delegation.md - Delegation
- [ ] dsl.md - DSL


---


## 작성 순서 권장

1. **class/** - 객체 지향 기초
2. **functional/** - 함수형 programming
3. **coroutine/** - 비동기 programming
4. **advanced/** - 고급 주제


---


## 작성 규칙 요약

- 영어 용어는 영어로 표기 (type, parameter, code, null check, matching 등)
- 모든 문장은 `-`로 시작하는 list 형식
- 제목 아래에는 반드시 bullet point 설명
- 금지 표현 : "다음과 같은", "이를 통해", "다룹니다", "소개합니다"
- 콜론 앞뒤 공백 (` : `)
- 이모지 사용 금지
- Mermaid.js 적극 활용
