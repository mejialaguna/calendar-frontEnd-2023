import { useEffect, useState } from "react";

import { differenceInSeconds, addHours } from "date-fns";

import { useDispatch, useSelector } from "react-redux";
import { modalToggle } from "../store/ui/uiSlice";
import { addNewEvent, updateEvent } from "../store";

export const useForm = (modalInitialState) => {
  const dispatch = useDispatch();
  const { activeEvent } = useSelector((state) => state.calendar);

  const [form, setForm] = useState(modalInitialState);

  const [error, setError] = useState(false);
  const [isDateIncorrect, setIsDateIncorrect] = useState(false);
  const [isTitleIncorrect, setIsTitleIncorrect] = useState(false);

  // ! important, useEffect its setting form every time it changes.
  useEffect(() => {
    if (activeEvent !== null) {
      setForm({ ...activeEvent });
    }
  }, [activeEvent]);

  // ! important dispatch action to store and update state of isDateModalOpen to opposite .
  // ! if is open this will close the isDateModal.
  const closeModal = () => {
    dispatch(modalToggle());
  };

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });

    setError(false);
    setIsTitleIncorrect(false);
  };

  const onDateChange = (event, changing) => {
    setForm({ ...form, [changing]: event });

    setError(false);
    setIsDateIncorrect(false);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const difference = differenceInSeconds(form.end, form.start);

    if (difference <= 0 || isNaN(difference)) {
      setError(true);
      setIsDateIncorrect(true);
      return;
    }

    if (form?.title?.length <= 2) {
      setError(true);
      setIsTitleIncorrect(true);
      return;
    }

    // ! important dispatch action to store and update state of isDateModalOpen to opposite .
    // ! if is open this will close the isDateModal.
    if (error === false && activeEvent._id) {
      dispatch(updateEvent(form));
      dispatch(modalToggle());
    } else {
      dispatch(addNewEvent({ ...form, _id: new Date().getTime() }));
      dispatch(modalToggle());
    }

    console.log("submitted");
  };

  return {
    ...form,
    closeModal,
    error,
    form,
    isDateIncorrect,
    isTitleIncorrect,
    onDateChange,
    onFormSubmit,
    onInputChange,
  };
};
