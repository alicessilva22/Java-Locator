import {
  VStack,
  Heading,
} from '@chakra-ui/react';
import CoffeeShopCard from '../components/CoffeeShopCard';
import FavoritesButton from '../components/FavoritesButton';

import fakeRestaurantData from '../assets/fakeRestaurantData';

export default function Favorites() {
  // TODO: Replace with fakeRestaurantData with user's favorites
  // TODO: Create remove from favorites handler and pass with onClick for FavoritesButton
  return (
      <VStack spacing={6} marginTop={8}>
        <Heading>Favorites</Heading>
        {fakeRestaurantData.businesses.map(coffeeShop =>
          <CoffeeShopCard 
          key={coffeeShop.alias} 
          coffeeShopData={coffeeShop} 
          cardButton={<FavoritesButton type='remove' onClick={''} />}
          />
        )}
      </VStack>
  )
}