import Papa from 'papaparse';

function readCSV(url: string): Promise<Map<string, Set<string>>> {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`CSV 읽기 오류: ${response.status} ${response.statusText}`);
      }
      return response.text();
    })
    .then((csvData) => {
      const { data, errors } = Papa.parse(csvData, { header: true, delimiter: ',', skipEmptyLines: true });
      // console.log(csvData);
      if (errors.length > 0) {
        const errorMessages = errors.map((error) => error.message).join('\n');
        throw new Error(`CSV 파싱 오류:\n${errorMessages}`);
      }

      const map = new Map<string, Set<string>>();

      data.forEach((record) => {
        const { ORDER_DATE, CAR_NUM } = record;

        if (!map.has(ORDER_DATE)) {
          map.set(ORDER_DATE, new Set());
        }

        map.get(ORDER_DATE)?.add(CAR_NUM);
      });

      return map;
    });
}

  function generateElements(map: Map<string, Set<string>>): DocumentFragment{

    const BASE_URL = './route.html?date=220422&car_id=CD03';
    const fragment = document.createDocumentFragment();

    map.forEach((val, key, mapObject) => {
      //expanable
      const details = document.createElement('details');
      details.className = 'tree-nav__item is-expandable';

      //date
      const summary = document.createElement('summary');
      summary.className = 'tree-nav__item-title';
      summary.textContent = key; //날짜 추가

      //link container
      const div = document.createElement('div');
      div.className = 'tree-nav__item';
  
      val.forEach((value1, value2, setObject)=>{
        //car link
      const link = document.createElement('a');
      link.className = 'tree-nav__item';
      link.href = BASE_URL+'date='+key+'car_id='+value1;
      link.textContent = value1;//차량 번호 추가
      div.appendChild(link);
      })
      
      details.appendChild(div);
      details.appendChild(summary);
      fragment.appendChild(details);
      
      // console.log(`${val}: ${key}`);
     })
    

    return fragment;
  }

//csv 읽어오기
// const csvURL = './data.csv'; // 파일 경로
const csvURL = './20230201_000000000001_result_df_postprocessed.csv';

readCSV(csvURL)
  .then((carNumMap) => {
    console.log(carNumMap);

    //TODO: date List로 element 생성
    const summaries = generateElements(carNumMap);

    const container = document.querySelector('.tree-nav');
    if(container){
      container.appendChild(summaries);
    }else{
      console.error('Container Element Not Found');
    }
  })
  .catch((error) => {
    console.error('CSV 읽기 오류:', error);
  });


