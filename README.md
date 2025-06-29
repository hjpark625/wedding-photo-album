# Wedding Photo Album

이 프로젝트는 Angular(버전 19.2.13) 기반으로 한 웨딩 사진 앨범 업로드 웹 애플리케이션입니다.

## 주요 기능

- **사진 업로드**: 1회 최대 20장, 150MB 이하 업로드 가능
- **사용자 인증**: CSRF 토큰을 이용한 인증 처리
  - 비정상적인 접근에 의해 서비스의 악용을 방지하기 위한 보안 조치
- **반응형 UI**: 간단한 모바일, 데스크탑 레이아웃만 대응

## 기술 스택

![Angular](https://img.shields.io/badge/Angular-900?style=for-the-badge&logo=Angular&logoColor=white)  
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)  
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=Sass&logoColor=white)  
![PNPM](https://img.shields.io/badge/pnpm-222?style=for-the-badge&logo=pnpm&logoColor=white)

## 폴더 구조

```plaintext
src/
  apis/                # API 요청 서비스 및 타입 정의
    auth-request.service.ts    # CSRF 토큰 인증 api 호출부
    photo-request.service.ts   # 사진 업로드 및 관리 API 호출부
    types/             # API 요청 및 응답 타입 정의
      photo-request.type.ts
  app/
    first-section/     # 첫 번째 섹션 컴포넌트
    second-section/    # 두 번째 섹션 컴포넌트
    home/              # 첫 번째, 두 번째 섹션 컴포넌트 컨테이너 역할
    app.component.*    # 루트 컴포넌트
    app.config.ts      # 앱 설정
    app.routes.ts      # 라우팅 설정
  index.html
  main.ts
  styles.scss
```

## 설치 및 실행

> 이 프로젝트는 Nodejs 22.12.0 이상에서 호환가능합니다.

## 환경 변수

```plaintext
API_SERVER=백엔드 서버 주소
```

- 백엔드 레포지토리: https://github.com/hjpark625/wedding-photo-album-server

## 의존성 설치

```bash
pnpm install
```

## 개발환경 실행

```bash
pnpm start
```
