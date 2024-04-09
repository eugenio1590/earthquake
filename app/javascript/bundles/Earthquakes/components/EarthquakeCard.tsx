import React, { FunctionComponent } from "react";
import moment from "moment";

import Earthquake, { Coordinates } from "./models/Earthquake";

interface Props {
  earthquake: Earthquake
}

function coordinatesFormat(position: Coordinates) {
  const { lat, lng } = position.toGeoObject();

  const latDirection = lat >= 0 ? 'N' : 'S';
  const lngDirection = lng >= 0 ? 'E' : 'W';

  const formattedLat = `${Math.abs(lat).toFixed(3)}°${latDirection}`;
  const formattedLng = `${Math.abs(lng).toFixed(3)}°${lngDirection}`;

  return `${formattedLat} ${formattedLng}`;
}

const EarthquakeCard: FunctionComponent<Props> = (props: Props) => {
  const eq = props.earthquake;
  const date = moment(eq.time);
  return (
    <div id="content">
      <div id="siteNotice">{date.format('YYYY-MM-DD HH:mm:ss')} (UTC {date.format('Z')})</div>
      <h2 id="firstHeading" className="firstHeading">{eq.title}</h2>
      <div id="bodyContent">
        <table>
          <tbody>
            <tr>
              <td><b>Location:</b></td>
              <td>{coordinatesFormat(eq.position)}</td>
            </tr>
            <tr>
              <td><b>Place:</b></td>
              <td>{eq.place}</td>
            </tr>
            <tr>
              <td><b>Magnitude:</b></td>
              <td>{eq.magnitude.value}</td>
            </tr>
            <tr>
              <td><b>Tsunami:</b></td>
              <td>{eq.tsunami ? 'yes' : 'no'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EarthquakeCard;