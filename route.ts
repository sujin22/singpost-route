/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

function initMap(): void {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 4,
        center: { lat: 1.31895, lng: 203.89445 },
  
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
  
    displayRoute(
      {location: {lat: 1.31895, lng: 103.89445}}, //origin
      {location: {lat: 1.31895, lng: 103.89445}}, //destination
      directionsService,
      directionsRenderer
    );
  }
  
  
  function displayRoute(
    origin: google.maps.Place,
    destination: google.maps.Place,
    service: google.maps.DirectionsService,
    display: google.maps.DirectionsRenderer
  ) {
    service
      .route({
        origin: origin,
        destination: destination,
        waypoints: [
          { location: { lat: 1.3702, lng: 103.87204 } },
          { location: { lat: 1.3702, lng: 103.87204 } },
          { location: { lat: 1.37256, lng: 103.87571 } },
          { location: { lat: 1.35402, lng: 103.86425 } },
          { location: { lat: 1.3718, lng: 103.84778 } },
          { location: { lat: 1.3718, lng: 103.84778 } },
          { location: { lat: 1.37589, lng: 103.85562 } },
          { location: { lat: 1.3718, lng: 103.84778 } },
          { location: { lat: 1.3718, lng: 103.84778 } },
          { location: { lat: 1.37792, lng: 103.87541 } },
          { location: { lat: 1.37688, lng: 103.84729 } },
          { location: { lat: 1.37688, lng: 103.84729 } },
          { location: { lat: 1.3718, lng: 103.84778 } },
          { location: { lat: 1.37589, lng: 103.85562 } },
          { location: { lat: 1.3718, lng: 103.84778 } },
        ],
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
  window.initMap = initMap;
  export {};
  