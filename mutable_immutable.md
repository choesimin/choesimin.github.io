# Mutable & Immutable

## Mutable

- 변경이 가능
- instance가 일단 생성된 후에 값의 내용이 변할 수 있는 class
  - 주소는 못 바꿈
- ex) String을 제외한 참조 type 변수

## Immutable

- 변경이 불가능
- class의 instance가 일단 생성된 후에는 instance의 내용이 절대 변하지 않는 특성을 가지는 class
  - '='으로 다시 할당받기 전에는 바뀌지 않음
- ex) int 등의 기본 type, String 등
  - String은 immutable하기 때문에 새로 수정할 때마다, 기존 memory를 버리고 새로운 memory에 값을 넣어서 연결함
- 직접 immutable class를 만드는 방법
  - 

---

# Reference

- https://limkydev.tistory.com/68