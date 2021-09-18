import { format } from 'date-fns';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import React, { useMemo } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getRoomsData } from '../api/data';
import Footer from '../components/Footer';
import Header from '../components/Header';
import InfoCard from '../components/InfoCard';
import Map from '../components/Map';

export interface ISearchQuery {
  location: string;
  startDate: string;
  endDate: string;
  noOfGuests: string;
}

interface ISearch {
  searchQuery: ISearchQuery;
}

function Search({ searchQuery }: ISearch) {
  //? CORS 때문에 refetch 막았다.
  const { data: searchResults } = useQuery('roomsData', getRoomsData, { enabled: false });

  const { endDate, location, noOfGuests, startDate } = searchQuery;

  const formattedStartDate = startDate ? format(new Date(startDate), 'dd MMMM yy') : '';
  const formattedEndDate = endDate ? format(new Date(endDate), 'dd MMMM yy') : '';
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div>
      <Header
        placeholder={location ? `${location} | ${range} | ${noOfGuests} guests` : undefined}
      />

      <main className="flex">
        <section className="flex-grow px-6 pt-14 ">
          <p>
            300+ Stays - {range} - for {noOfGuests} number of guests
          </p>

          <h1 className="mt-2 mb-6 text-3xl font-semibold">Stays in {location}</h1>

          <div className="hidden mb-5 space-x-3 text-gray-800 lg:inline-flex whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>

          {searchResults?.map(
            ({ description, img, lat, location, long, price, star, title, total }) => (
              <InfoCard
                key={title}
                title={title}
                description={description}
                img={img}
                lat={lat}
                location={location}
                long={long}
                price={price}
                star={star}
                total={total}
              />
            )
          )}
        </section>

        <section className="hidden lg:inline-flex lg:min-w-[600px]">
          <Map searchResults={searchResults} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const searchQuery = ctx.query;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('roomsData', getRoomsData);

  return {
    props: {
      searchQuery,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Search;
