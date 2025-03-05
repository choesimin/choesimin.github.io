const fs = require('fs');
const path = require('path');

// 모든 파일을 재귀적으로 가져오는 함수
function getAllFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);

    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat && stat.isDirectory()) {
            // 하위 디렉토리의 파일들을 재귀적으로 추가
            results = results.concat(getAllFiles(filePath));
        } else if (file.endsWith('.md')) {
            // 마크다운 파일만 추가
            results.push(filePath);
        }
    });

    return results;
}

// _skills 폴더 경로
const skillsDir = path.join(__dirname, '/collections/_skills');
console.log(`Base directory: ${__dirname}`);
console.log(`Skills directory: ${skillsDir}`);

// 모든 마크다운 파일 가져오기
try {
    const files = getAllFiles(skillsDir)
        .filter(file => file.endsWith('.md'))
        .sort(() => Math.random() - 0.5); // 파일을 랜덤한 순서로 정렬

    // 파일 목록 출력
    files.forEach((file, index) => {
        // 상대 경로로 변환하여 출력
        const relativePath = path.relative(skillsDir, file);
        console.log(`${index + 1}. ${relativePath}`);
    });

    console.log(`총 ${files.length}개의 마크다운 파일을 찾았습니다.`);

    // 각 파일에 permalink 추가
    files.forEach((file, index) => {
        const filePath = path.join(skillsDir, file);
        const content = fs.readFileSync(filePath, 'utf8');

        // 이미 permalink가 있는지 확인
        if (content.includes('permalink:')) {
            console.log(`${file}: 이미 permalink가 존재합니다.`);
            return;
        }

        // YAML 프론트매터가 있는지 확인
        const hasYamlFrontMatter = content.startsWith('---');

        let newContent;
        if (hasYamlFrontMatter) {
            // 첫 번째 '---' 다음에 permalink 추가
            newContent = content.replace('---', `---\npermalink: /${index + 1}`);
        } else {
            // YAML 프론트매터가 없으면 새로 추가
            newContent = `---\npermalink: /${index + 1}\n---\n\n${content}`;
        }

        // 파일에 저장
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`${file}: permalink: /${index + 1} 추가 완료`);
    });

    console.log('모든 파일에 permalink 추가를 완료했습니다.');
} catch (error) {
    console.error('오류 발생:', error);
}
