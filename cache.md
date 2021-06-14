# Cache
- 뜻 : 고속완충기, 고속완충기억기
- data나 값을 미리 복사해놓는 임시 장소
- 저장 공간이 작고 비용이 비싼 대신 빠른 성능 제공
- cache에 data를 미리 복사해놓으면 계산이나 접근 시간 없이 더 빠른 속도로 data에 접근 가능
- memory에 data를 저장하였다가 불러다 사용하는 것을 의미
	- 반복적으로data를 불러오는 경우, 지속적으로 DBMS 혹은 server에 요청하지 않아도 됨
- enterprise급 application에서 DBMS의 부하를 줄이고 성능을 높이기 위해 사용
- 필요성
	- Long Tail 법칙
		- 20%의 요구가 system resource의 대부분을 사용한다는 법칙
	- 따라서 20%의 기능에 cache를 이용함으로써 resource 사용량을 대폭 줄이고 성능은 대폭 향상시킬 수 있음
---




# Cache Hit & Cache Miss
- Cache Hit
	- 원하는 data가 cache에 존재할 경우 해당 data를 반환하는 경우
- Cache Miss
	- 원하는 data가 cache에 존재하지 않을 경우 DBMS 또는 server에 요청하는 경우
- cache는 저장공간이 작기 때문에 지속적으로 cache miss가 발생하는 data의 경우 cache 전략에 따라서 저장 중인 data를 변경해야함
---




# Local Cache vs Global Cache
- Local Cache
	- local 장비 내에서만 사용되는 cache
	- local 장비의 resource 이용 (memory, disk)
	- local에서만 작동하기 때문에
		- 속도가 빠름
		- 다른 server와 data 공유 어려움
- Global Cache
	- 여러 server에서 cache server에 접근하여 사용하는 cache
	- data를 분산하여 저장 가능
		- Replication : data를 복제
		- Sharding : data를 분산하여 저장
	- local cache에 비애 상대적으로 느림 (network traffic)
	- 분산된 cache로 server에서 data를 저장하고 조회 가능
	- 별도의 cache server를 이용하기 때문에 server 간의 data 공유가 쉬움
---




# Principle of Locality
- 지역성의 원리
- '자주 사용하는 data'에 관한 판단은 지역성의 원리를 따름
- 시간 지역성 (temporal locality)
	- 최근 접근한 data에 다시 접근하는 경향
- 공간 지역성 (spatial locality)
	- 최근 접근한 data의 주변 공간에 다시 접근하는 경향
---




# 사용하는 경우
- 접근 시간에 비해 원래 data를 접근하는 시간이 오래 걸리는 경우 (server의 균일한 API data)
- 반복적으로 동일한 결과를 돌려주는 경울 (image나 thumbnail 등)
---




# References
- https://ko.wikipedia.org/wiki/%EC%BA%90%EC%8B%9C
- https://mangkyu.tistory.com/69
- https://jaehun2841.github.io/2018/11/07/2018-10-03-spring-ehcache/#long-tail-%EB%B2%95%EC%B9%99
- https://parksb.github.io/article/29.html
	- 추가 필요
