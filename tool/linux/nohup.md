# nohup

- 'No Hang Up'의 약자 : 끊지 마!
- logout으로 session과의 연결이 종료되어도 program이 종료되지 않음
    - program을 daemon의 형태로 실행시키는 것이기 때문

- 사용법
    - 실행하고자 하는 program 명령어 앞에 'nohup'를 붙이면 됨
    - `>`, `>>` 같은 redirection을 이용해서 다른 file에 출력할 수 있음
        ```sh
        nohup ./my_shellscript.sh > nohup_script.out
        ```
    - 어디에도 표준 출력을 기록하고 싶지 않을 때
        ```sh
        nohup ./my_shellscript.sh > /dev/null
        ```




# &

- program 실행 시에 명령어 맨 끝에 붙이면 foreground가 아니라 background로 실행됨
    ```sh
    ./my_shellscript.sh & 
    ```
- background로 돌고 있는지 확인
    ```sh
    ps -ef | grep my_shellscript.sh
    ```

- logout으로 session과 연결이 끊어지면 실행되고 있던 program도 함께 종료됨
    - 단지 program을 사용자 눈에 보이지 않는 background 형태로 돌리고 있는 것이기 때문
- 그러나 언젠가부터 `&`가 nohup과 유사하게 동작하게 됨
    - session이 끊어져도 program이 종료되지 않는 option이 default로 바뀌었기 때문
- `shopt`로 `&` default option 확인해보기
    - shopt : shell option을 조회해볼 수 있는 명령어
    - `huponexit off`라고 나오면 `&`만으로만 program을 실행해도 session 연결 종료 시에 program이 종료되지 않음
    ```sh
    shopt | grep huponexit
    ```




# 가장 안전한 background에서 실행 방법 : `nohup` + `&`

```sh
nohup ./my_shellscript.sh &
```
- 어떤 program을 종료 없이 background에서 실행시키고 싶다면 nohup과 &(background)을 조합해서 쓰는게 제일 확실하고 안전한 방법임




# Log

- nohup을 사용하면 기본적으로 nohup.out에 표준 출력이 쌓임


## 다른 방식으로 log 쌓기

```
0 | 표준 입력
1 | 표준 출력
2 | 표준 error
```

### 표준 출력과 표준 error를 각각 다른 file에 쓰기

```sh
nohup ./my_shellscript.sh 1 > my_shellscript.out 2 > my_shellscript.err &
```
- 표준 출력(1)은 my_shellscript.out file로 redirection하고, 표준 error(2)는 my_shellscript.err file로 redirection 하겠다는 뜻

### 한 파일에 표준 출력과 표준 error를 같이 쓰기

```sh
nohup ./my_shellscript.sh > my_shellscript.log 2>&1 &
```
- 표준 출력(1)을 my_shellscript.log에 쓰고 표준 error(2)도 표준 출력(1)이 쓰여지는 file에 redirection 하겠다는 뜻




# Background에 떠 있는 Proess 종료하는 법

- ps 명령어를 통해서 process id를 알아내고, kill 명령어로 process를 종료시키면 됨

- process id 알아내기
    ```sh
    ps -ef | grep my_shellscript.sh
    ```

- process 종료
    ```sh
    kill -9 {process_id}
    ```




---

# Reference

- https://joonyon.tistory.com/entry/%EC%89%BD%EA%B2%8C-%EC%84%A4%EB%AA%85%ED%95%9C-nohup-%EA%B3%BC-%EB%B0%B1%EA%B7%B8%EB%9D%BC%EC%9A%B4%EB%93%9C-%EB%AA%85%EB%A0%B9%EC%96%B4-%EC%82%AC%EC%9A%A9%EB%B2%95
