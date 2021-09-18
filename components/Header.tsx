/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { GlobeAltIcon, MenuIcon, SearchIcon, UserCircleIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import { UserIcon } from '@heroicons/react/solid';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker, DateRangePickerProps, OnDateRangeChangeProps } from 'react-date-range';
import { useRouter } from 'next/dist/client/router';

interface IHeader {
  placeholder?: string;
}

/**
 * 메인 헤더
 * @returns
 */
function Header({ placeholder }: IHeader) {
  const router = useRouter();

  const [searchInput, setSearchInput] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);

  const selectionRange: DateRangePickerProps = {
    startDate,
    endDate,
    key: 'selection',
  };

  const handleSelect = useCallback((range: OnDateRangeChangeProps) => {
    //? selection -> selectionRange에서 설정한 key
    const start = range.selection.startDate;
    const end = range.selection.endDate;
    setStartDate(start);
    setEndDate(end);
  }, []);

  const resetInput = useCallback(() => {
    setSearchInput('');
  }, []);

  const search = useCallback(() => {
    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        noOfGuests,
      },
    });
    resetInput();
  }, [endDate, noOfGuests, router, searchInput, startDate]);

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 p-5 bg-white shadow-md md:px-10 ">
      {/* Left */}
      <div
        onClick={() => router.push('/')}
        className="relative flex items-center h-10 my-auto cursor-pointer"
      >
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
        <div className="relative flex items-center flex-grow">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={placeholder || 'Search City...'}
            className="w-full pl-5 pr-5 text-sm text-gray-600 placeholder-gray-400 bg-transparent outline-none "
          />
          <XCircleIcon
            onClick={resetInput}
            className={`absolute right-0 h-5 text-gray-400 cursor-pointer ${
              !searchInput && 'hidden'
            }`}
          />
        </div>
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

      {/* Search Calendar */}
      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={['#FD5B61']}
            onChange={handleSelect}
          />

          <div className="flex items-center mb-4 border-b">
            <h2 className="flex-grow text-2xl font-semibold ">Number of Guests</h2>
            <UserIcon className="h-5" />
            <input
              value={noOfGuests}
              onChange={(e) => setNoOfGuests(+e.target.value)}
              min={1}
              type="number"
              className="w-12 pl-2 text-lg text-red-400 outline-none"
            />
          </div>
          <div className="flex">
            <button type="button" onClick={resetInput} className="flex-grow text-gray-500">
              Cancel
            </button>
            <button type="button" onClick={search} className="flex-grow text-red-400">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
