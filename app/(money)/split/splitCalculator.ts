// N빵 계산 로직

export interface SplitInput {
    totalAmount: number; // 총 금액
    numberOfPeople: number; // 인원수
}

export interface SplitResult {
    perPerson: number; // 1인당 금액 (기본)
    remainder: number; // 나머지 금액
    distribution: number[]; // 각 사람이 낼 금액 배열
}

/**
 * N빵 계산
 * @param input 총 금액과 인원수
 * @returns 1인당 금액 및 분배 내역
 */
export function calculateSplit(input: SplitInput): SplitResult {
    const { totalAmount, numberOfPeople } = input;

    // 기본 1인당 금액 (내림)
    const perPerson = Math.floor(totalAmount / numberOfPeople);

    // 나머지 금액
    const remainder = totalAmount - perPerson * numberOfPeople;

    // 분배: 나머지가 있으면 앞사람부터 1원씩 더 냄
    const distribution: number[] = [];
    for (let i = 0; i < numberOfPeople; i++) {
        if (i < remainder) {
            distribution.push(perPerson + 1);
        } else {
            distribution.push(perPerson);
        }
    }

    return {
        perPerson,
        remainder,
        distribution,
    };
}

/**
 * 금액을 한국 원화 형식으로 포맷
 */
export function formatKRW(amount: number): string {
    return `${amount.toLocaleString()}원`;
}

/**
 * 카카오톡 공유용 텍스트 생성
 */
export function generateShareText(input: SplitInput, result: SplitResult): string {
    const { totalAmount, numberOfPeople } = input;
    const { perPerson, remainder } = result;

    let text = `💰 N빵 계산 결과\n\n`;
    text += `총 금액: ${formatKRW(totalAmount)}\n`;
    text += `인원: ${numberOfPeople}명\n`;
    text += `━━━━━━━━━━━━━━\n`;
    text += `1인당: ${formatKRW(perPerson)}\n`;

    if (remainder > 0) {
        text += `\n⚠️ ${remainder}원이 남아요!\n`;
        text += `앞 ${remainder}명이 1원씩 더 내주세요.\n`;
    }

    text += `\n인생 치트키에서 계산했어요 🎮`;

    return text;
}
