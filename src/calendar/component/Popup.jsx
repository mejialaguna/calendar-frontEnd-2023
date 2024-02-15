import React from 'react';

export const Popup = ({ isOpen }) => (
    <div className={`absolute right-6 top-10 rounded-md shadow-lg bg-white w-max ${isOpen ? 'block' : 'hidden'}`}>
      <p className="px-2 py-1 text-sm text-gray-700">Exit</p>
    </div>
);
