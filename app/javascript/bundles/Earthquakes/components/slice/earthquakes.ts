import { createSlice } from "@reduxjs/toolkit";

import Earthquake from "../models/Earthquake";

export interface Filters {
  magnitudeTypes: string[]
}

interface State {
  isLoading: boolean
  filters: Filters
  page: number,  // The current page.
  count: number, // The total number of pages.
  list: Array<Earthquake>
}

const initialState: State = {
  isLoading: false,
  filters: {
    magnitudeTypes: []
  },
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
    setFilters(state, action) {
      state.filters = action.payload
    },
    setEarthquakes(state, action) {
      const { page, count, earthquakes } = action.payload;
      state.page = page;
      state.count = count;
      state.list = earthquakes;
      state.isLoading = false;
    }
  }
});

export const { loading, setFilters, setEarthquakes } = earthquakesSlice.actions
export default earthquakesSlice.reducer