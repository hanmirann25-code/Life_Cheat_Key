import * as faceapi from '@vladmandic/face-api';
import { FaceFeatures, JOSEON_JOBS, JoseonAnalysisResult, JoseonJob, FEATURE_JOB_MAPPING } from './jobData';

let modelsLoaded = false;

/**
 * face-api.js 모델 로딩
 */
export async function loadFaceDetectionModels(): Promise<void> {
    if (modelsLoaded) return;

    const MODEL_URL = '/models'; // public/models 폴더에 모델 파일 배치

    try {
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);

        modelsLoaded = true;
        console.log('Face detection models loaded!');
    } catch (error) {
        console.error('Error loading models:', error);
        throw new Error('얼굴 인식 모델을 불러오는데 실패했습니다.');
    }
}

/**
 * 이미지 파일에서 얼굴 특징 추출
 */
export async function extractFaceFeatures(imageFile: File): Promise<FaceFeatures> {
    // 모델이 로드되지 않았으면 로드
    if (!modelsLoaded) {
        await loadFaceDetectionModels();
    }

    // 이미지를 HTMLImageElement로 변환
    const img = await loadImage(imageFile);

    // 얼굴 감지 및 랜드마크 추출
    const detection = await faceapi
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

    if (!detection) {
        throw new Error('얼굴을 찾을 수 없습니다. 정면 얼굴이 잘 보이는 사진을 사용해주세요.');
    }

    const landmarks = detection.landmarks;
    const box = detection.detection.box;

    // 얼굴 특징점에서 수치 계산
    const features = calculateFaceFeatures(landmarks, box);

    return features;
}

/**
 * File을 HTMLImageElement로 변환
 */
function loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
}

/**
 * 랜드마크에서 얼굴 특징 수치 계산
 */
function calculateFaceFeatures(
    landmarks: faceapi.FaceLandmarks68,
    box: faceapi.Box
): FaceFeatures {
    const points = landmarks.positions;

    // 주요 특징점 인덱스 (face-api.js 68-point model 기준)
    const leftEye = points.slice(36, 42);
    const rightEye = points.slice(42, 48);
    const nose = points.slice(27, 36);
    const mouth = points.slice(48, 68);
    const jaw = points.slice(0, 17);
    const leftEyebrow = points.slice(17, 22);
    const rightEyebrow = points.slice(22, 27);

    // 눈 크기 계산
    const leftEyeWidth = distance(leftEye[0], leftEye[3]);
    const leftEyeHeight = distance(leftEye[1], leftEye[5]);
    const rightEyeWidth = distance(rightEye[0], rightEye[3]);
    const rightEyeHeight = distance(rightEye[1], rightEye[5]);
    const avgEyeSize = ((leftEyeWidth + rightEyeWidth) / 2) / box.width;

    // 눈매 (위로 올라간 정도)
    const leftEyeSlant = (leftEye[3].y - leftEye[0].y) / box.height;
    const rightEyeSlant = (rightEye[3].y - rightEye[0].y) / box.height;
    const eyeSlant = normalize((leftEyeSlant + rightEyeSlant) / 2, -0.05, 0.05);

    // 눈썹 굵기
    const eyebrowThickness = ((distance(leftEyebrow[0], leftEyebrow[4]) +
        distance(rightEyebrow[0], rightEyebrow[4])) / 2) / box.width;

    // 코 높이 (콧등 길이)
    const noseHeight = distance(nose[0], nose[3]) / box.height;

    // 콧대 (코끝과 미간의 수평 거리)
    const noseBridge = Math.abs(nose[3].x - nose[0].x) / box.width;

    // 입 크기
    const mouthWidth = distance(mouth[0], mouth[6]) / box.width;
    const mouthHeight = distance(mouth[3], mouth[9]) / box.height;
    const mouthSize = normalize((mouthWidth + mouthHeight) / 2, 0.1, 0.3);

    // 입술 두께
    const upperLipThickness = distance(mouth[2], mouth[14]) / box.height;
    const lowerLipThickness = distance(mouth[18], mouth[8]) / box.height;
    const lipThickness = normalize((upperLipThickness + lowerLipThickness) / 2, 0.01, 0.05);

    // 이마 높이
    const foreheadHeight = (leftEyebrow[0].y - box.y) / box.height;

    // 광대뼈 폭 (얼굴 가장 넓은 부분)
    const maxJawWidth = Math.max(...jaw.map((p, i) =>
        i < jaw.length - 1 ? distance(p, jaw[jaw.length - 1 - i]) : 0
    ));
    const cheekboneWidth = normalize(maxJawWidth / box.width, 0.8, 1.2);

    // 턱선 강도 (얼굴 아래쪽 각도)
    const jawAngle = Math.abs(jaw[8].y - jaw[0].y) / Math.abs(jaw[8].x - jaw[0].x);
    const jawlineStrength = normalize(jawAngle, 0.3, 1.5);

    // 얼굴형 (폭 대비 높이)
    const faceShape = normalize(box.height / box.width, 1.2, 1.5);

    // 전체적 균형감 (대칭성)
    const leftRightSymmetry = 1 - Math.abs(
        (leftEye[0].x + leftEye[3].x) / 2 - box.width / 2
    ) / (box.width / 2);
    const facialHarmony = normalize(leftRightSymmetry, 0.8, 1.0);

    return {
        faceShape,
        eyeSize: normalize(avgEyeSize, 0.15, 0.25),
        eyeSlant,
        eyebrowThickness: normalize(eyebrowThickness, 0.1, 0.2),
        noseHeight: normalize(noseHeight, 0.15, 0.25),
        noseBridge: normalize(noseBridge, 0.02, 0.08),
        mouthSize,
        lipThickness,
        foreheadHeight: normalize(foreheadHeight, 0.25, 0.4),
        cheekboneWidth,
        jawlineStrength,
        facialHarmony
    };
}

/**
 * 얼굴 특징에서 조선시대 직업 매칭
 */
export function matchJoseonJob(features: FaceFeatures): JoseonAnalysisResult {
    const jobScores: { job: JoseonJob; score: number }[] = JOSEON_JOBS.map(job => ({
        job,
        score: calculateJobScore(features, job)
    }));

    // 점수 순으로 정렬
    jobScores.sort((a, b) => b.score - a.score);

    const topJob = jobScores[0];
    const topFeatures = getTopFeatures(features);
    const wittyMessage = generateWittyMessage(topJob.job, features);

    return {
        job: topJob.job,
        matchScore: Math.round(topJob.score),
        topFeatures,
        wittyMessage
    };
}

/**
 * 특정 직업과의 매칭 점수 계산
 */
function calculateJobScore(features: FaceFeatures, job: JoseonJob): number {
    let score = 50; // 기본 점수

    // 직업별 특징 가중치
    switch (job.id) {
        case 'yeonguijeong': // 영의정 - 넓은 이마, 날카로운 눈, 강한 턱선
            score += features.foreheadHeight * 20;
            score += features.eyeSlant * 15;
            score += features.jawlineStrength * 15;
            break;

        case 'wangbi': // 왕비 - 균형잡힌 얼굴, 우아한 눈
            score += features.facialHarmony * 25;
            score += (1 - features.faceShape) * 15; // 둥근 얼굴
            score += features.eyeSize * 10;
            break;

        case 'amhaeng': // 암행어사 - 날카로운 눈, 곧은 코
            score += features.eyeSlant * 20;
            score += features.noseHeight * 15;
            score += features.jawlineStrength * 15;
            break;

        case 'gisaeng': // 기생- 매혹적 눈, 곱은 입술
            score += features.eyeSize * 20;
            score += features.lipThickness * 20;
            score += features.facialHarmony * 10;
            break;

        case 'gagaek': // 가객 - 두툼한 입술, 표현력
            score += features.lipThickness * 25;
            score += features.mouthSize * 20;
            score += features.eyeSize * 5;
            break;

        case 'dogong': // 도공 - 섬세한 눈, 집중력
            score += (1 - features.eyeSize) * 15; // 작은 눈
            score += features.facialHarmony * 20;
            score += features.noseHeight * 10;
            break;

        case 'bobusang': // 보부상 - 밝은 인상, 친근함
            score += (1 - features.faceShape) * 20; // 둥근 얼굴
            score += features.mouthSize * 15;
            score += (1 - features.jawlineStrength) * 10;
            break;

        case 'uiwon': // 의원 - 온화한 눈, 자비로운 인상
            score += features.eyeSize * 15;
            score += (1 - features.eyeSlant) * 15;
            score += features.foreheadHeight * 15;
            break;

        case 'jumo': // 주모 - 다부진 인상
            score += features.cheekboneWidth * 20;
            score += features.jawlineStrength * 15;
            score += features.faceShape * 10;
            break;

        case 'mangnani': // 망나니 - 거친 인상, 강한 눈
            score += features.jawlineStrength * 20;
            score += features.eyeSlant * 15;
            score += (1 - features.facialHarmony) * 10;
            break;

        case 'nobi': // 노비 - 순박한 인상
            score += features.facialHarmony * 20;
            score += (1 - features.eyeSlant) * 15;
            score += (1 - features.cheekboneWidth) * 10;
            break;

        case 'sanjeok': // 산적 - 날카로운 눈, 강한 턱
            score += features.eyeSlant * 20;
            score += features.jawlineStrength * 20;
            score += features.noseHeight * 10;
            break;
    }

    return Math.min(100, Math.max(0, score));
}

/**
 * 가장 두드러진 얼굴 특징 추출
 */
function getTopFeatures(features: FaceFeatures): { feature: string; value: number }[] {
    const featureList = [
        { feature: '이마 높이', value: features.foreheadHeight },
        { feature: '눈 크기', value: features.eyeSize },
        { feature: '눈매', value: features.eyeSlant },
        { feature: '입술 두께', value: features.lipThickness },
        { feature: '턱선 강도', value: features.jawlineStrength },
        { feature: '얼굴 균형', value: features.facialHarmony }
    ];

    return featureList.sort((a, b) => b.value - a.value).slice(0, 3);
}

/**
 * 위트 있는 메시지 생성
 */
function generateWittyMessage(job: JoseonJob, features: FaceFeatures): string {
    const messages = [
        `전생에 ${job.title}이셨군요! 천기누설이옵니다! 🔮`,
        `오호라! ${job.name}의 기운이 역력하구려! ✨`,
        `관상을 보건대, ${job.title}의 상이 분명하옵니다! 📜`,
        `허허, ${job.name}이 분명하군요! 범상치 않은 관상이로소이다! 🎯`
    ];

    return messages[Math.floor(Math.random() * messages.length)];
}

// 유틸리티 함수들

function distance(p1: faceapi.Point, p2: faceapi.Point): number {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function normalize(value: number, min: number, max: number): number {
    return Math.max(0, Math.min(1, (value - min) / (max - min)));
}
