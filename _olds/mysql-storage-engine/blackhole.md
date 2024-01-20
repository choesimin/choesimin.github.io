---
layout: skill
---

# Blackhole Engine

- 저장 mechanism을 전혀 갖고 있지 않으며 모든 INSERT 구문을 실행하지 않고 그냥 버림
    - 그러나 server는 Blackhole table에 대한 query를 log에 기록하므로, 그 정보가 slave에 복제되거나 log에 남아 있을 수 있음

- 복잡한 복제 구성과 감사용 logging에 유용하게 사용할 수 있음




---




## Reference

- https://nomadlee.com/mysql-%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80-%EC%97%94%EC%A7%84-%EC%A2%85%EB%A5%98-%EB%B0%8F-%ED%8A%B9%EC%A7%95/