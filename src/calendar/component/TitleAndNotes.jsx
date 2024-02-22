import React from 'react';
import { Error } from './Error';

export const TitleAndNotes = ({ error, isTitleIncorrect, title, notes, onInputChange }) => (
  <>
    <div className="my-4">
      <label htmlFor="titleAndNotes" className="block text-gray-700 text-sm font-bold mb-2">
        Titles and notes
      </label>
      <input
        id="titleAndNotes"
        className={`shadow appearance-none border rounded w-full py-2 px-3
          text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
        autoCorrect="off"
        placeholder="Título del evento"
        name="title"
        autoComplete="off"
        value={formValues.title}
        onChange={onInputChanged}
      />

      <small id="emailHelp" className={`${error && 'hidden'}`}>
        short description
      </small>

      {error && isTitleIncorrect && <Error message="Please add a title > than 2 characters." />}
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
  </>
);
