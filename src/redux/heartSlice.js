// src/redux/heartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  likedSongs: []
};

const heartSlice = createSlice({
  name: 'heart',
  initialState,
  reducers: {
    toggleHeart: (state, action) => {
      const index = state.likedSongs.findIndex(song => song.id === action.payload.id);
      if (index === -1) {
        state.likedSongs.push(action.payload);
      } else {
        state.likedSongs.splice(index, 1);
      }
    }
  }
});

export const { toggleHeart } = heartSlice.actions;
export default heartSlice.reducer;
