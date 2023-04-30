import { useState } from "react";

import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { localizer } from "../../helper";
import { CalendarModal, CalendarEvent, FloatingButton } from "../component";
import { useDispatch, useSelector } from "react-redux";
import { modalToggle } from "../../store/ui/uiSlice";
import { onSetActiveEvent } from "../../store/";

export const MyCalendar = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.calendar);

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const eventStyleGetter = (isSelected, event, start, end) => {
    const style = {
      // alignItems: "center",
      // backgroundColor: "red",
      // borderRadius: "50%",
      // opacity: 0.5,
      // color: "white",
    };

    return style;
  };

  const onSelect = (event) => {
    dispatch(onSetActiveEvent(event));
  };

  // !important dispatch(modalToggle()) is setting modal on and off.
  const onDoubleClick = (event) => {
    dispatch(modalToggle());
  };

  const onViewChange = (event) => {
    localStorage.setItem("lastView", event);
  };

  return (
    <div className="mx-10 my-5">
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: "calc(100vh - 100px)",
        }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}

        // culture="es" // how we change into a diff language
        // messages={languageLabels()} // how we change into a diff language of to change the look
      />
      <FloatingButton />
      <CalendarModal />
    </div>
  );
};
