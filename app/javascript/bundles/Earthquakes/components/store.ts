import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { thunk } from "redux-thunk";
import { useDispatch } from "react-redux";

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
      getDefaultMiddleware().prepend(logger, thunk),
})

export default store;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch