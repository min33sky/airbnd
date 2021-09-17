import React from 'react';
import { ICardData } from '../pages';
import Image from 'next/image';

function MediumCard({ img, title }: ICardData) {
  return (
    <div className="transition duration-300 ease-out transform cursor-pointer hover:scale-105">
      <div className="relative w-80 h-80">
        <Image src={img} layout="fill" alt="medium-card-img" className="rounded-xl" />
      </div>
      <h3 className="mt-3 text-2xl">{title}</h3>
    </div>
  );
}

export default MediumCard;
