import React from 'react';
import Image from 'next/image';
import { GlobeAltIcon, MenuIcon, SearchIcon, UserCircleIcon } from '@heroicons/react/outline';

function Header() {
  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 p-5 bg-white shadow-md md:px-10 ">
      {/* Left */}
      <div className="relative flex items-center h-10 my-auto cursor-pointer">
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
          alt="logo"
        />
      </div>
      {/* Search */}
      <div className="flex items-center py-2 rounded-full md:border-2 md:shadow-sm">
        <input
          type="text"
          placeholder="Search..."
          className="flex-grow pl-5 text-gray-600 placeholder-gray-400 bg-transparent outline-none"
        />
        <SearchIcon className="hidden h-8 p-2 text-white bg-red-400 rounded-full cursor-pointer md:inline-flex md:mx-2" />
      </div>
      {/* Right */}
      <div className="flex items-center justify-end space-x-4 text-gray-500">
        <p className="hidden cursor-pointer md:inline-flex">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />

        <div className="flex p-2 space-x-2 border-2 rounded-full">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>
    </header>
  );
}

export default Header;
