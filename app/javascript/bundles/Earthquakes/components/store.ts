import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";

import earthquakesReducers from "./slice/earthquakes";
import earthquakeReducers from "./slice/earthquake";

const rootReducer = combineReducers({
  earthquakes: earthquakesReducers,
  earthquake: earthquakeReducers
});

export type State = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware().prepend(logger),
})

export default store;