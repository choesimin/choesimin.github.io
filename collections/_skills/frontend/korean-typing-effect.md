---
layout: skill
permalink: /191
title: HTML 한글 Typing 효과 직접 만들기
description: JavaScript로 한글 typing 효과를 직접 만들 수 있습니다.
date: 2024-01-11
---


## 한글 Typing 효과

- 두벌식 자판으로 한글을 typing하는 효과를 줄 수 있습니다.
    - 초성, 중성, 종성이 분리되어 차례대로 입력됩니다.

- 순수 JavaScript로 typing 효과를 만들 수 있지만, typing 효과 library 사용하는 것도 좋은 방법입니다.


### 함수 호출부

```html
<div id="target"></div>

<script>
    const target = document.getElementById('target');
    const text = '한글은 초성 중성 종성이 분리되어 차례대로 입력됩니다.\nEnglish is normally typed.';

    type(target, text);
    type(target, text, 100);    // 입력 속도 직접 설정 (높을수록 느리고, 낮을수록 빠름)
</script>
```


### 함수 선언부

```js
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
```



