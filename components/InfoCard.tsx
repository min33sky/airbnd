import React from 'react';
import Image from 'next/image';
import { IRoomData } from '../typings/airbnd';
import { HeartIcon, StarIcon } from '@heroicons/react/outline';

function InfoCard({ description, img, lat, location, long, price, star, title, total }: IRoomData) {
  return (
    <div className="flex px-2 py-2 pr-4 transition duration-200 ease-out border-b cursor-pointer hover:opacity-80 hover:shadow-lg">
      <div className="relative flex-shrink-0 w-40 h-24 md:h-52 md:w-80">
        <Image src={img} layout="fill" objectFit="cover" alt="room-img" className="rounded-2xl" />
      </div>

      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between ">
          <p>{location}</p>
          <HeartIcon className="cursor-pointer h-7" />
        </div>
        <h4 className="text-xl">{title}</h4>

        <div className="w-10 pt-2 border-b" />

        <p className="flex-grow pt-2 text-sm text-gray-500">{description}</p>

        <div className="flex items-end justify-between pt-5">
          <p className="flex items-center">
            <StarIcon className="h-5 text-red-400" />
            {star}
          </p>

          <div>
            <p className="pb-2 text-lg font-semibold lg:text-2xl">{price}</p>
            <p className="text-right font-extralight">{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
