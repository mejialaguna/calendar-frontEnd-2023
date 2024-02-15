/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { addHours } from 'date-fns';

const tempEvents = {
  _id: new Date().getTime(),
  title: 'my birthday',
  notes: 'GET SOME HOES',
  start: new Date(),
  end: addHours(new Date(), 2),
  user: {
    id: 123456789,
    name: 'JLML',
  },
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [tempEvents],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    addNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    updateEvent: (state, { payload }) => {
      state.events = state.events.map((events) => (events._id !== payload._id ? events : payload));
      state.activeEvent = null;
    },
    removeEvent: (state, { payload }) => {
      state.events = state.events.filter(
        (events) => events._id !== payload._id,
      );
      state.activeEvent = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveEvent, addNewEvent, updateEvent, removeEvent,
} = calendarSlice.actions;
