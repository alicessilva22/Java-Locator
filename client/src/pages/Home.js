// Node Modules
import React from 'react';
import { useQuery } from '@apollo/client';
// Utilities
import Auth from '../utils/auth';
import { YELP_SEARCH } from '../utils/queries';
// Components
import UserList from '../components/UserList';

const Home = () => {
  const { loading, data } = useQuery(YELP_SEARCH);
  const shops = data?.data.search.business || [];
  console.log(shops);
};

export default Home;
