import { createSlice } from "@reduxjs/toolkit";

import Earthquake from "../models/Earthquake";

interface State {
  selected: Earthquake | null;   
}

const initialState: State = {
  selected: null
}

const earthquakeSlice = createSlice({
  name: "earthquake",
  initialState: initialState,
  reducers: {
    setEarthquake(state, action) {
      state.selected = action.payload;
    }
  }
});

export const { setEarthquake } = earthquakeSlice.actions
export default earthquakeSlice.reducer