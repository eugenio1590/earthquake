import axios from "axios";
import { Dispatch } from "redux";

import Earthquake, { Coordinates } from "../models/Earthquake";
import Magnitude, { Type } from "../models/Magnitude";
import { loading, setEarthquakes } from "../slice/earthquakes";

const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/vnd.api+json',
    'cache-control': 'no-cache'
  }
});

interface EarthquakeDTO {
  id: string
  attributes: {
    title: string
    place: string
    time: string
    tsunami: boolean
    magnitude: number
    mag_type: string
    coordinates: {
      latitude: string
      longitude: string
    }
  }
  links: {
    external_url: string
  }
}

export const fetchEarthquakes = (page: number) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(loading(true));
      const response = await instance.get('/api/features', { 
        params: {
          page: page
        }
      });
      const data = response.data;
      const pagination = data.meta.pagination;
      const earthquakes: Array<EarthquakeDTO> = data.data;
      const action = setEarthquakes({
        page: pagination.current_page,
        count: Math.ceil(pagination.total / pagination.per_page),
        earthquakes: earthquakes.map(eq => {
          const { title, place, time, tsunami, magnitude, mag_type, coordinates } = eq.attributes;
          const url = eq.links.external_url;
          const position = new Coordinates(parseFloat(coordinates.longitude), parseFloat(coordinates.latitude));
          const mag = new Magnitude(magnitude, Type[mag_type as keyof Type]);
          return new Earthquake(parseInt(eq.id), title, place, time, tsunami, mag, position, url);
        })
      })
      dispatch(action);
    } catch (error) {
      console.log(error.message);
      dispatch(loading(false))
    }
  };
};