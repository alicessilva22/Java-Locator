import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { Container } from '@chakra-ui/react';
import CoffeeShopCard from "../components/CoffeeShopCard";


const Favorites = () => {
  const { data, loading } = useQuery(QUERY_ME);
  const me = data?.me || {};
 
  if (loading) return <h1>Loading...</h1>;

  
  console.log("data", data);

  
  return (
    <Container>
      <div>
        <section>
          {me.favorites && me.favorites.map(shop => (
            <CoffeeShopCard type="remove" key={shop.id} coffeeShopData={shop}>
            </CoffeeShopCard>)
          )}
        </section>
      </div>
    </Container>
  );
};

export default Favorites;
