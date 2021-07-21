# Session

- client 별로 server에 저장되는 정보

---

# Client Server, Back-end Server 따로 돌아갈 때 문제

- server가 2개가 따로 돌아가고 있기 때문에 발생
	- session.setAttribute("??", ??)을 했을 때, back-end server에는 session 값이 저장되지만, client server에는 전혀 영향을 주지 못함
- 따라서 session에 넣은 값이 필요한 통신을 하기 전에 back-end server에서 client server로 보내주는 작업이 필요함
	- 그냥 꺼내서 사용할 수 없음

---

# Reference

- https://enai.tistory.com/29
