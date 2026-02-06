# Face-API.js 모델 파일 설정

조선관상 기능을 위해서는 face-api.js 모델 파일이 필요합니다.

## 모델 다운로드

1. face-api.js 공식 저장소에서 모델 파일 다운로드:
   https://github.com/vladmandic/face-api/tree/master/model

2. 다음 모델 파일들을 `public/models` 폴더에 복사:
   ```
   public/models/
   ├── tiny_face_detector_model-shard1
   ├── tiny_face_detector_model-weights_manifest.json
   ├── face_landmark_68_model-shard1
   ├── face_landmark_68_model-weights_manifest.json
   ├── face_expression_model-shard1
   └── face_expression_model-weights_manifest.json
   ```

## 빠른 설정 (권장)

아래 명령어로 자동 다운로드 (curl 사용):

```bash
mkdir -p public/models
cd public/models

# Tiny Face Detector
curl -O https://raw.githubusercontent.com/vladmandic/face-api/master/model/tiny_face_detector_model-shard1
curl -O https://raw.githubusercontent.com/vladmandic/face-api/master/model/tiny_face_detector_model-weights_manifest.json

# Face Landmark 68
curl -O https://raw.githubusercontent.com/vladmandic/face-api/master/model/face_landmark_68_model-shard1
curl -O https://raw.githubusercontent.com/vladmandic/face-api/master/model/face_landmark_68_model-weights_manifest.json

# Face Expression
curl -O https://raw.githubusercontent.com/vladmandic/face-api/master/model/face_expression_model-shard1
curl -O https://raw.githubusercontent.com/vladmandic/face-api/master/model/face_expression_model-weights_manifest.json
```

## 확인

모델이 제대로 설정되었는지 확인:
- `/joseon-face` 페이지 접속
- 얼굴 사진 업로드
- "천기누설 중..." 로딩 화면이 나타나면 성공!

## 문제 해결

만약 "얼굴 인식 모델을 불러오는데 실패했습니다" 오류가 발생하면:
1. `public/models` 폴더에 모델 파일이 있는지 확인
2. 파일 이름이 정확한지 확인 (대소문자 구분)
3. 브라우저 콘솔에서 네트워크 오류 확인
