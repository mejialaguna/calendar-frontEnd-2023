import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoute } from "../auth";

import { CalendarPage } from "../calendar/pages";

export const AppRoute = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);

  const auth = "not-authenticated";
  return (
    <Routes>
      {auth === "not-authenticated" ? (
        <Route path="/auth/*" element={<AuthRoute />} />
      ) : (
        <Route path="/*" element={<CalendarPage />} />
      )}

      {/* route by defaulth if they try to navigate to any page route if they are not authenticated just for fail save */}
      <Route path="/*" element={<Navigate to={"/auth/login"} />} />
    </Routes>
  );
};
