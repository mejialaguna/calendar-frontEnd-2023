import { useDispatch, useSelector } from 'react-redux';

import { addHours } from 'date-fns';

import Modal from 'react-modal';
import { modalToggle, removeEvent } from '../../store';

import { useForm } from '../../hooks';

import { DatePickerComponent, TitleAndNotes } from './';

const modalInitialState = {
  title: '',
  notes: '',
  start: new Date(),
  end: addHours(new Date(), 2),
  user: {
    _id: 12345,
    name: 'JLML',
  },
};

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
  } = useForm(modalInitialState);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-100%, 0%)',
    },
  };

  const allDatePickerData = {
    ...form, error, isDateIncorrect, onDateChange,
  };

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

  Modal.setAppElement('#root');

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
        <div className="flex ml-3 animate__bounceIn">
          <h1 className="text-2xl "> New Event </h1>
        </div>

        <form
          className="bg-white shadow border rounded px-8 pb-8 "
          onSubmit={onFormSubmit}
        >
          <DatePickerComponent {...allDatePickerData} />

          <hr />

          <TitleAndNotes {...TitleAndNotesData} />

          <div className="flex items-center justify-center gap-2">
            <button
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold
               py-2 px-4 rounded  focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>

            {form._id && (
              <button
                type="button"
                className="bg-red-900 w-full hover:bg-red-700 text-white font-bold
                 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={deleteEvent}
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};
