import React from "react";
import { useQuery } from "@apollo/client";
import { YELP_SEARCH } from "../utils/queries";
import {
  VStack,
} from '@chakra-ui/react';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const { data } = useQuery(YELP_SEARCH);
  const shops = data?.shops[0].name || [];
  console.log({ shops });
  return (
    <VStack spacing={6} marginTop={8}>
      <SearchBar />
    </VStack>
  );
};

export default Home;
