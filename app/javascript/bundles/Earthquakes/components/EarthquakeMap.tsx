import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import EarthquakeCard from "./EarthquakeCard";

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

function EarthquakeMap() {
  const earthquakes: Earthquake[] = useSelector((state: State) => state.earthquakes.list);
  const selected: Earthquake | null = useSelector((state: State) => state.earthquake.selected);
  const center = selected ? selected.position.toGeoObject() : mapCenter;
  return (
    <Box sx={{ height: "100%" }}>
      <MapContainer 
        center={[center.lat, center.lng]} 
        zoom={5} 
        scrollWheelZoom={false} 
        style={mapContainerStyle}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {earthquakes.map(eq => (
          <Marker 
            key={eq.id} 
            position={[eq.position.latitude, eq.position.longitude]}>
            <Popup>
              <EarthquakeCard earthquake={eq} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  )
}

export default EarthquakeMap;