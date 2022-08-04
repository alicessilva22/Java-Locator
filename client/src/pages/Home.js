// Node Modules
import React from "react";
import { useQuery } from "@apollo/client";
// Utilities
import { YELP_SEARCH } from "../utils/queries";
// Components

const Home = () => {
  const { data } = useQuery(YELP_SEARCH);  
    const shops = data?.shops[0].name || [];
    console.log({shops});
  return (
    <main>
      <div>
        <p>
        Hello
        </p>
      </div>
    </main>
  );
};

export default Home;
