import Papa from 'papaparse';


function readJSONList(): Promise<Array<string>> {
  const owner = 'sujin22';
  const repo = 'singpost-route';
  const path = 'data/input-data/';

  return fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch file list');
      }
      return response.json();
    })
    .then(data => {
      // data 배열에서 file name만 추출하여 리스트 반환
      console.log(data);
      const fileList = data.map(file => file.name);
      console.log(fileList);
      return fileList;
      
    })
    .catch(error => {
      // 오류 처리
      console.error('Error:', error);
      return [];
    });
}


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

function generateJSONElements(jsonList: Array<string>): DocumentFragment{
  const fragment = document.createDocumentFragment();
  jsonList.forEach((val) => {
    //expanable
    const details = document.createElement('details');
    details.className = 'tree-nav__item is-expandable';

    //date
    const summary = document.createElement('summary');
    summary.className = 'tree-nav__item-title';
    summary.textContent = val.replace(".json",""); //날짜 추가
    console.log(val);
  
    //link container
    const div = document.createElement('div');
    div.className = 'tree-nav__item';

    
    //car link
    const BASE_URL = "./route.html"
    const link = document.createElement('a');
    link.className = 'tree-nav__item';
    link.href = BASE_URL + 'date=' + val.substring(0, 8) + '&car_id=' + "CE03";
    link.textContent = "All Route";//
    div.appendChild(link);
    

    details.appendChild(div);
    details.appendChild(summary);
    fragment.appendChild(details);
  })

  return fragment;
}
function generateDataElements(map: Map<string, Set<string>>): DocumentFragment {

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

function sortName(fileNames:Array<string>){
  fileNames.sort((a, b) => {
    const dateA = parseInt(a.substring(0, 8));
    const numberA = parseInt(a.substring(9, a.lastIndexOf(".")));
    const dateB = parseInt(b.substring(0, 8));
    const numberB = parseInt(b.substring(9, b.lastIndexOf(".")));
    if (dateA === dateB) {
      // 날짜가 같을 경우 숫자를 비교하여 정렬
      return numberA - numberB;
    } else {
      // 날짜가 다를 경우 날짜를 비교하여 정렬
      return dateB - dateA;
    }
  });
  console.log(fileNames);
  return fileNames;
}

//json 목록 읽어와 element 생성
readJSONList()
  .then(jsonList => {
    const fileNames = sortName(jsonList);
    const summaries = generateJSONElements(fileNames);

    const container = document.querySelector('.tree-nav');
    if (container) {
      container.appendChild(summaries);
    } else {
      console.error('Container Element Not Found');
    }
  })
  .catch(error => {
    // 오류 처리
    console.error('Error:', error);
  });

const jsonURL = '/singpost-route/20230201_001.json'; // JSON 파일 경로

readJSON(jsonURL)
  .then((carNumMap) => {
    // 데이터 처리 로직
    console.log(carNumMap);

    //TODO: date List로 element 생성
    const summaries = generateDataElements(carNumMap);

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


