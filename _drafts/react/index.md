# React Project 생성하기


1. Node.js 설치
2. npx create-react-app [project_name]






- node_modules
    - library들
    - npm으로 설치하는 것들이 여기로 ㅡㄷㄹ어감
- public
    - 정적 file이 들어감
    - 설정 관련 정보 등
- src
    - 개발하는 code가 여기 들어감
- package.json
    - 전체 project에 대한 정보
    - project이름, 현재 versoin, provate 여부(npm에 등록했을 때 공개할지)
    - dependencies : app을 운영에서 구동할 때 필요한 module들의 정보
- README.md



- 실행하면 제일 먼저 실행되는 file은 `src/index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';    // src/app.js를 의미함
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));  // public/index.html의 root id를 가진 element를 불러와 이 안에 jsx를 rendering 함
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);  // 1. jsx 형식으로 javascript 안에서 xml 형식을 사용할 수 있게 함
// 2. React.StrictMode는 javascritp 엄격 mode

reportWebVitals();    // 성능을 측정하고 싶을 때 사용하는 함수
```
- 그리고 다른 page에 들어가도, index.js 안의 화면이 바뀌는 것


- `src/index.js`에서 `src/App.js`를 실행해 첫 화면을 띄움

```js
import logo from './logo.svg';
import './App.css';

// jsx로 가장 먼저 보일 화면을 정의함
// jsx 문법은 html 문법과 동일하지 않음
// jsx는 className, html은 class
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```


- src 안에 작성하는 page source code
    - 최근에는 함수형 comopnent로 개발하는 추세

```js
// 함수형 component
import React from "react";

function Home() {
    return <h1>Home 화면입니다.</h1>
}

export default Home;
```

```js
// Arrow function component
import React from "react";

const Home = () => {
    return <h1>Home 화면입니다.</h1>
}

export default Home;
```


```js
// Class component
import React, {Component} from "react";

class Home extends Component {
    render() {
        return <h1>Home 화면입니다.</h1>
    }
}

export default Home;
```

- SPA
- root 안에 있는 component만 바꾸기 때문에 화면 전환이 빠름
    - 화면 이동 시, 화면을 전부 다시 그릴 필요가 없기 때문


- router 설정하여, url에 보여줄 component를 mapping할 수 있음
    - `npm install react-router-dom` 설치
    - `react-router-dom` import
    - component에서 사용하기






# Reference

- <https://www.youtube.com/watch?v=6GECT2Jrr_g>