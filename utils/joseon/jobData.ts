// 조선시대 직업 데이터 타입 정의

export interface JoseonJob {
    id: string;
    name: string; // 직업명
    title: string; // 호칭 (예: "영의정 대감")
    category: 'power' | 'art' | 'work' | 'unique'; // 카테고리
    description: string; // 해학적 설명
    characteristics: string[]; // 특징적인 관상 설명
    personality: string[]; // 성격 특성
    fortune: string; // 운세/조언
    era: string; // 시대적 배경
}

export interface FaceFeatures {
    // 얼굴 특징 수치 (0-1 범위로 정규화)
    faceShape: number; // 얼굴형 (0: 둥근형, 1: 각진형)
    eyeSize: number; // 눈 크기
    eyeSlant: number; // 눈매 (0: 내려감, 1: 올라감)
    eyebrowThickness: number; // 눈썹 굵기
    noseHeight: number; // 코 높이
    noseBridge: number; // 콧대
    mouthSize: number; // 입 크기
    lipThickness: number; // 입술 두께
    foreheadHeight: number; // 이마 높이
    cheekboneWidth: number; // 광대뼈 폭
    jawlineStrength: number; // 턱선 강도
    facialHarmony: number; // 전체적 균형감
}

export interface JoseonAnalysisResult {
    job: JoseonJob;
    matchScore: number; // 매칭 점수 (0-100)
    topFeatures: { feature: string; value: number }[]; // 주요 특징 top 3
    wittyMessage: string; // 위트 있는 한 줄 메시지
}

// 12가지 조선시대 직업
export const JOSEON_JOBS: JoseonJob[] = [
    {
        id: 'yeonguijeong',
        name: '영의정',
        title: '영의정 대감',
        category: 'power',
        description: '그대의 관상을 보니, 백관을 호령하고 나라의 운명을 쥐었던 영의정의 기질이 역력하구려!',
        characteristics: [
            '이마가 넓고 높아 천하의 이치를 꿰뚫는 지혜가 깃들었고',
            '눈빛이 날카롭고 명석하여 간신들을 가려내는 혜안이 있으며',
            '턱선이 굳건하여 어떤 풍파에도 흔들리지 않는 중심이 보이옵니다'
        ],
        personality: ['지도력', '통찰력', '책임감', '결단력'],
        fortune: '큰 뜻을 품고 꾸준히 정진하시면, 반드시 높은 자리에 오를 운명이옵니다.',
        era: '조선 중기, 임진왜란을 극복한 재상들의 시대'
    },
    {
        id: 'wangbi',
        name: '왕비',
        title: '중전 마마',
        category: 'power',
        description: '아, 이 어찌 평범한 관상이리오! 후궁을 거느리고 궁궐을 다스리던 왕비의 기품이 흐르는구려!',
        characteristics: [
            '인상이 근엄하면서도 자애로워 내명부를 다스리는 덕성이 있고',
            '눈매가 우아하고 품격 있어 천하 제일의 귀부인 상이며',
            '얼굴이 균형잡혀 하늘이 내린 복을 타고난 귀한 상이옵니다'
        ],
        personality: ['품위', '자비', '지혜', '인내'],
        fortune: '덕을 쌓고 주변을 아끼시면, 복이 끊이지 않을 것이옵니다.',
        era: '조선 후기, 안동 김씨 세도정치 시대의 중전들'
    },
    {
        id: 'amhaeng',
        name: '암행어사',
        title: '어사또',
        category: 'power',
        description: '오호라! 그대의 눈빛에서 탐관오리를 벌벌 떨게 하던 암행어사의 기상이 느껴지는도다!',
        characteristics: [
            '눈매가 부리부리하여 억울한 백성의 사정을 꿰뚫어 보고',
            '콧날이 곧고 바르니 불의를 용납치 않는 정의로움이 있으며',
            '입매가 굳게 다물어져 결코 타협하지 않는 강직함이 보이옵니다'
        ],
        personality: ['정의감', '통찰력', '강직함', '용기'],
        fortune: '옳은 일에 두려움 없이 나서시면, 반드시 하늘이 도우실 것이옵니다.',
        era: '조선 영조 시대, 백성을 위한 암행어사들의 활약'
    },
    {
        id: 'gisaeng',
        name: '기생',
        title: '명기(名妓)',
        category: 'art',
        description: '세상에! 그대의 자태를 보니, 풍류를 아는 선비들의 마음을 홀렸던 명기의 아우라가 감도는구려!',
        characteristics: [
            '눈매가 매혹적이고 신비로워 한 번 보면 잊을 수 없으며',
            '입술선이 곱고 부드러워 가야금 소리처럼 아름다운 목소리가 들리는 듯하고',
            '전체적인 분위기가 우아하여 예술혼이 깃들었도다'
        ],
        personality: ['예술성', '매력', '감성', '지혜'],
        fortune: '재능을 갈고닦으시면, 많은 이들의 마음을 얻을 것이옵니다.',
        era: '조선 후기, 황진이와 같은 명기들의 전성시대'
    },
    {
        id: 'gagaek',
        name: '가객',
        title: '소리꾼',
        category: 'art',
        description: '허허, 그대의 관상을 보니 판소리로 천하를 울렸던 명창의 기운이 넘쳐흐르는구려!',
        characteristics: [
            '입술이 두툼하고 풍부하여 소리가 터질 듯 나올 상이며',
            '얼굴에 감정이 풍부히 드러나 희로애락을 표현하는 재주가 있고',
            '눈빛이 생동감 넘쳐 수많은 이야기를 품고 있는 듯하도다'
        ],
        personality: ['표현력', '열정', '끼', '흥'],
        fortune: '그대의 재능을 마음껏 펼치시면, 세상이 박수갈채를 보낼 것이옵니다.',
        era: '조선 후기, 판소리 열풍이 불던 시절'
    },
    {
        id: 'dogong',
        name: '도공',
        title: '장인(匠人)',
        category: 'art',
        description: '그대의 눈빛을 보니, 흙을 빚어 천하명품을 만들어냈던 도공의 혼이 어려있구려!',
        characteristics: [
            '눈초리가 섬세하고 집중력 있어 작은 것도 놓치지 않으며',
            '손이 정교할 것 같은 관상이니 세공하는 데 천부적 재능이 있고',
            '차분한 인상이 완성도 높은 작품을 만드는 장인정신을 보여주옵니다'
        ],
        personality: ['장인정신', '인내', '섬세함', '집중력'],
        fortune: '한 길을 꾸준히 파시면, 명장의 경지에 이를 것이옵니다.',
        era: '조선 전기, 분청사기와청화백자의 전성기'
    },
    {
        id: 'bobusang',
        name: '보부상',
        title: '천하 대상인',
        category: 'work',
        description: '이 얼마나 좋은 관상이냐! 전국 팔도를 누비며 장사로 거부가 되었던 보부상의 기질이 넘쳐나는구나!',
        characteristics: [
            '인상이 밝고 친근하여 어디서든 환영받을 상이며',
            '눈빛이 재빠르고 기민하여 장사의 기회를 놓치지 않고',
            '입가에 미소가 어려 사람을 편안하게 만드는 복덕이 있도다'
        ],
        personality: ['사교성', '민첩함', '낙천성', '상술'],
        fortune: '기회를 잡고 인연을 소중히 하시면, 재물이 굴러들어올 것이옵니다.',
        era: '조선 중기, 상업이 발달하던 시절'
    },
    {
        id: 'uiwon',
        name: '의원',
        title: '명의(名醫)',
        category: 'work',
        description: '오오! 그대의 관상을 보니, 백성의 병을 고치고 생명을 구했던 명의의 자비로움이 서려있구려!',
        characteristics: [
            '눈빛이 자애롭고 온화하여 환자를 위로하는 덕이 있으며',
            '이마가 밝고 넓어 의술의 이치를 깨우칠 지혜가 있고',
            '손이 따뜻할 것 같은 인상이니 침과 약으로 병을 다스리는 재주가 있도다'
        ],
        personality: ['자비심', '치유력', '지혜', '봉사정신'],
        fortune: '남을 돕는 일에 앞장서시면, 그 복이 배가 되어 돌아올 것이옵니다.',
        era: '조선 중기, 허준과 같은 명의들의 시대'
    },
    {
        id: 'jumo',
        name: '주모',
        title: '객주 주모',
        category: 'work',
        description: '허허, 이 얼마나 든든한 상이냐! 주막을 경영하며 온갖 세상 풍파를 헤쳐온 주모의 기상이로다!',
        characteristics: [
            '인상이 다부지고 정이 넘쳐 손님들을 정성껏 대접하고',
            '눈빛이 영리하여 장사 수완이 뛰어나며',
            '체구가 든든해 보여 어떤 고난도 이겨낼 힘이 보이옵니다'
        ],
        personality: ['포용력', '실용성', '정', '강인함'],
        fortune: '성실히 일하고 사람을 소중히 하시면, 부귀영화를 누릴 것이옵니다.',
        era: '조선 후기, 주막이 번성하던 시절'
    },
    {
        id: 'mangnani',
        name: '망나니',
        title: '한량',
        category: 'unique',
        description: '허허허! 그대의 관상에서 속세의 인연을 끊고 자유를 찾았던 망나니의 기운이 절로 나는구려!',
        characteristics: [
            '눈빛이 불같고 거침없어 남의 눈치를 보지 않는 자유로움이 있으며',
            '얼굴에 굴곡이 많아 파란만장한 인생을 살아온 흔적이 보이고',
            '입매가 호탕하여 세상 시름을 웃음으로 날려버리는 호기가 있도다'
        ],
        personality: ['자유분방', '호탕함', '용기', '솔직함'],
        fortune: '세상의 틀에 얽매이지 마시고 그대만의 길을 가시옵소서!',
        era: '조선 후기, 파격적인 삶을 살았던 한량들'
    },
    {
        id: 'nobi',
        name: '양반집 노비',
        title: '충직한 종',
        category: 'unique',
        description: '아, 그대의 관상을 보니 어느 양반집에서든 신뢰받던 충직한 노비의 성품이 드러나는구려!',
        characteristics: [
            '인상이 순박하고 성실하여 믿음을 주며',
            '눈빛이 맑고 정직하여 거짓이 없는 마음씨가 보이고',
            '전체적으로 근면성실한 기운이 감도는 복된 상이옵니다'
        ],
        personality: ['성실함', '충성심', '근면함', '정직함'],
        fortune: '묵묵히 맡은 바를 다하시면, 반드시 인정받고 좋은 날이 올 것이옵니다.',
        era: '조선 시대, 주인을 섬기며 살았던 노비들'
    },
    {
        id: 'sanjeok',
        name: '의적',
        title: '활빈당 두목',
        category: 'unique',
        description: '오호! 그대의 관상에서 탐관오리의 재물을 빼앗아 가난한 백성을 구제하던 의적의 기개가 느껴지는구나!',
        characteristics: [
            '눈매가 날카롭고 야생적이어서 산속을 누비는 호랑이 같은 기상이 있으며',
            '턱선이 강인하여 역경을 이겨내는 담력이 보이고',
            '얼굴 선이 거칠고 투박하나 그 안에 의리가 서려있도다'
        ],
        personality: ['의리', '용맹', '통쾌함', '정의감'],
        fortune: '불의에 맞서는 용기를 잃지 마시고, 약자를 돕는 일에 앞장서시옵소서!',
        era: '조선 후기, 임꺽정과 같은 의적들의 전설'
    }
];

// 특정 얼굴 특징에서 강한 직업 매핑
export const FEATURE_JOB_MAPPING: Record<string, string[]> = {
    sharpEyes: ['amhaeng', 'yeonguijeong', 'sanjeok'],
    wideForehead: ['yeonguijeong', 'uiwon', 'wangbi'],
    thickLips: ['gagaek', 'jumo', 'bobusang'],
    elegantFace: ['gisaeng', 'wangbi', 'dogong'],
    strongJaw: ['amhaeng', 'mangnani', 'sanjeok'],
    warmEyes: ['uiwon', 'nobi', 'bobusang'],
    detailedFocus: ['dogong', 'uiwon'],
    friendlyFace: ['bobusang', 'jumo', 'nobi']
};
