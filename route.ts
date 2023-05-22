import Papa from 'papaparse';
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// 현재 URL에서 쿼리 매개변수를 가져오기
const urlParams = new URLSearchParams(window.location.search);

// "date" 매개변수의 값을 가져오기
const date = urlParams.get("date");

// "car_id" 매개변수의 값을 가져오기
const carId = urlParams.get("car_id");

console.log("date: " + date); // "220422"
console.log("carID : " + carId); // "CA03"


interface Coordinate {
  latitude: number;
  longitude: number;
}

function readJSON(url: string): Promise<Coordinate[]> {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`JSON 읽기 오류: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((jsonData) => {
      
    const coordinateList: Coordinate[] = [];

    jsonData.forEach((record) => {
        const { ORDER_DATE, CAR_NUM, Y, X } = record;

        if (ORDER_DATE != date || CAR_NUM != carId) {
          return;
        }

        const latitude = parseFloat(Y);
        const longitude = parseFloat(X);

        if (!isNaN(latitude) && !isNaN(longitude)) {
          const coordinate: Coordinate = {
            latitude,
            longitude,
          };

          coordinateList.push(coordinate);
        }
      });

      return coordinateList;
    });
}
const jsonURL = '20230201_00001.json'; // JSON 파일 경로
readJSON(jsonURL)
  .then((list) => {
    // console.log(list);
  
    //TODO: route로 map 핀 찍기 & 경로 출력
    // dataList.push(...list);
    function initMap(): void {
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          zoom: 4,
          // center: { lat: 1.31895, lng: 203.89445 },
    
        }
      );
      
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: false,
        map,
        panel: document.getElementById("panel") as HTMLElement,
      });
    
      directionsRenderer.addListener("directions_changed", () => {
        const directions = directionsRenderer.getDirections();
    
        if (directions) {
          computeTotalDistance(directions);
        }
      });
      //마커 위치 지정(출발지, 도착지)
      // console.log(list.length);
      // console.log(list);

      displayRoute(list, directionsService, directionsRenderer);
    }
    initMap();
  })
  .catch((error) => {
    console.error('JSON 읽기 오류:', error);
  });

function displayRoute(
  list: Coordinate[],
  service: google.maps.DirectionsService,
  display: google.maps.DirectionsRenderer
) {
  const waypoints: google.maps.DirectionsWaypoint[] = [];
  // Coordinate 배열을 순회하며 Place 객체 생성 및 배열에 추가
  list.slice(1, list.length - 1).forEach((coordinate: Coordinate) => {
    const waypoint: google.maps.DirectionsWaypoint = {
      location: new google.maps.LatLng(coordinate.latitude, coordinate.longitude) // 위도와 경도로 LatLng 객체 생성
    };
    waypoints.push(waypoint);
  });
  console.log(list);
  console.log('latitude: ' + list[0]);



  service
    .route({
      origin: { lat: list[0].latitude, lng: list[0].longitude },
      destination: { lat: list[list.length - 1].latitude, lng: list[list.length - 1].longitude },
      waypoints: waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
      avoidTolls: true,
    })
    .then((result: google.maps.DirectionsResult) => {
      display.setDirections(result);
    })
    .catch((e) => {
      alert("Could not display directions due to: " + e);
    });
}

function computeTotalDistance(result: google.maps.DirectionsResult) {
  let total = 0;
  const myroute = result.routes[0];

  if (!myroute) {
    return;
  }

  for (let i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i]!.distance!.value;
  }

  total = total / 1000;
  (document.getElementById("total") as HTMLElement).innerHTML = total + " km";
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
// window.initMap = initMap;

export { };
