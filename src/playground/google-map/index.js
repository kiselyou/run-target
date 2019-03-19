import Map from '@lib/cordova/map/Map'

setTimeout(() => {

  const points = [
    { lat: 53.9175754, lng: 27.4576022 },
    { lat: 53.918012, lng: 27.4537571 },
    { lat: 53.9194392, lng: 27.4501407 },
    { lat: 53.9198715, lng: 27.4481006 }
  ];
  new Map('#map').init(points)

}, 2000)