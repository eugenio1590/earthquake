import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { Map } from "leaflet";
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
  const [map, setMap] = useState<Map>(null);
  const [popup, setPopup] = useState(null);
  useEffect(() => {
    if (map && selected && popup) {
      const position = selected.position;
      map.closePopup();
      map.setView([position.latitude, position.longitude], 13);
      map.openPopup(popup);
    }
  }, [map, selected, popup])
  return (
    <Box sx={{ height: "100%" }}>
      <MapContainer 
        ref={setMap}
        center={[mapCenter.lat, mapCenter.lng]} 
        zoom={5} 
        scrollWheelZoom={true} 
        style={mapContainerStyle}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {earthquakes.map(eq => (
          <Marker 
            key={eq.id} 
            position={[eq.position.latitude, eq.position.longitude]}>
            <Popup ref={selected == eq ? setPopup : null}>
              <EarthquakeCard earthquake={eq} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  )
}

export default EarthquakeMap;