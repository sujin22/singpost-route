const path = require('path');

module.exports = {
  entry: './index.js', // 애플리케이션 진입점 파일 경로
  output: {
    filename: 'bundle.js', // 번들된 JavaScript 파일 이름
    path: path.resolve(__dirname, 'dist'), // 번들된 파일이 생성될 경로
  },
  module: {
    rules: [
      {
        test: /\.csv$/, // CSV 파일을 로드하기 위한 로더 설정
        use: [
          {
            loader: 'csv-loader',
            options: {
              dynamicTyping: true,
              header: true,
              skipEmptyLines: true,
            },
          },
        ],
      },
    ],
  },
};
