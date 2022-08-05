import React from "react";
import { useLazyQuery } from "@apollo/client";
import { YELP_SEARCH } from "../utils/queries";
import SearchBar from '../components/SearchBar';



const Home = () => {
  const [yelpSearch, { data, loading }] = useLazyQuery(YELP_SEARCH, {
    variables: {
      term: 'coffee',
      location: 'seattle',
    }
  });
  const shops = data?.shops || [];
  console.log('Home', { shops });
  if (loading) return <h1>Loading...</h1>;
  const handleSearch = async (location) => {
    const term = 'coffee';
     await yelpSearch({
      variables: { term, location },
    });
  };

  // Components
  
  return (
    <main>
      <div>
        <SearchBar handleSearch={handleSearch}/>
      </div>
    </main>
  );
};

export default Home;
