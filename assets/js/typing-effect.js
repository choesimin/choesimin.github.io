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

/**
 * Animates text being typed
 * @param {HTMLElement} element - The DOM element to type text into
 * @param {string} text - The text to type
 * @param {number} speed - Typing speed (lower is faster)
 */
function type(element, text, speed = 50) {
  if (!text) {
    element.style.display = "none";
    return;
  }

  element.style.display = "block";
  element.innerHTML = "&nbsp;";
  
  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      element.innerHTML = text.substring(0, i + 1);
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}