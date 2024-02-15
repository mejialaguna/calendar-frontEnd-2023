/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDateModalOpen: false,
  },
  reducers: {
    modalToggle: (state) => {
      state.isDateModalOpen = !state.isDateModalOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { modalToggle } = uiSlice.actions;
