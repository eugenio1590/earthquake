import React from "react";
import { Provider } from "react-redux";
import { Grid } from "@mui/material";

import store from "./store";

import EarthquakeList from "./EarthquakeList";
import EarthquakeMap from "./EarthquakeMap";

const Earthquakes = () => {
  return (
    <Provider store={store}>
      <Grid container spacing={2} height="calc(100vh - 24px)">
        <Grid item xs={3}>
          <EarthquakeList />
        </Grid>
        <Grid item xs={9}>
          <EarthquakeMap />
        </Grid>
      </Grid>
    </Provider>
  );
};

export default Earthquakes;