/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMemo, useState, useEffect } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import es from 'date-fns/locale/es';
import { useCalendarStore, useUiStore } from '../../hooks';

registerLocale('es', es);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    // transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent, startDeletingEvent } = useCalendarStore();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const isValid = useMemo(() => {
    if (!formSubmitted) return '';

    return formValues.title.length > 0;
  }, [formValues.title, formSubmitted]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onCloseModal = () => {
    closeDateModal();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(difference) || difference <= 0) {
      Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
      return;
    }

    if (formValues.title.length <= 0) return;

    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);
  };
console.log(activeEvent?.messageId);
  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <div className="w-full max-w-md mx-auto">
        <h1> Nuevo evento </h1>
        <hr />
        <form className="bg-white shadow border rounded px-8 pb-8" onSubmit={onSubmit}>
          <div className="mt-3 mb-1">
            <label htmlFor={'datePicker'} className="block text-gray-700 text-sm font-bold mb-2">
              Start time and date
            </label>
            <DatePicker
              selected={formValues.start}
              onChange={(event) => onDateChanged(event, 'start')}
              className="shadow appearance-none border rounded w-full py-2
           px-3 text-gray-700 leading-tight focus:outline-none
            focus:shadow-outline mb-2"
              dateFormat="Pp"
              // minDate={start}
              showTimeSelect
              locale="en"
              placeholderText="start time and date"
              timeCaption="time"
            />
          </div>

          <div className="mb-1">
            <label htmlFor={'datePicker'} className="block text-gray-700 text-sm font-bold mb-2">
              End time and date
            </label>
            <DatePicker
              minDate={formValues.start}
              selected={formValues.end}
              onChange={(event) => onDateChanged(event, 'end')}
              className={`shadow appearance-none border rounded w-full
         py-2 px-3 text-gray-700 leading-tight focus:outline-none
          focus:shadow-outline mb-2`}
              dateFormat="Pp"
              showTimeSelect
              placeholderText="start time and date"
              locale="en"
              timeCaption="time"
            />
          </div>

          <hr />

          <div className="my-4">
            <label htmlFor="titleAndNotes" className="block text-gray-700 text-sm font-bold mb-2">
              Titles and notes
            </label>
            <input
              id="titleAndNotes"
              className={`shadow appearance-none border rounded w-full py-2 px-3
          text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              autoCorrect="off"
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
              value={formValues.title}
              onChange={onInputChanged}
            />

            <small id="emailHelp" className={`${!isValid ? 'hidden' : 'inline'}`}>
              short description
            </small>
          </div>

          <div className="mb-4">
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3
        text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Notas"
              rows="5"
              name="notes"
              value={formValues.notes}
              onChange={onInputChanged}
            />

            <small id="emailHelp">Additional Information</small>
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold
               py-2 px-4 rounded  focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {activeEvent?.messageId ? 'Update' : 'Save'}
            </button>

            {activeEvent?.messageId && (
              <button
                type="button"
                className="bg-red-900 w-full hover:bg-red-700 text-white font-bold
                 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={startDeletingEvent}
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
