---
layout: note
permalink: /444
title: Node.js - Browser 밖에서 동작하는 JavaScript Runtime
description: Node.js는 V8 engine 기반의 JavaScript runtime으로, single thread event loop와 non-blocking I/O model을 통해 높은 동시성을 확보하며, npm 생태계와 함께 server-side 개발의 핵심 platform으로 자리잡았습니다.
date: 2026-04-02
---


## Node.js

- Node.js는 **Chrome V8 JavaScript engine으로 build된 JavaScript runtime**입니다.
    - browser 안에서만 실행되던 JavaScript를 browser 밖에서도 실행할 수 있게 합니다.
    - event 기반, non-blocking I/O model을 사용하여 가볍고 효율적입니다.
    - package 생태계인 npm은 세계에서 가장 큰 open source library 생태계입니다.

- Node.js는 Ryan Dahl이 2009년에 발표하였습니다.
    - Google이 Chrome browser를 위해 개발한 V8 engine을 활용하여 만들었습니다.
    - Ruby의 Event Machine, Python의 Twisted에서 영향을 받았지만, event loop를 library가 아닌 runtime 자체에 내장한 점이 다릅니다.

```js
const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
```


---


## V8 Engine

- V8은 **Google이 C++로 개발한 고성능 JavaScript engine**입니다.
    - Chrome browser에서 JavaScript를 실행하기 위해 만들어졌습니다.
    - JavaScript를 bytecode로 compile한 뒤, JIT(Just-In-Time) compilation으로 기계어로 변환하여 실행 속도를 높입니다.
    - Node.js는 이 engine을 browser 밖에서 독립적으로 사용합니다.

- V8 외에도 다양한 JavaScript engine이 존재합니다.
    - Firefox의 SpiderMonkey, Safari의 JavaScriptCore 등이 있으며, 모두 ECMAScript 표준을 구현합니다.
    - Node.js는 V8을 사용하기 때문에, 최신 ECMAScript 문법을 사용자 browser 호환성 걱정 없이 사용할 수 있습니다.


---


## Single Thread Event Loop

- Node.js는 **single thread event loop 기반으로 동작**합니다.
    - 하나의 thread가 모든 요청을 처리하되, I/O 작업은 비동기로 위임합니다.
    - 요청마다 새로운 thread를 생성하지 않으므로 thread 관리 overhead가 없습니다.
    - deadlock이 발생하지 않습니다.

- event loop는 Node.js의 핵심 mechanism입니다.
    - input script를 실행한 후 자동으로 event loop에 진입합니다.
    - 처리할 callback이 없으면 event loop를 종료하고 process가 끝납니다.
    - browser JavaScript의 event loop와 유사하지만, server 환경에 맞게 확장되었습니다.


### Event Loop의 Phase

- event loop는 **여러 phase를 순환하며 callback을 실행**합니다.
    - 각 phase에는 FIFO queue가 있으며, queue의 callback을 순서대로 처리합니다.
    - queue가 비거나 최대 실행 횟수에 도달하면 다음 phase로 넘어갑니다.

```plaintext
┌───────────────────────────┐
│         timers            │  setTimeout, setInterval callback 실행
└─────────────┬─────────────┘
┌─────────────┴─────────────┐
│     pending callbacks     │  system 수준 callback (TCP error 등)
└─────────────┬─────────────┘
┌─────────────┴─────────────┐
│       idle, prepare       │  내부 전용
└─────────────┬─────────────┘
┌─────────────┴─────────────┐
│           poll             │  I/O event 수신 및 callback 실행
└─────────────┬─────────────┘
┌─────────────┴─────────────┐
│           check           │  setImmediate callback 실행
└─────────────┬─────────────┘
┌─────────────┴─────────────┐
│      close callbacks      │  socket.on('close') 등
└───────────────────────────┘
```

| phase | 역할 |
| --- | --- |
| **timers** | `setTimeout`과 `setInterval`로 예약된 callback 실행 |
| **pending callbacks** | 이전 loop에서 지연된 I/O callback 실행 |
| **poll** | 새로운 I/O event를 가져오고, I/O 관련 callback 실행 |
| **check** | `setImmediate`로 예약된 callback 실행 |
| **close callbacks** | `socket.destroy()` 등의 close event 처리 |


### `process.nextTick()`과 `setImmediate()`

- `process.nextTick()`은 **현재 작업이 끝난 직후, 다음 event loop phase로 넘어가기 전에 실행**됩니다.
    - event loop의 어떤 phase에서든 호출 시점에 즉시 예약됩니다.
    - 재귀 호출 시 I/O를 starve(고갈)시킬 수 있으므로 주의가 필요합니다.

- `setImmediate()`는 **현재 poll phase가 완료된 후 check phase에서 실행**됩니다.
    - I/O cycle 내에서 호출하면 항상 `setTimeout(fn, 0)`보다 먼저 실행됩니다.

- 이름과 실제 동작이 반대라서 혼동하기 쉽습니다.
    - `process.nextTick()`이 `setImmediate()`보다 더 즉각적으로 실행됩니다.
    - 역사적 이유로 이름 변경이 불가능하며, 공식 문서에서는 `setImmediate()` 사용을 권장합니다.


---


## Non-Blocking I/O

- Node.js는 **I/O 작업을 비동기로 처리하여 thread를 차단하지 않습니다**.
    - file 읽기, network 요청, database 조회 등의 I/O 작업을 OS kernel이나 libuv의 thread pool에 위임합니다.
    - 작업이 완료되면 callback을 event loop의 queue에 등록하여 처리합니다.
    - CPU cycle을 낭비하지 않고 다른 요청을 처리할 수 있습니다.

- blocking 방식과 non-blocking 방식의 차이는 동시 처리 성능에 큰 영향을 줍니다.
    - 요청 하나에 50ms가 걸리고 그중 45ms가 database I/O라면, non-blocking 방식은 45ms 동안 다른 요청을 처리할 수 있습니다.

```js
// blocking (synchronous)
const fs = require('node:fs');
const data = fs.readFileSync('/file.md');  // file 읽기가 끝날 때까지 thread 차단
console.log(data);
moreWork();  // readFileSync 이후에 실행

// non-blocking (asynchronous)
fs.readFile('/file.md', (err, data) => {
    if (err) throw err;
    console.log(data);  // file 읽기가 끝나면 callback으로 실행
});
moreWork();  // readFile 호출 직후 바로 실행
```


### libuv

- libuv는 **Node.js의 비동기 I/O를 담당하는 C library**입니다.
    - event loop 구현체이며, cross-platform을 지원합니다.
    - file system, DNS, network 등의 비동기 작업을 처리합니다.
    - OS kernel이 지원하지 않는 비동기 작업은 내부 thread pool(기본 4개)을 사용합니다.


---


## Thread 기반 동기 방식과의 비교

- 전통적인 server는 **요청마다 thread를 생성하여 처리**합니다.
    - 하나의 thread가 요청을 받으면 모든 처리가 완료될 때까지 대기합니다.
    - 동시 요청이 많아지면 thread 수가 증가하여 memory 사용량이 급증합니다.
    - thread 간 context switching overhead가 발생합니다.

- Node.js는 **single thread로 다수의 동시 요청을 처리**합니다.
    - I/O 작업을 기다리지 않고 다음 요청을 즉시 처리합니다.
    - thread 생성 비용과 context switching이 없습니다.
    - 단, CPU 집약적 작업은 single thread를 차단하므로 적합하지 않습니다.

```
Thread 기반 (blocking I/O) :
    Thread 1  ████████████░░░░░░████████
    Thread 2  ░░░████████████░░░░░░░░░░░
    Thread 3  ░░░░░░████████████░░░░░░░░
              ↑ 요청마다 thread 할당, I/O 대기 시간 동안 thread 점유

Node.js (non-blocking I/O) :
    Thread    ██░██░██░██░██░██░██░██░██
              ↑ 단일 thread가 I/O 대기 없이 요청을 순환 처리
```


---


## Multi-Core 활용

- Node.js는 single thread이지만, **`child_process`와 `cluster` module로 multi-core CPU를 활용**할 수 있습니다.

- `child_process.fork()`는 새로운 Node.js process를 생성합니다.
    - 부모-자식 process 간 IPC(Inter-Process Communication) channel로 message를 주고받습니다.

- `cluster` module은 동일한 port를 공유하는 여러 worker process를 생성합니다.
    - master process가 요청을 각 worker에 분배합니다.
    - CPU core 수만큼 worker를 생성하여 부하를 분산합니다.

```js
const cluster = require('node:cluster');
const http = require('node:http');
const os = require('node:os');

if (cluster.isPrimary) {
    const numCPUs = os.cpus().length;
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('Hello World');
    }).listen(8000);
}
```

- `worker_threads` module은 동일 process 내에서 thread를 생성합니다.
    - `cluster`와 달리 memory를 공유할 수 있습니다.
    - CPU 집약적 작업을 main thread에서 분리할 때 유용합니다.


---


## npm

- npm(Node Package Manager)은 **Node.js의 기본 package manager**입니다.
    - Node.js 설치 시 함께 설치됩니다.
    - 세계 최대의 software registry로, 수백만 개의 open source package를 제공합니다.
    - `package.json` file로 project의 의존성을 관리합니다.

```bash
npm init              # package.json 생성
npm install express   # package 설치
npm install -D jest   # 개발 의존성으로 설치
npm run start         # script 실행
```

- npm 외에 yarn, pnpm 등의 대체 package manager도 있습니다.
    - yarn은 Facebook이 개발하였으며, 병렬 설치로 속도를 개선합니다.
    - pnpm은 hard link를 사용하여 disk 공간을 절약합니다.


---


## Node.js의 적합한 사용 사례

- Node.js가 적합한 경우는 **I/O가 많고 실시간 처리가 필요한 service**입니다.
    - 대량의 동시 접속을 처리하는 web server.
    - real-time chatting service (WebSocket).
    - streaming service.
    - REST API server.
    - 빠른 prototyping이 필요한 project.

- Node.js가 적합하지 않은 경우는 **CPU 집약적 작업이 많은 service**입니다.
    - image/영상 처리, 복잡한 수학 연산 등은 single thread를 장시간 점유합니다.
    - single thread 특성상 하나의 작업이 오래 걸리면 나머지 모든 요청이 대기합니다.
    - error 발생 시 process가 종료될 수 있으므로 안정성 확보가 중요합니다.


---


## Reference

- <https://nodejs.org/en/about>
- <https://nodejs.org/en/learn/getting-started/introduction-to-nodejs>
- <https://nodejs.org/en/learn/asynchronous-work/overview-of-blocking-vs-non-blocking>
- <https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick>
- <https://nodejs.org/en/learn/getting-started/the-v8-javascript-engine>

