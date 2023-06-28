/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// 현재 URL에서 쿼리 매개변수를 가져오기
const urlParams = new URLSearchParams(window.location.search);

// "fname" 매개변수의 값을 가져오기
const fname = urlParams.get("fname") + ".json";

// "car_id" 매개변수의 값을 가져오기
const carId = urlParams.get("car_id");

console.log("fname: " + fname); // "20230530_1.json"
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

      jsonData.result.forEach((record) => {
        const { CAR_NUM, Y, X } = record;

        if (CAR_NUM != carId) {
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

const jsonURL = '/singpost-route/data/input-data/' + fname; // JSON 파일 경로
var dataList;
readJSON(jsonURL)
  .then((list) => {

    //TODO: route로 map 핀 찍기 & 경로 출력
    dataList = list;

    initMap();
  })
  .catch((error) => {
    console.error('JSON 읽기 오류:', error);
  });

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

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 4,
      // center: { lat: 1.31895, lng: 203.89445 },

    }
  );

  displayRoute(dataList, map);
}



function displayRoute(
  list: Coordinate[],
  map: google.maps.Map
) {
  const alphabetLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let infoWindow: google.maps.InfoWindow | null = null; // 말풍선을 담을 InfoWindow 변수

  const directionsRenderer = new google.maps.DirectionsRenderer({
    draggable: false,
    map,
    panel: document.getElementById("panel") as HTMLElement,
    suppressMarkers: false,//기본 마커 활성화 여부 (활성화:false, 비활성화:true)

    markerOptions: {
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'white',
        fillOpacity: 1,
        strokeWeight: 3,
        strokeColor: 'blue',
        scale: 5,
      },
    },
  });

  directionsRenderer.addListener("directions_changed", () => {
    const directions = directionsRenderer.getDirections();

    if (directions) {
      computeTotalDistance(directions);
    }
  });


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

  // 경로 설정
  const directionsRequest = {
    origin: { lat: list[0].latitude, lng: list[0].longitude },
    destination: { lat: list[list.length - 1].latitude, lng: list[list.length - 1].longitude },
    waypoints: waypoints,
    travelMode: google.maps.TravelMode.DRIVING,
    avoidTolls: true
  };

  const directionsService = new google.maps.DirectionsService();

  directionsService.route(directionsRequest, (response, status) => {
    if (status === google.maps.DirectionsStatus.OK && response) {
      // DirectionsRenderer에 경로 표시
      directionsRenderer.setDirections(response);

      // 출발지 마커 생성
      const originMarker = new google.maps.Marker({
        position: directionsRequest.origin,
        map: map,
        label: {
          text: alphabetLabels[0], // 출발지에 'A' 알파벳 레이블 설정
          color: "black",
          fontWeight: "bold",
        },
        zIndex: list.length,
      });

      // 웨이포인트 마커 생성
      directionsRequest.waypoints.forEach((waypoint, index) => {


        if (index <= 10) {
          const waypointMarker = new google.maps.Marker({
            position: waypoint.location as google.maps.LatLng,
            map: map,
            label: {
              text: alphabetLabels[index + 1], // 웨이포인트에 알파벳 레이블 설정
              color: "black",
              fontWeight: "bold",
            },
            zIndex: list.length - (index + 2),
          });
        } else {
          const waypointMarker = new google.maps.Marker({
            position: waypoint.location as google.maps.LatLng,
            map: map,
            label: {
              text: alphabetLabels[index + 1], // 웨이포인트에 알파벳 레이블 설정
              color: "yellow",
              fontWeight: "bold",
            },
            zIndex: list.length - (index + 2),
          });
        }
      });



      // 도착지 마커 생성
      const destinationMarker = new google.maps.Marker({
        position: directionsRequest.destination,
        map: map,
        label: {
          text: alphabetLabels[waypoints.length + 1], // 도착지에 마지막 알파벳 레이블 설정
          color: "black",
          fontWeight: "bold",
        },
        zIndex: 1,
      });
      destinationMarker.addListener('click', () => {
        // const sidebarItem = document.getElementsByClassName("adb-list-item")[index + 1];
      })
      // // 도착지 말풍선 생성
      // geocodeLatLng(destinationMarker.getPosition()!)
      //   .then((address) => {
      //     const infoWindow = new google.maps.InfoWindow({
      //       content: address,
      //     });
      //     destinationMarker.addListener('click', () => {
      //       infoWindow.open(map, destinationMarker);
      //       map.setCenter(destinationMarker.getPosition()!);
      //     });
      //   })
      //   .catch((error) => {
      //     console.error('Reverse geocoding failed:', error);
      //   });

    } else {
      console.error('경로 요청 실패:', status);
    }
  });
}

function geocodeLatLng(latlng: google.maps.LatLng): Promise<string> {
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
        resolve(results[0].formatted_address);
      } else {
        reject(new Error('Reverse geocoding failed'));
      }
    });
  });
}


declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;

export { };
