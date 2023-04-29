import React from "react";

//!this component is being used in MyCalendar component line 59 and this data is the one that is showing in the calendar view, this is the content inside the calendar.

export const CalendarEvent = ({ event }) => {
  const { title, user, start, end, notes } = event;

  const newStartDate = new Date(start).toDateString();
  const newEndData = new Date(end).toDateString();

  return (
    <div className="flex flex-1  flex-col items-center justify-center">
      <span className="text-xs">
        {newStartDate} - {newEndData}
      </span>
      <span> creator - {user.name}</span>
      <span className="font-extrabold"> title - {title} </span>
      <span className="animate-bounce"> {notes}</span>
    </div>
  );
};
