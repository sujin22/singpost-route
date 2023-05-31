
const fs = require('fs');
const path = require('path');

const sourceWebDataDirectory = './data/all-route'; // 배포할 파일들이 위치한 디렉토리 경로
const deployWebDataDirectory = './dist/data/all-route'; // 배포할 경로

const sourceInputDataDirectory = './data/input-data';
const deployInputDataDirectory = './dist/data/input-data';

function deployFiles(sourceDirectory, deployDirectory) {
  fs.readdir(sourceDirectory, (err, files) => {
    if (err) {
      console.error(`Failed to read files from ${sourceDirectory}`);
      console.error(err);
      return;
    }

     // deployDirectory에 해당하는 디렉토리 생성
    fs.mkdirSync(deployDirectory, { recursive: true });

    files.forEach(file => {
      const sourcePath = path.join(sourceDirectory, file);
      const deployPath = path.join(deployDirectory, file);

      fs.copyFile(sourcePath, deployPath, err => {
        if (err) {
          console.error(`Failed to deploy ${file}`);
          console.error(err);
        } else {
          console.log(`Deployed ${file}`);
        }
      });
    });
  });
}

// 스크립트 실행
deployFiles(sourceWebDataDirectory, deployWebDataDirectory);
deployFiles(sourceInputDataDirectory, deployInputDataDirectory);