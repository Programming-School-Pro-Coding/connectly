"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GoSignOut } from "react-icons/go";
import { CiSettings } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FaEdit } from 'react-icons/fa'
import { useClerk } from "@clerk/clerk-react";

import { user } from "@/lib/interfaces";

const Dropdown = ({
  image,
  id,
  user,
  email,
}: {
  image: string;
  id: string;
  user: user;
  email: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useClerk();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    signOut();
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center justify-center p-2 text-gray-600 rounded-full transition duration-700 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-200"
      >
        <Image
          src={image}
          alt="Profile Icon"
          className="w-8 h-8 rounded-full"
          width={108}
          height={108}
        />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute flex flex-col right-0 mt-2 p-3 px-5 w-[23.5rem] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {/* Dropdown items */}
            <div className="bg-white my-2 w-full rounded-lg">
              <div className="p-4 flex gap-3">
                <Image
                  src={image}
                  alt={user?.name}
                  width={108}
                  height={108}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {user?.name}
                  </h2>
                  <p className="text-gray-600 mb-4">{email}</p>
                </div>
              </div>
            </div>
            <a
              href={`/profile/${id}`}
              className="flex items-center jusitfy-center gap-16 w-full py-[0.875rem] px-[1.5rem] text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <CgProfile size={25} />{" "}
              <span className="font-bold text-base">Profile</span>
            </a>
            <a
              href={`/profile/edit`}
              className="flex items-center jusitfy-center gap-16 w-full py-[0.875rem] px-[1.5rem] text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <FaEdit size={25} />{" "}
              <span className="font-bold text-base">Edit Profile</span>
            </a>
            <a
              href="/profile/settings"
              className="flex items-center jusitfy-center gap-16 w-full py-[0.875rem] px-[1.5rem] text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <CiSettings size={25} />{" "}
              <span className="font-bold text-base">Settings</span>
            </a>
            <button
              onClick={handleSignOut}
              className="flex items-center jusitfy-center gap-16 w-full py-[0.875rem] px-[1.5rem] text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <GoSignOut size={25} />
              <span className="font-bold text-base">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
