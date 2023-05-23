---
layout: note
---

# Sequence diagram

```mermaid
sequenceDiagram
Alice->>John: Hello John, how are you?
loop Healthcheck
    John->>John: Fight against hypochondria
end
Note right of John: Rational thoughts!
John-->>Alice: Great!
John->>Bob: How about you?
Bob-->>John: Jolly good!
```

<pre>
```mermaid
sequenceDiagram
Alice->>John: Hello John, how are you?
loop Healthcheck
    John->>John: Fight against hypochondria
end
Note right of John: Rational thoughts!
John-->>Alice: Great!
John->>Bob: How about you?
Bob-->>John: Jolly good!
```
</pre>

- 위의 ```loop```는 ```alt```, ```opt```로 바꿔서 rectangle container를 생성할 수도 있음




---




# Reference

- https://github.com/mermaid-js/mermaid#sequence-diagram-docs---live-editor