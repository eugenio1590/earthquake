import { createSlice } from "@reduxjs/toolkit";

import Earthquake from "../models/Earthquake";

interface State {
  isLoading: boolean
  page: number,  // The current page.
  count: number, // The total number of pages.
  list: Array<Earthquake>
}

const initialState: State = {
  isLoading: false,
  page: 0,  
  count: 0, 
  list: []
}

const earthquakesSlice = createSlice({
  name: "earthquakes",
  initialState: initialState,
  reducers: {
    loading(state, action) {
      state.isLoading = action.payload
    },
    setEarthquakes(state, action) {
      const { page, count, earthquakes } = action.payload;
      state.page = page;
      state.count = count;
      state.list = page == initialState.page ? earthquakes : [...state.list, ...earthquakes];
      state.isLoading = false;
    }
  }
});

export const { loading, setEarthquakes } = earthquakesSlice.actions
export default earthquakesSlice.reducer