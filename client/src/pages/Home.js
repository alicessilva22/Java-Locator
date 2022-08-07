import React from "react";
import { useLazyQuery } from "@apollo/client";
import { YELP_SEARCH } from "../utils/queries";
import SearchBar from '../components/SearchBar';
import { Container } from '@chakra-ui/react';
import CoffeeShopCard from "../components/CoffeeShopCard";
import Auth from "../utils/auth";

const Home = () => {
  const [yelpSearch, { data, loading }] = useLazyQuery(YELP_SEARCH);
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
    <Container>
      <div>
        <SearchBar handleSearch={handleSearch}/>
        <section>
          {shops.map(shop => (
            <CoffeeShopCard type={ Auth.loggedIn() ? "add" : null } key={shop.id} coffeeShopData={shop}>
            </CoffeeShopCard>)
          )}
        </section>
      </div>
    </Container>
  );
};

export default Home;
