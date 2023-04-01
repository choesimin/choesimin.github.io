---
layout: note
---

# PM2

- Process Manager
    - process를 관리해주는 역할
- 생산 process 관리자로 server instance들에 대한 load balancing과 Node.js의 scale up 또는 scale down을 도움
- process들이 계속 실핻할 수 있는 환경을 제공함
- 처리하지 못한 에외에 thread가 죽음으로 인해 application이 죽는 현상을 방지함

## pm2 -version

- version 확인 명령어

## pm2 start example.js

- pm2를 실행하는 명령어로 server source code가 작성되어있는 js file을 실행

| Option | Desc |
| - | - |
| --watch | pm2가 실행된 process의 변경 사항을 감지하여 server를 자동 reload해줌 |
| -i max([core 개수]) | Node.js의 single thread를 보완하기 위한 cluster mode |

## pm2 restart

- application을 재시작

| Option | Desc |
| - | - |
| all | 모든 application 재시작 |
| [application name] | 해당 application 재시작 |

## pm2 kill

- 실행 중인 pm2 daemon을 종료시킴

## pm2 list

- pm2에 등록된 관리 list 조회

## pm2 log [application_name]

- 실행 중인 pm2 daemon의 log를 확인

## pm2 monit [application_name]

- pm2로 실행한 server의 상황을 monitoring

## pm2 info [application_name]

- application 정보 조회

---

# Reference

- https://kmseop.tistory.com/152
