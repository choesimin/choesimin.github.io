---
layout: note
---

# Reflection

- (Compile Time이 아닌) Run Time에 동적으로 특정 class의 정보를 객체화를 통해 분석 및 추출해낼 수있는 programming 기법 (== 객체를 통해 class의 정보를 분석)
    - 이미 loading이 완료된 class에서 또 다른 class를 동적으로 로딩 (dynamic loading)
    - 생성자(constructor), member field, member method 등을 사용할 수 있음
    - 실행 시간에 다른 class를 동적으로 loading하여 접근할 때, class와 member field, method 등에 관한 정보를 얻어야할 때 사용
- class 뿐만 아니라 class의 package 정보, 접근 지정자, super class, annotation 등도 얻을 수 있음
- Reflection이 사용된 기술
    - Spring Framework
        - 개발자가 등록한 bean을 runtime에 application에서 가져와 사용할 수 있게 함
    - Hibernate
    - Jackson Library
    - ...

## Reflection의 특징

1. 확장성
    - application은 정규화된 이름을 사용하여 확장성 객체의 instance를 생성하여 외부 사용자 정의 class를 사용할 수 있음
2. Class Browser 및 시각적 개발 환경 제공
    - Class Browser
        - Class Browser는 class의 method, property, constructor를 열거할 수 있어야 함
    - 시각적 개발 환경
        - Reflection의 형식 정보를 사용하면 개발자가 올바른 code를 작성하는 데에 도움이 됨
3. Debugger 및 Test 도구로써의 역할 수행
    - Debugger
        - 개인 property, method, constructor를 검사할 수 있어야 함
    - Test 도구
        - Reflection으로 class에 정의된 발견 가능한 set API를 체계적으로 호출할 수 있음
        - test에서 높은 수주의 code coverage를 보장함

## Reflection의 주의사항 및 단점

- Reflection은 강력한 도구지만, 무분별하게 사용하면 독이 됨
- Reflection을 사용하지 않고 수행 가능하다면, 사용하지 않는 것이 좋음
1. Performance Overhead
    - Reflection에는 동적으로 해석되는 type이 포함되므로, 정확한 JVM 최적화를 수행할 수 없음
    - 따라서 Reflection을 사용하지 않은 작업보다 성능이 떨어짐
    - 성능에 민감한 application에서 자주 호출되는 code엔 사용하지 말아야 함
2. Security Restrictions
    - Reflection은 security manager과 함께 실행될 때, runtime permission이 필요함
    - Applet같은 보안이 제한된 환경에서 주의해야 함
3. Exposure of Internals : 캡슐화를 저해할 수 있음
    - Reflection은 private한 property, method에 access할 수 있음
        - 'Field.setAccessible()' method를 true로 지정하면 외부에 공개되지 않는 private member도 접근과 조작이 가능함
    - Reflection을 사용하지 않은 code에서는 작동하지 않는 code를 수행할 수 있게 됨
    - 이는 예기치 않은 부작용이 발생시킬 수 있고, code 기능과 이식성을 저하시킬 수 있음
    - 또한 추상화를 깨뜨려 platform upgrade 시 동작이 변경될 수 있음

---

## Reference

- https://madplay.github.io/post/java-reflection
    - 개념
- https://medium.com/msolo021015/%EC%9E%90%EB%B0%94-reflection%EC%9D%B4%EB%9E%80-ee71caf7eec5
- https://docs.oracle.com/javase/tutorial/reflect/
    - 장단점
- https://gyrfalcon.tistory.com/entry/Java-Reflection
    - java reflection의 다양한 사용법
