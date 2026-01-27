
/**
 * 한국어 조사 처리를 위한 유틸리티
 */

export type JosaType = '이/가' | '은/는' | '을/를' | '으로/로' | '와/과';

export const getJosa = (word: string, type: JosaType): string => {
    if (!word) return '';

    const lastChar = word.charCodeAt(word.length - 1);

    // 한글 범위가 아닐 경우 처리
    if (lastChar < 0xac00 || lastChar > 0xd7a3) {
        return type.split('/')[0];
    }

    const hasBatchim = (lastChar - 0xac00) % 28 > 0;

    const josaMap: Record<JosaType, string> = {
        '이/가': hasBatchim ? '이' : '가',
        '은/는': hasBatchim ? '은' : '는',
        '을/를': hasBatchim ? '을' : '를',
        '으로/로': hasBatchim ? '으로' : '로',
        '와/과': hasBatchim ? '과' : '와', // 와/과 순서 주의
    };

    return josaMap[type] || type;
};

/**
 * 템플릿 내의 조사를 자동으로 처리해주는 함수
 * 예: "{name}(이/가) 늦어질 것 같아" -> "철수가 늦어질 것 같아" 또는 "길동이 늦어질 것 같아"
 */
export const replaceWithJosa = (template: string, variable: string, value: string): string => {
    if (!value) {
        // 값이 없을 경우 변수와 뒤에 붙은 조사 패턴까지 제거
        return template.replace(new RegExp(`\\{${variable}\\}\\(\\w+\\/\\w+\\)`, 'g'), '').trim();
    }

    let result = template;
    const josaPatterns: JosaType[] = ['이/가', '은/는', '을/를', '으로/로', '와/과'];

    josaPatterns.forEach((type) => {
        const pattern = `\\{${variable}\\}\\(${type}\\)`;
        const regex = new RegExp(pattern, 'g');
        result = result.replace(regex, `${value}${getJosa(value, type)}`);
    });

    // 일반 치환
    result = result.replace(new RegExp(`\\{${variable}\\}`, 'g'), value);

    return result;
};
