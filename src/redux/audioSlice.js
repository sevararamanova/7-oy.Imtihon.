import { createSlice } from '@reduxjs/toolkit';

const audioSlice = createSlice({
  name: 'audio',
  initialState: {
    isPlaying: false,
    currentTrack: null
  },
  reducers: {
    play: (state, action) => {
      state.isPlaying = true;
      state.currentTrack = action.payload;
    },
    pause: (state) => {
      state.isPlaying = false;
    },
    setTrack: (state, action) => {
      state.currentTrack = action.payload;
    }
  }
});

export const { play, pause, setTrack } = audioSlice.actions;

export default audioSlice.reducer;
