# for & for-each

## for each

```java
public static void main(String[] args) {

    int array[] = {1, 2, 3, 4, 5};

    for (int number : array) {
        System.out.println(array[i]);
    }
}
```
- modern programming 언어에서는 이미 지원하고 있는 형태의 문법 ex) python
- for문을 사용하여 collection의 index를 사용했던 방식에서 collection data를 하나씩 뽑아주는 형태로 변경됨
- 배열의 경우 IndexOutOfBoundsException 위협이 사라짐
    - IndexOutOfBoundsException : 가지고 있는 size보다 추가할 index가 클 경우 발생하는 오류
- for-each를 사용했을 때 발생하던 속도 저하 문제는 최근 update들로 인해 해결됨

## for

```java
public static void main(String[] args) {

    int array[] = {1, 2, 3, 4, 5};

    for (int i = 0; i < array.length; i++) {
        System.out.println(array[i]);
    }
}
```

--- 

# for-each문을 사용할 수 없는 경우

- 순회하는 도중 특정한 원소를 찾을 때
- 특정한 원소의 값을 수정해야할 경우
- 직렬이 아닌 병렬적으로 순회할 경우

---

# Reference

- https://soft.plusblog.co.kr/69
