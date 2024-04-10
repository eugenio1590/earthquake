import axios from "axios";
import { Dispatch } from "redux";
import Earthquake from "../models/Earthquake";
import { setEarthquake } from "../slice/earthquake";
import { reset, loading, success, failure } from "../slice/comment";

const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/vnd.api+json',
    'cache-control': 'no-cache'
  }
});

export const addComment = (eq: Earthquake, data: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(reset());
    dispatch(loading(true));
    dispatch(setEarthquake(eq));
    try {
      await instance.post(`/api/features/${eq.id}/comments`, data);
      dispatch(success());
    } catch (error) {
      console.log(error.message);
      dispatch(failure(`An error occurrer: ${error.message}`))
    }
  }
}