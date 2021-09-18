import { getCenter } from 'geolib';
import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { IRoomData } from '../typings/airbnd';

interface MapType {
  width: string;
  height: string;
  latitude: number;
  longitude: number;
  zoom: number;
}

interface IMap {
  searchResults?: IRoomData[];
}

function Map({ searchResults = [] }: IMap) {
  const [selectionLocation, setSelectionLocation] = useState<IRoomData | null>(null);

  //* 위도, 경도를 추출
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  //* 중앙 위치의 위도, 경도를 알아낸다
  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState<MapType>({
    width: '100%',
    height: '100%',
    latitude: center ? center.latitude : 0,
    longitude: center ? center.longitude : 0,
    zoom: 11,
  });

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/min33sky/cktpw4yhl2mqg17pu56jpw7vl"
      mapboxApiAccessToken={process.env.mapbox_key}
      onViewportChange={(viewport: any) => setViewport(viewport)}
    >
      {searchResults.map((result) => (
        <div key={result.img}>
          <Marker longitude={result.long} latitude={result.lat} offsetLeft={-20} offsetTop={-10}>
            <p
              role="img"
              onClick={() => setSelectionLocation(result)}
              className="text-2xl cursor-pointer animate-bounce"
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>

          {selectionLocation?.long === result.long ? (
            <Popup
              closeOnClick={true}
              onClose={() => setSelectionLocation(null)}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
