---
layout: note
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

```plaintext
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
| --- | --- |
| `index.html` | Web site의 **기본 page**로 사용됩니다.<br>처음 접속할 때, 자동으로 load되어 화면에 표시됩니다. |
| `menifest.json` | PWA((Progressive Web Apps))에 필수적으로 포함되어야하는 file입니다.<br>PWA란 Web과 Native App이 가진 단점을 개선하는 새로운 형태의 Web app을 의미합니다. |

#### `src` Folder

- React application의 주요 개발 영역입니다.
- application을 구성하는 주요 code file들이 위치합니다.
- project 구조의 일부로써, application의 구현과 기능을 정의하는 데에 사용됩니다.
- 주로 component, module, resource 등이 포함됩니다.

| File | 설명 |
| --- | --- |
| `App.js` | application의 **main component**입니다. `public/index.html`에 rendering할 내용을 정의합니다. |
| `App.css` | application에서 사용할 CSS Style을 정의합니다.<br>`App.js`에서 이 file을 import하여 style을 적용할 수 있습니다. |
| `App.test.js` | `App.js`의 test code입니다. |
| `index.js` | Web pack에서 aplication의 시작점(entry point)이 되는 file입니다.<br>application을 실행하는 **main program**으로, application의 초기 설정 및 loading 절차를 담당합니다. |


---


## Reference

- <https://sugoring-it.tistory.com/149>
