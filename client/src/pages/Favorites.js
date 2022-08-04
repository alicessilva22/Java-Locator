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
  return (
    <Layout>
      <VStack spacing={6} marginTop={8}>
        <SearchBar />
        <Heading>Favorites</Heading>
        {fakeRestaurantData.businesses.map(coffeeShop =>
          <CoffeeShopCard 
          key={coffeeShop.alias} 
          coffeeShopData={coffeeShop} 
          cardButton={<FavoritesButton type='remove' />}
          />
        )}
      </VStack>
    </Layout>
  )
}