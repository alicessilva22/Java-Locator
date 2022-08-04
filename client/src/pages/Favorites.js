import {
  VStack,
  Heading,
} from '@chakra-ui/react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import CoffeeShopCard from '../components/CoffeeShopCard';
import FavoritesButton from '../components/FavoritesButton';

import fakeRestaurantData from '../assets/fakeRestaurantData';

export default function Favorites() {
  // TODO: Replace with fakeRestaurantData with user's favorites
  // TODO: Create remove from favorites handler and pass with onClick for FavoritesButton
  return (
    <Layout>
      <VStack spacing={6} marginTop={8}>
        <SearchBar />
        <Heading>Favorites</Heading>
        {fakeRestaurantData.businesses.map(coffeeShop =>
          <CoffeeShopCard 
          key={coffeeShop.alias} 
          coffeeShopData={coffeeShop} 
          cardButton={<FavoritesButton type='remove' onClick={''} />}
          />
        )}
      </VStack>
    </Layout>
  )
}