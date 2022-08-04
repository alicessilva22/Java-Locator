import React from 'react';
import { useQuery } from '@apollo/client';
// Utilities
import { QUERY_FROM_YELP } from '../utils/queries';
// Components

const SearchedMovies = () => {
    const { data } = useQuery(QUERY_FROM_YELP, { clientName: 'third-party', variables: {}});  
    const shops = data?.data || [];
  return (
    <main>
      <div>
         console.log({shops})
      </div>

    </main>
  );
};

export default SearchedMovies;