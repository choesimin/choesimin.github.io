---
layout: skill
permalink: /185
title: React - Project 시작 Template 사용하기 (CRA)
description: CRA(Create React App)는 Facebook에서 제공하는 React Boilerplate code입니다.
date: 2023-11-30
---


## CRA (Create React App)

- CRA([create-react-app](https://github.com/facebook/create-react-app))는 **Facebook에서 제공하는 React Boilerplate code**입니다.
    - Boilerplate code란 변경 programming에서 자주 반복되는 작업이나 pattern에 대한 일종의 표준화된 code를 의미합니다.

- CRA를 사용하면 초기 환경 설정 과정을 생략하면서, 안정적으로 설정된 source code를 가지고 project 를 시작할 수 있습니다.

- CRA로 만들어진 project 내에는 사용하지 않을 code와 file도 있기 때문에, 생성 후엔 정리하는 것이 좋습니다.
    1. 필요 없는 file을 삭제합니다.
    2. 삭제한 file을 import하는 code를 import하지 않도록 수정합니다.
    3. source folder(`/src`) 내의 구조를 사용하기 편한 구조로 수정합니다.
        - 예를 들어, components, hooks, pages, ...


### CRA 사용 방법

```sh
npx create-react-app my-app
cd my-app
npm start
```

- `npx`는 `npm` registry에 올라가 있는 package를 쉽게 설지차고 관리할 수 있도록 도와주는 CLI 도구입니다.
    - `npm`을 통해 설치하는 모든 종류의 Node.js 기반 file들을 간단하게 설치하고 실행할 수 있게 돕습니다.
    - `npx`는 5.2.0 version 이상의 `npm`에서 사용할 수 있습니다.


### CRA 초기 Project 구조

- CRA로 project를 생성하면 React 개발을 위한 folder와 file이 자동으로 생성됩니다.

```txt
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
```

#### `public` Folder

- 정적(static) file들이 위치합니다.
- image, CSS, HTML, JavaScript file처럼 내용이 고정되어 있어서, 별도의 처리 없이 file 내용을 그대로 보여줄 수 있는 file들이 저장됩니다.

| File | 설명 |
| 