---
layout: note
---

# HashMap

## 생성하면서 값도 같이 넣기

```java
HashMap<String, String> headers = new HashMap<String, String>() {
    {
        put("X-Secret-Key", SECRET);
    }
};
String response = httpManager.post(String.format(URL, APPKEY), headers, body);
```

---

# Reference

