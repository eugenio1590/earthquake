import { createSlice } from "@reduxjs/toolkit";

import Earthquake from "../models/Earthquake";

interface State {
  page: number,  // The current page.
  count: number, // The total number of pages.
  list: Array<Earthquake>
}

const initialState: State = {
  page: 0,  
  count: 0, 
  list: []
}

const earthquakesSlice = createSlice({
  name: "earthquakes",
  initialState: initialState,
  reducers: {
    setEarthquakes(state, action) {
      const { page, count, earthquakes } = action.payload;
      state.page = page;
      state.count = count;
      state.list = page == initialState.page ? earthquakes : [...state.list, ...earthquakes];
    }
  }
});

export const { setEarthquakes } = earthquakesSlice.actions
export default earthquakesSlice.reducer