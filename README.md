# SimpleWebpackBoiler - 모던 웹 개발 보일러플레이트

<img src="https://webpack.js.org/assets/icon-square-big.svg" alt="Webpack" width="150" height="150" />

## 프로젝트 개요

이 프로젝트는 모던 웹 개발을 위한 맞춤형 Webpack 보일러플레이트입니다. 프로젝트 시작 시 반복되는 Webpack 설정 작업을 줄이고, 다양한 프로젝트에 바로 적용할 수 있는 최적화된 구성을 제공합니다. 

### 주요 기술 스택

- **React 18**: 최신 리액트 기능 활용
- **TypeScript**: 타입 안정성 강화
- **Webpack 5**: 고급 모듈 번들링 구성
- **Babel**: 최신 자바스크립트 변환
- **Emotion**: CSS-in-JS 스타일링
- **ESLint & Prettier**: 코드 품질 관리

## 구현 특징

### 1. 환경별 최적화된 Webpack 설정

프로젝트는 개발 및 프로덕션 환경에 맞춰 최적화된 세 가지 Webpack 설정 파일로 구성되어 있습니다:

- **webpack.common.js**: 공통 설정
- **webpack.dev.js**: 개발 환경 최적화
- **webpack.prod.js**: 프로덕션 환경 최적화

이를 통해 각 환경에 맞는 빌드 프로세스와 최적화 전략을 적용할 수 있습니다.

### 2. 고급 성능 최적화 기법 적용

```javascript
// webpack.prod.js의 주요 최적화 설정
optimization: {
  minimize: true,
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        compress: {
          drop_console: true,
          pure_funcs: ['console.log'],
          passes: 2,
          dead_code: true,
          unused: true,
        },
        mangle: true,
      },
      extractComments: false,
    }),
    new CssMinimizerPlugin(),
    new ImageMinimizerPlugin({
      // 이미지 최적화 설정
    }),
  ],
  runtimeChunk: 'single',
  splitChunks: {
    chunks: 'all',
    maxInitialRequests: Infinity,
    minSize: 0,
    cacheGroups: {
      // 벤더 코드 분할 전략
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name(module) {
          const packageName = module.context.match(
            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
          )[1];
          return `vendor.${packageName.replace('@', '')}`;
        },
      },
    },
  },
}
```

### 3. 효율적인 자산 관리

```javascript
// 이미지 및 폰트 자산 처리 설정
{
  test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
  type: 'asset',
  parser: {
    dataUrlCondition: {
      maxSize: 10 * 1024, // 10KB 이하 이미지는 inline 처리
    },
  },
  generator: {
    filename: 'images/[name][ext]',
  },
},
{
  test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
  type: 'asset',
  parser: {
    dataUrlCondition: {
      maxSize: 8 * 1024, // 8KB 이하 폰트는 inline 처리
    },
  },
  generator: {
    filename: 'fonts/[name][ext]',
  },
}
```

이 설정을 통해 이미지와 폰트 자산을 효율적으로 관리하며, 작은 파일은 인라인화하여 HTTP 요청을 줄입니다.

### 4. 트리 쉐이킹 및 사이드 이펙트 최적화

package.json의 `sideEffects` 필드를 통해 번들 사이즈를 효과적으로 줄이는 트리 쉐이킹 최적화를 구현했습니다:

```json
"sideEffects": [
  "*.css",
  "*.scss"
]
```

이 설정으로 실제 사용되는 코드만 번들에 포함되도록 하여 번들 크기를 최소화합니다.

### 5. 캐싱 전략 구현

개발 및 프로덕션 환경 모두에서 효율적인 캐싱 전략을 구현하여 빌드 및 로드 시간을 최적화했습니다:

```javascript
// 프로덕션 빌드의 캐싱 최적화
output: {
  filename: 'js/[name].[contenthash].js',
  chunkFilename: 'js/[name].[contenthash].js',
  // ...
  hashFunction: 'xxhash64',
  hashDigestLength: 16,
}

// 개발 환경의 빌드 성능 최적화
cache: {
  type: "filesystem",
  version: "1.0",
  compression: "brotli",
  cacheDirectory: path.resolve(__dirname, "..", ".webpack-cache"),
  buildDependencies: {
    config: [__filename],
  },
  name: "development-cache",
  allowCollectingMemory: true,
}
```

### 6. 환경 변수 및 다중 환경 지원

Dotenv-webpack 플러그인을 사용하여 다양한 환경에서의 구성을 지원합니다:

```javascript
new Dotenv({
  path:
    process.env.NODE_ENV === 'production'
      ? path.resolve(__dirname, '../.env')
      : path.resolve(__dirname, '../.env.local'),
  safe: false,
  allowEmptyValues: true,
  systemvars: true,
  defaults: true,
})
```

### 7. 개발 경험 향상

개발 환경에서는 HMR(Hot Module Replacement), 오버레이 알림, 소스맵 등을 활용하여 개발 경험을 개선했습니다:

```javascript
devServer: {
  hot: true,
  open: true,
  historyApiFallback: true,
  port: 3000,
  client: {
    overlay: {
      errors: true,
      warnings: false,
    },
  },
  compress: true,
}
```

## 성능 분석 및 모니터링

프로젝트는 Webpack Bundle Analyzer를 통합하여 번들 크기와 구성을 시각적으로 분석할 수 있습니다:

```bash
# 번들 분석 리포트 생성
npm run build:analyze
# 또는
yarn build:analyze
```

이를 통해 번들 크기 최적화 및 개선점을 시각적으로 확인할 수 있습니다.

## 프로젝트 구조

```
SimpleWebpackBoiler/
├── public/                # 정적 파일
├── src/                   # 소스 코드
│   ├── components/        # 리액트 컴포넌트
│   ├── pages/             # 페이지 컴포넌트
│   ├── routes/            # 라우팅 구성
│   ├── styles/            # 전역 스타일
│   ├── types/             # TypeScript 타입 정의
│   ├── App.tsx            # 메인 앱 컴포넌트
│   └── index.tsx          # 앱 엔트리 포인트
├── webpack/               # Webpack 설정 파일
│   ├── webpack.common.js  # 공통 설정
│   ├── webpack.dev.js     # 개발 환경 설정
│   └── webpack.prod.js    # 프로덕션 환경 설정
├── .eslintrc.json         # ESLint 설정
├── .prettierrc.js         # Prettier 설정
├── tsconfig.json          # TypeScript 설정
├── package.json           # 패키지 정보 및 스크립트
└── README.md              # 프로젝트 문서
```

## 설치 및 실행

```bash
# 의존성 설치
npm install
# 또는
yarn install

# 개발 서버 실행
npm start
# 또는
yarn start

# 프로덕션 빌드
npm run build
# 또는
yarn build
```

## 주요 최적화 기법

### 1. 최적의 코드 분할 전략

노드 모듈을 효율적으로 분할하기 위해 세분화된 벤더 청킹 전략을 구현했습니다. 이를 통해 각 패키지를 개별적으로 캐싱하고 필요할 때만 로드할 수 있습니다.

### 2. 이미지 최적화 파이프라인

프로덕션 빌드에서 ImageMinimizerPlugin을 사용하여 이미지를 자동으로 최적화하는 파이프라인을 구축했습니다. 이는 페이지 로드 시간과 사용자 경험을 크게 개선합니다.

### 3. TypeScript 경로 매핑

tsconfig.json과 webpack 설정에서 일관된 경로 별칭을 설정하여 임포트 경로를 간소화하고 모듈 해결을 최적화했습니다 (실제 프로젝트에서는 프로젝트에 맞게 설정해야합니다.):

```json
"paths": {
  "@ComponentFarm/*": ["./component/*"],
  "@ApiFarm/*": ["./src/api/*"],
  "@InterfaceFarm/*": ["./src/interface/*"],
  "@UtilFarm/*": ["./util/*"],
  "@HookFarm/*": ["./src/hook/*"],
  "@MobxFarm/*": ["./src/mobx/*"],
  "@PagesFarm/*": ["./pages/*"]
}
```

## 웹팩 구성 주요 요소

1. **Entry & Output**: 애플리케이션의 진입점과 결과물 구성
2. **Loaders**: 다양한 유형의 파일(TypeScript, CSS 등)을 처리하는 방법
3. **Plugins**: 번들링 프로세스 확장 및 최적화
4. **Code Splitting**: 애플리케이션 코드의 효율적인 분할
5. **Tree Shaking**: 사용되지 않는 코드 제거
6. **Caching**: 브라우저와 빌드 캐싱 전략
7. **환경 구성**: 개발 및 프로덕션 환경에 대한 최적화된 설정

## 결론

이 보일러플레이트는 일상적인 웹 개발 프로젝트를 신속하게 시작할 수 있도록 설계되었습니다. Webpack의 고급 기능들이 이미 최적화되어 구성되어 있어, 개발자는 핵심 비즈니스 로직과 UI 개발에 집중할 수 있습니다. 필요에 따라 설정을 쉽게 확장하거나 수정할 수 있도록 모듈화된 구조로 설계되어 있어, 다양한 프로젝트 요구사항에 유연하게 대응할 수 있습니다.
