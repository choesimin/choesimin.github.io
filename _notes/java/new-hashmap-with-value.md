---
layout: note
title: Java - HashMap의 값을 지정하여 생성하기
date: 2023-10-23
---

```java
HashMap<String, String> map = new HashMap<String, String>() {
    {
        put("key", value);
    }
};
```
