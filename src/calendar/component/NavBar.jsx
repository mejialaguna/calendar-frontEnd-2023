import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useAuthStore } from "../../hooks";
import { Popup } from "./Popup";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const { startLogout, user } = useAuthStore();

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const openPopup = () => {
    setIsPopup(!isPopup)
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <h3
              className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium "
              aria-current="page"
            >
              {user?.name}
            </h3>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* <!-- Profile dropdown --> */}
            {/* <div className="relative ml-3"> */}
            <div
              onMouseEnter={openPopup}
              onMouseLeave={openPopup}
            >
                <button
                  type="button"
                  className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={handleDropdownButtonClick}
              >
                <img className='h-6 w-[1rem]' src="../src/public/icons8-logout.gif" alt="GIF description" />
                </button>
            </div>
            {!isOpen &&
              <Popup isOpen={isPopup} />
            }

              {isOpen && (
                <div
                  className="absolute right-10 top-3 rounded-md shadow-lg bg-white w-max"
                  role="menu"
                  aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                
                >
                  <button
                    onClick={startLogout}
                    className="relative block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    id="user-menu-item-2"
                  >
                    Sign out
                  </button>
                </div>
              )}
            {/* </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};
