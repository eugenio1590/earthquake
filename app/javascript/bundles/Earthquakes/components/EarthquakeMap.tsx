import React from "react";
import { renderToString } from "react-dom/server";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import EarthquakeCard from "./EarthquakeCard";

import { State } from "./store";
import Earthquake from "./models/Earthquake";
import { setEarthquake } from "./slice/earthquake";

const mapContainerStyle = {
  width: '100%',
  height: '100%'
}

const mapCenter = {
  lat: 38.9182803,
  lng: -96.6782088
}

let infoWindow: any = null;

function infoWindowInstance(): any {
  if (!infoWindow) {
    infoWindow = new window.google.maps.InfoWindow();
  }
  return infoWindow;
}

function markers(earthquakes: Earthquake[], onClick: (eq: Earthquake) => void): Array<any> {
  return earthquakes.map(eq => {
    const marker = new window.google.maps.Marker(eq.marker());
    marker.addListener("click", () => {
      onClick(eq);
      let infoWindow = infoWindowInstance();
      infoWindow.close();
      infoWindow.setContent(renderToString(<EarthquakeCard earthquake={eq} />));
      infoWindow.open(marker.getMap(), marker);
    });
    return marker;
  });
}

function EarthquakeMap() {
  const dispatch = useDispatch();
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY});
  const earthquakes: Earthquake[] = useSelector((state: State) => state.earthquakes.list);
  const selected: Earthquake | null = useSelector((state: State) => state.earthquake.selected);
  const center = selected ? selected.position.toGeoObject() : mapCenter;
  const onClick = (eq: Earthquake) => dispatch(setEarthquake(eq));
  return (
    <Box sx={{ height: "100%" }}>
      { isLoaded && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={5}
          onLoad={map => markers(earthquakes, onClick).forEach(m => m.setMap(map))}
        />
      ) }
    </Box>
  )
}

export default EarthquakeMap;