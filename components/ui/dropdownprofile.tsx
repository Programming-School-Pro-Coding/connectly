'use client';

import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';

const DropDownProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={toggleDropdown}
        className="text-gray-700 hover:text-gray-900 p-3 rounded-full border border-black"
      >
        <BsThreeDots size={25} />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="/profile/edit" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              Edit Profile
            </a>
            <a href='/profile/settings' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              Settings
            </a>
            {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              Logout
            </a> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownProfile;
