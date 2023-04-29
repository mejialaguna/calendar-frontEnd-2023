import { useDispatch, useSelector } from "react-redux";
import { modalToggle, removeEvent } from "../../store";

import Modal from "react-modal";

import { useForm } from "../../hooks";

import { DatePickerComponent, TitleAndNotes } from "./";

import { save, calendar, remove } from "../../public";

export const CalendarModal = () => {
  // ! important hold the value if the modal is open or closed.
  const { isDateModalOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const {
    closeModal,
    error,
    form,
    isDateIncorrect,
    isTitleIncorrect,
    onDateChange,
    onFormSubmit,
    onInputChange,
  } = useForm();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-100%, 0%)",
    },
  };

  const allDatePickerData = { ...form, error, isDateIncorrect, onDateChange };

  const TitleAndNotesData = {
    ...form,
    error,
    isTitleIncorrect,
    onInputChange,
  };

  const deleteEvent = () => {
    // Dispatch the deleteEvent action with the form._id as payload
    dispatch(removeEvent(form));
    dispatch(modalToggle());
  };

  Modal.setAppElement("#root");

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-1 items-center ml-3 animate__bounceIn">
          <img
            src={calendar}
            alt="calendar-icon"
            className="w-8 h-8 inline mr-5"
          />
          <h1 className="text-3xl my-2 "> New Event </h1>
        </div>
        <hr />

        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={onFormSubmit}
        >
          <DatePickerComponent {...allDatePickerData} />

          <hr />

          <TitleAndNotes {...TitleAndNotesData} />

          <div className="flex items-center justify-center gap-2">
            <button
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  focus:outline-none focus:shadow-outline"
              type="submit"
            >
              <img className="w-8 h-8 inline mr-5" src={save} alt="save icon" />
              Save
            </button>

            {form._id && (
              <button
                type="button"
                className="bg-red-900 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={deleteEvent}
              >
                <img
                  className="w-8 h-8 inline mr-5"
                  src={remove}
                  alt="save icon"
                />
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};
