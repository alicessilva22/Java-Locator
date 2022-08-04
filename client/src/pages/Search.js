import React from 'react';
import { useQuery } from '@apollo/client';
// Utilities
import { YELP_SEARCH } from '../utils/queries';
// Components

const SearchedShops = () => {
    const { data } = useQuery(YELP_SEARCH, { clientName: 'third-party', variables: {
      term: "coffee", 
      location: "san francisco",
    }});  
    const shops = data?.search?.business || [];
    console.log({shops})
  return (
    <main>
      <div>
        Hello
      </div>
    </main>
  );
};

export default SearchedShops;