import React from 'react';
import Image from 'next/image';

interface ILargeCard {
  img: string;
  title: string;
  description: string;
  buttonText: string;
}

function LargeCard({ buttonText, description, img, title }: ILargeCard) {
  return (
    <section className="relative py-16 cursor-pointer">
      <div className="relative h-96 min-w-[300px]">
        <Image src={img} alt="large-card-img" layout="fill" className="rounded-2xl" />
      </div>

      <div className="absolute top-32 left-12">
        <h3 className="w-64 mb-3 text-4xl">{title}</h3>
        <p>{description}</p>

        <button className="px-4 py-2 mt-5 text-sm text-white bg-gray-900 rounded-lg">
          {buttonText}
        </button>
      </div>
    </section>
  );
}

export default LargeCard;