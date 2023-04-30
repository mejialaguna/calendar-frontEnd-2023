import React from "react";
import { useDispatch } from "react-redux";

import { addHours } from "date-fns";
import { modalToggle, onSetActiveEvent } from "../../store";

const newEventValues = {
  title: "",
  notes: "",
  start: new Date(),
  end: addHours(new Date(), 2),
  user: {
    _id: 1234522,
    name: "JLML",
  },
};

export const FloatingButton = () => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(onSetActiveEvent(newEventValues));
    dispatch(modalToggle());
  };

  return (
    <button
      onClick={onClick}
      type="button"
      title="Contact Sale"
      className="fixed z-90 bottom-10 right-20 bg-blue-600 animate-bounce w-8 h-8 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl opacity-50  hover:drop-shadow-2xl  hover:opacity-100 hover:w-16 hover:h-16 transition-ease-in-out duration-700 "
    >
      &#8853;
    </button>
  );
};
