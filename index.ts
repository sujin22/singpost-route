import Papa from 'papaparse';

function readJSON(url): Promise<Map<string, Set<string>>> {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`JSON 읽기 오류: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((jsonData) => {
      const map = new Map();

      jsonData.forEach((record) => {
        const { ORDER_DATE, CAR_NUM } = record;

        if (!map.has(ORDER_DATE)) {
          map.set(ORDER_DATE, new Set());
        }

        map.get(ORDER_DATE)?.add(CAR_NUM);
      });

      return map;
    });
}


function generateElements(map: Map<string, Set<string>>): DocumentFragment {

  const BASE_URL = './route.html?';
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

    val.forEach((value1, value2, setObject) => {
      //car link
      const link = document.createElement('a');
      link.className = 'tree-nav__item';
      link.href = BASE_URL + 'date=' + key + '&car_id=' + value1;
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


const jsonURL = '/singpost-route/20230201_00001.json'; // JSON 파일 경로

readJSON(jsonURL)
  .then((carNumMap) => {
    // 데이터 처리 로직
    console.log(carNumMap);

    //TODO: date List로 element 생성
    const summaries = generateElements(carNumMap);

    const container = document.querySelector('.tree-nav');
    if (container) {
      container.appendChild(summaries);
    } else {
      console.error('Container Element Not Found');
    }
  })
  .catch((error) => {
    console.error('JSON 읽기 오류:', error);
  });


