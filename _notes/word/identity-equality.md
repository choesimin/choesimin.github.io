---
layout: note
---

# Identity(동일성) & Equality(동등성)

- 동일성(identity) 비교 : ==
    ```java
    Integer a = new Integer(3);
    Integer b = a;
     
    System.out.println(a);    //3
    System.out.println(b);    //3
    System.out.println(a == b);    //동일성 비교 true
    System.out.println(a.equals(b));    //동등성 비교 true
    ```
    - 참조 변수 a와 b가 같은 객체를 참조하고 있는지 비교
    - 동일성 비교가 참인 경우 같은 객체이므로 동등성 비교도 참이 됨

- 동등성(equality) 비교 : equals
    ```java
    Integer a = new Integer(3);
    Integer b = new Integer(3);
     
    System.out.println(a);    //3
    System.out.println(b);    //3
    System.out.println(a == b);    //동일성 비교 false
    System.out.println(a.equals(b));    //동등성 비교 true
    ```
    - 동등성 비교의 경우 최상위 객체인 Object의 equals method를 이용
    - Object의 equals method는 내부적으로 동일성 비교 연상을 하도록 되어 있으므로, 동일성이 참이 되어야 동등성도 참이 됨
    - 그러나 하위 class의 경우 이 equals method를 override하여 객체가 가지고 있는 정보의 동등성 비교로 사용하는 경우가 대부분임
    - Integer class의 경우 equals method를 override 했으며, 객체가 가지고 있는 정보(member 변수값)을 기준으로 동등성 비교를 함
        - 따라서, a와 b 객체가 동등성 비교에서는 참이지만 동일성 비교는 거짓이 됨

---

# Example

- String의 경우
    ```java
    String temp = "hello";

    String str = "hello";
    String str_ref = new String("hello");

    System.out.println(str == temp);    // true
    System.out.println(str_ref == temp);    // false
    ```
- Integer의 경우
    ```java
    Integer temp = 123;

    Integer i = 123;
    Integer i_ref = new Integer(123);

    System.out.println(i == temp);    // true
    System.out.println(i_ref == temp);    // false
    ```
    - 값을 128 이상으로, 혹은 -129 이하로 바꾼다면 원하는 값이 나오지 않음
        ```java
        Integer temp = 128;
        Integer i = 128;
        Integer i_ref = new Integer(128);
        ```
        - Integer은 다음과 같이 caching함
            ```java
            private static class IntegerCache {
              static final int low = -128;
              static {
                // high value my be configured by property
                int h = 127;
              }
            }
            ```
- 객체의 경우
    ```java
    class Product{

        private Long id;
        private String name;
        private Long price;

        public Product(Long id, String name, Long price) {
            this.id = id;
            this.name = name;
            this.price = price;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Long getPrice() {
            return price;
        }

        public void setPrice(Long price) {
            this.price = price;
        }
    }
    ```
    - equals overriding이 필요한 이유
        ```java
        Product product1 = new Product(1L, "iphone", 99L);
        Product product2 = new Product(1L, "iphone", 99L);

        System.out.println(product1 == product2);    // false
        System.out.println(product1.equals(product2));    // false
        ```
        - 두 번째는 true가 나올 줄 알지만 false가 나옴
            - true 값을 기대하려면 객체의 equals를 overriding해야 함
            - overriding하지 않은 경우 (Object의 equals)
                ```java
                public boolean equals(Object obj) {
                  return (this == obj);
                }
                ```
                - overriding하지 않았을 때는 이와 같이 reference를 비교함
            - overriding한 경우 (custom)
                ```java
                @Override
                public boolean equals(Object o) {
                    if (this == o) return true;
                    if (o == null || getClass() != o.getClass()) return false;
                    Product product = (Product) o;
                    return Objects.equals(id, product.id) &&
                        Objects.equals(name, product.name) &&
                        Objects.equals(price, product.price);
                }
                ```
                - 이렇게 product class에 overriding하면 product1.equals(product2) 했을 때 true 값을 얻을 수 있음
    - hashcode overriding이 필요한 이유
        ```java
        Set<Product> products = new HashSet<>();
        products.add(product1);
        products.add(product2);
        System.out.println(products.size());    // 2
        ```
        - Set은 중복을 허용하지 않지만 product1, product2라는 동일한 객체를 넣었을 때 size가 2가 나옴
            - Set은 내부적으로 hashCode를 호출하여 비교함
        - 따라서 overriding해야함
            ```java
            @Override
            public int hashCode() {
                return Object.hash(id, name, price);
            }
            ```
            - 이렇게 overridind하고 실행하면 결과는 원했던 1이 나옴
            - error를 없애기 위해 가능한 hashCode와 equal을 구현해주는 것이 좋음

---

# Reference

- http://wonwoo.ml/index.php/post/593
- https://dololak.tistory.com/44
