---
layout: note
---

# CSV Engine

- 쉽표로 구분된 값(Comma Separated Values)으로 구성된 file을 table로 처리할 수 있지만 index를 지원하지는 않음
- server가 실행되는 동안에 database 내외로 file을 복사하게 해줌
- Spreadsheet에서 CSV file을 내보내 MySQL server의 data directory에 저장하면 server는 그 즉시 이 file을 읽을 수 있음
- 마찬가지로 CSV table에 data를 기록하면 외부 program이 이를 바로 읽을 수 있음


---


## Reference

- https://nomadlee.com/mysql-%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80-%EC%97%94%EC%A7%84-%EC%A2%85%EB%A5%98-%EB%B0%8F-%ED%8A%B9%EC%A7%95/