# Mac OS

## 사용 중인 port의 PID 확인

```sh
lsof -i :[PORTNUM]
```

## 해당 PID process를 종료

```sh
kill -9 [PID]
```

## 반복 입력 가능하도록 설정

```sh
defaults write -g ApplePressAndHoldEnabled -bool false
```

## folder, file 찾기

```sh
find / -name [search keyword]
```

## terminal에서 ssh 사용 시 한글이 물음표로 깨져 나올 때

- preference -> Profiles -> Advanced tab > International > Set locale invironment variables on startup 해제

---

# Reference

- https://diana-an.tistory.com/12
    - terminal 한글 깨짐
