import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

const store = configureStore({
  reducer: {},
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware().prepend(logger),
})

export default store;