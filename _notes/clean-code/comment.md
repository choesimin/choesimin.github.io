<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1" />
    <link rel="stylesheet" href="/assets/css/base.css">
    <script src="https://unpkg.com/simple-jekyll-search@latest/dest/simple-jekyll-search.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
    <!-- Begin Jekyll SEO tag v2.8.0 -->
<title>Git - Source Code Version 관리하기 | 기술시민</title>
<meta name="generator" content="Jekyll v4.3.2" />
<meta property="og:title" content="Git - Source Code Version 관리하기" />
<meta name="author" content="최시민" />
<meta property="og:locale" content="en_US" />
<meta name="description" content="Git : DVSC(Distributed Version Control System)" />
<meta property="og:description" content="Git : DVSC(Distributed Version Control System)" />
<link rel="canonical" href="http://localhost:4000/notes/tool/git/" />
<meta property="og:url" content="http://localhost:4000/notes/tool/git/" />
<meta property="og:site_name" content="기술시민" />
<meta property="og:type" content="article" />
<meta property="article:published_time" content="2023-04-06T00:00:00+09:00" />
<meta name="twitter:card" content="summary" />
<meta property="twitter:title" content="Git - Source Code Version 관리하기" />
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"BlogPosting","author":{"@type":"Person","name":"최시민"},"dateModified":"2023-04-06T00:00:00+09:00","datePublished":"2023-04-06T00:00:00+09:00","description":"Git : DVSC(Distributed Version Control System)","headline":"Git - Source Code Version 관리하기","mainEntityOfPage":{"@type":"WebPage","@id":"http://localhost:4000/notes/tool/git/"},"url":"http://localhost:4000/notes/tool/git/"}</script>
<!-- End Jekyll SEO tag -->


    <script>
        String.prototype.toKorChars = function () {
            var cCho = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'],
                cJung = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'],
                cJong = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'],
                cho, jung, jong;
            var str = this,
                cnt = str.length,
                chars = [],
                cCode;
            for (var i = 0; i < cnt; i++) {
                cCode = str.charCodeAt(i);
                if (cCode == 32) {
                    chars.push(" ");
                    continue;
                }
                if (cCode < 0xAC00 || cCode > 0xD7A3) {
                    chars.push(str.charAt(i));
                    continue;
                }
                cCode = str.charCodeAt(i) - 0xAC00;

                jong = cCode % 28;
                jung = ((cCode - jong) / 28) % 21
                cho = (((cCode - jong) / 28) - jung) / 21

                chars.push(cCho[cho]);
                chars.push(String.fromCharCode(44032 + (cho * 588) + (jung * 28)));
                if (cJong[jong] !== '') {
                    chars.push(String.fromCharCode(44032 + (cho * 588) + (jung * 28) + jong));
                }
            }
            return chars;
        }

        function type(element, text, interval = 50) {
            let charUnits = [];

            text = text.split('');
            for (let i = 0; i < text.length; i++) {
                charUnits[i] = text[i].toKorChars();
            }

            let charIndex = 0;
            let unitIndex = 0;

            text = '';
            let typing = setInterval(function () {
                if (charIndex <= charUnits.length - 1) {
                    element.innerText = text + charUnits[charIndex][unitIndex];
                    unitIndex++;
                    if (unitIndex === charUnits[charIndex].length) {
                        text += charUnits[charIndex][unitIndex - 1];
                        charIndex++;
                        unitIndex = 0;
                    }
                } else {
                    clearInterval(typing);
                    return;
                }
            }, interval);
        }
    </script>
</head>

<body>
    <nav>
        <a id="logo" href="/"><img /></a>
        <input id="searchInput" type="text" placeholder="제목, 내용, 날짜" oninput="window.scrollTo(0,0);">
        <div>
            <a id="theme" onclick="toggleTheme()"><img></a>
            <a id="search" onclick="toggleSearch()"><img></a>
        </div>
    </nav>
    <div id="searchResult"></div>
    <main>
        <div id="progressBar"></div>

<article>
    <h1 id="title">Git - Source Code Version 관리하기</h1>
    <p id="date">2023년 4월  6일</p>
    <ul id="index"></ul>
    <h2 id="git--dvscdistributed-version-control-system">Git : DVSC(Distributed Version Control System)</h2>

<ul>
  <li>분산 Version 관리 System입니다.
    <ul>
      <li>여러 명의 사용자들 간의 file에 대한 작업을 조율하는 데에 사용됩니다.</li>
    </ul>
  </li>
  <li>주로, 여러 명의 개발자가 하나의 software를 개발할 때, source code를 관리하기 위해 사용합니다.</li>
</ul>

<h2 id="git의-장점">Git의 장점</h2>

<ul>
  <li>internet 연결이 되지 않은 곳에서도 개발을 진행할 수 있습니다.</li>
  <li>중앙 저장소가 삭제되어도 복구가 가능합니다.
    <ul>
      <li>local 저장소에도 source가 저장되어 있기 때문입니다.</li>
    </ul>
  </li>
  <li>여러 개발자들이 병렬 개발하기 좋습니다.
    <ul>
      <li>각 개발자들은 자신의 branch에서 개발한 뒤, main branch에 merge합니다.</li>
    </ul>
  </li>
</ul>

    <div id="stamp">
        <img src="/assets/image/stamp/original.png">
    </div>
</article>

<script>
    const title = document.getElementById('title');
    type(title, title.innerText);

    const date = document.getElementById('date');
    type(date, date.innerText, 80);

    const index = document.getElementById('index');
    const headers = document.querySelectorAll('h1,h2,h3,h4,h5,h6');

    for (let i = 0; i < headers.length; i++) {
        const header = headers[i];

        const anchor = document.createElement('a');
        anchor.innerHTML = header.innerText;
        anchor.href = '#' + header.id;

        const item = document.createElement('li');
        item.appendChild(anchor);
        item.style.marginLeft = (parseInt(header.tagName.replace('H', '')) - 1) * 15 + 'px';

        index.appendChild(item);
    }

    window.onscroll = function () {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        document.getElementById('progressBar').style.width = scrolled + "%";
    };
</script>

<link rel="stylesheet" href="/assets/css/note.css">
    </main>
    <footer>
        <hr>
        <p>(C) 2024. 최시민 all rights reserved.</p>
    </footer>
</body>

<script>
    let hljsStyle = document.createElement('link');
    hljsStyle.rel = 'stylesheet';
    document.head.appendChild(hljsStyle);

    setTheme();


    SimpleJekyllSearch({
        searchInput: document.getElementById('searchInput'),
        resultsContainer: document.getElementById('searchResult'),
        json: '/search.json',
        searchResultTemplate: `<li><a href="http://localhost:4000{url}">{title}</a></li>`
    });

    function toggleSearch() {
        var searchInput = document.getElementById('searchInput');
        var searchResult = document.getElementById('searchResult');
        if (getComputedStyle(searchInput).display === 'none' || getComputedStyle(searchResult).display === 'none') {
            searchInput.style.display = 'block';
            searchResult.style.display = 'block';
            searchInput.focus();
        } else {
            searchInput.style.display = 'none';
            searchResult.style.display = 'none';
        }
    }

    function setTheme() {
        if (localStorage.getItem('theme') === 'light') {
            setLightTheme();
        } else if (localStorage.getItem('theme') === 'dark') {
            setDarkTheme();
        } else {
            localStorage.setItem('theme', 'light');
            setLightTheme();
        }
    }

    function toggleTheme() {
        const theme = localStorage.getItem('theme');
        if (theme === 'light') localStorage.setItem('theme', 'dark');
        else localStorage.setItem('theme', 'light');

        setTheme();
        if (document.querySelector('.language-mermaid') !== null) location.reload(true);
    }

    function setLightTheme() {
        document.body.style.setProperty('--background-color', '#eeeeee');
        document.body.style.setProperty('--background-highlight-color', '#dddddd');
        document.body.style.setProperty('--color', '#111111');
        document.body.style.setProperty('--code-color', '#880000');
        document.body.style.setProperty('--highlight-color', '#000000');
        document.body.style.setProperty('--border-color', '#aaaaaa');

        document.getElementById('logo').getElementsByTagName('img')[0].src = "/assets/image/stamp/black.png";
        document.getElementById('theme').getElementsByTagName('img')[0].src = "/assets/icon/moon/black.svg";
        document.getElementById('search').getElementsByTagName('img')[0].src = "/assets/icon/magnifier/black.svg";

        hljsStyle.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/vs.min.css';
        hljs.highlightAll();

        renderMermaid('neutral');
    }

    function setDarkTheme() {
        document.body.style.setProperty('--background-color', '#111111');
        document.body.style.setProperty('--background-highlight-color', '#222222');
        document.body.style.setProperty('--color', '#cccccc');
        document.body.style.setProperty('--code-color', '#bbddff');
        document.body.style.setProperty('--highlight-color', '#ffffff');
        document.body.style.setProperty('--border-color', '#444444');

        document.getElementById('logo').getElementsByTagName('img')[0].src = "/assets/image/stamp/white.png";
        document.getElementById('theme').getElementsByTagName('img')[0].src = "/assets/icon/sun/white.svg";
        document.getElementById('search').getElementsByTagName('img')[0].src = "/assets/icon/magnifier/white.svg";

        hljsStyle.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/vs2015.min.css';
        hljs.highlightAll();

        renderMermaid('dark');
    }

    async function renderMermaid(theme) {
        mermaid.initialize({
            theme: theme,
            startOnLoad: false,
            securityLevel: 'loose',
        });
        await mermaid.run({ querySelector: '.language-mermaid' });
    }
</script>

</html>