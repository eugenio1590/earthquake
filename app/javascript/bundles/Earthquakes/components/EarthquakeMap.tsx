import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import { State } from "./store";
import Earthquake from "./models/Earthquake";

const mapContainerStyle = {
  width: '100%',
  height: '100%'
}

const mapCenter = {
  lat: 38.9182803,
  lng: -96.6782088
}

function markers(earthquakes: Earthquake[], onClick: (eq: Earthquake) => void): Array<any> {
  return earthquakes.map(eq => {
    const marker = new window.google.maps.Marker(eq.marker());
    marker.addListener("click", () => onClick(eq));
    return marker;
  });
}

function EarthquakeMap() {
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY});
  const earthquakes: Earthquake[] = useSelector((state: State) => state.earthquakes.list);
  const onClick = (eq: Earthquake) => {/* TODO */}
  return (
    <Box sx={{ height: "100%" }}>
      { isLoaded && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={5}
          onLoad={map => markers(earthquakes, onClick).forEach(m => m.setMap(map))}
        />
      ) }
    </Box>
  )
}

export default EarthquakeMap;