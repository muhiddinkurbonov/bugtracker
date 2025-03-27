import { configureStore } from "@reduxjs/toolkit";
import bugsReducer from './bugSlice';

const store = configureStore({
  reducer: {
    bugs: bugsReducer,
  },
});

export default store;
