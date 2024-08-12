// store.js
import { configureStore } from '@reduxjs/toolkit';
import heartReducer from './heartSlice';
import audioReducer from './audioSlice';

const store = configureStore({
  reducer: {
    heart: heartReducer,
    audio: audioReducer
  },
});

export default store;
