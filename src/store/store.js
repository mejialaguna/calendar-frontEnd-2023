import { configureStore } from "@reduxjs/toolkit";

import { calendarSlice } from "./calendar";
import { uiSlice } from "./ui";

export default configureStore({
  reducer: {
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
