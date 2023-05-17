import Papa from 'papaparse';

function readCSV(url: string): Promise<Map<string, string[]>> {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`CSV 읽기 오류: ${response.status} ${response.statusText}`);
      }
      return response.text();
    })
    .then((csvData) => {
      const { data, errors } = Papa.parse(csvData, { header: true });
      console.log(csvData);
      if (errors.length > 0) {
        const errorMessages = errors.map((error) => error.message).join('\n');
        throw new Error(`CSV 파싱 오류:\n${errorMessages}`);
      }

      const map = new Map<string, string[]>();

      data.forEach((record) => {
        const { ORDER_DATE, CAR_NUM } = record;

        if (!map.has(ORDER_DATE)) {
          map.set(ORDER_DATE, []);
        }

        map.get(ORDER_DATE)?.push(CAR_NUM);
      });

      return map;
    });
}

// 사용 예시
const csvURL = './data.csv'; // 파일 경로에 맞게 수정

readCSV(csvURL)
  .then((carNumMap) => {
    console.log(carNumMap);
  })
  .catch((error) => {
    console.error('CSV 읽기 오류:', error);
  });
