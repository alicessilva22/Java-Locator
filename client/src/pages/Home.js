import React from "react";
import { useLazyQuery } from "@apollo/client";
import { YELP_SEARCH } from "../utils/queries";
import SearchBar from '../components/SearchBar';
import { VStack } from '@chakra-ui/react';
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

  return (
    <VStack>
      <SearchBar handleSearch={handleSearch} />
      <VStack as='section'>
        {shops.map(shop => (
          <CoffeeShopCard type={Auth.loggedIn() ? "add" : null} key={shop.id} coffeeShopData={shop}>
          </CoffeeShopCard>)
        )}
      </VStack>
    </VStack>
  );
};

export default Home;
