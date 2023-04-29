import React from "react";
import { Error } from "./Error";

export const TitleAndNotes = ({
  error,
  isTitleIncorrect,
  title,
  notes,
  onInputChange,
}) => {
  return (
    <>
      <div className="my-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Titles and notes
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            error &&
            isTitleIncorrect &&
            "bg-orange-100 border-l-4 border-orange-500 focus:border-orange-500 animate__bounceIn"
          } `}
          name="title"
          type="text"
          placeholder="titles and notes"
          autoCorrect="off"
          value={title}
          onChange={onInputChange}
        />

        <small id="emailHelp" className={`${error && "hidden"}`}>
          short description
        </small>

        {error && isTitleIncorrect && (
          <Error message="Please add a title > than 2 characters." />
        )}
      </div>

      <div className="mb-4">
        <textarea
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Notas"
          rows="5"
          name="notes"
          value={notes}
          onChange={onInputChange}
        />

        <small id="emailHelp">Additional Information</small>
      </div>
    </>
  );
};
