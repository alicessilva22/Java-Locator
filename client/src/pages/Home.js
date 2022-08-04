// Node Modules
import React from "react";
import { useQuery } from "@apollo/client";
// Utilities
import { YELP_SEARCH } from "../utils/queries";
// Components

const Home = () => {
  const { data } = useQuery(YELP_SEARCH);
  const shops = data?.search?.business || [];
  console.log({ shops });
  return (
    <main>
      <div>
        Hello Safwan
      </div>
    </main>
  );
};

export default Home;
