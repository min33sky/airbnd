import React from 'react';
import { ICardData } from '../pages';
import Image from 'next/image';

function MediumCard({ img, title }: ICardData) {
  return (
    <div className="transition duration-300 ease-out transform cursor-pointer hover:scale-105">
      <div className="relative select-none w-80 h-80">
        <Image
          draggable="false"
          src={img}
          layout="fill"
          alt="medium-card-img"
          className="pointer-events-none select-none rounded-xl"
        />
      </div>
      <h3 className="mt-3 text-2xl select-none">{title}</h3>
    </div>
  );
}

export default MediumCard;
