import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { thunk } from "redux-thunk";
import { useDispatch } from "react-redux";

import earthquakesReducers from "./slice/earthquakes";
import earthquakeReducers from "./slice/earthquake";
import commentSliceReducers from "./slice/comment";

const rootReducer = combineReducers({
  earthquakes: earthquakesReducers,
  earthquake: earthquakeReducers,
  comment: commentSliceReducers
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