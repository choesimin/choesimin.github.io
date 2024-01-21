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