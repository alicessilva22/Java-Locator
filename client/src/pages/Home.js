// Node Modules
import React, { useState } from "react";

import { useQuery } from "@apollo/client";
// Utilities
import { YELP_SEARCH } from "../utils/queries";
import SearchBar from '../components/SearchBar';

// import { searchGoogleBooks } from "../utils/API";
// import { shops } from "../../../server/schemas/resolvers"
// import { saveBookIds, getSavedBookIds } from "../utils/localStorage";
// import { SAVE_BOOK } from "../utils/mutations";
// import { useMutation } from "@apollo/client";


const Home = () => {
  // const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchInput] = useState("");
  // useEffect(() => {
  //   return () => {
  //     saveBookIds(savedBookIds);
  //   };
  // });
  // const [saveBook] = useMutation(SAVE_BOOK);
  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   if (!searchInput) {
  //     return false;
  //   }
  //   try {
  //     const response = await useQuery(YELP_SEARCH(searchInput));
  //     if (!response.ok) {
  //       throw new Error("something went wrong!");
  //     }
  //     // const { items } = await response.json();
  //     // const shopData = items.map((shop) => ({
  //     //   name: shop.name,
  //     //   rating: shop.rating,
  //     //   review_count: shop.review_count,
  //     //   location: shop.location.display_address,
  //     //   url: shop.url,
  //     //   image_url: shop.image_url

  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

// Components


  const { data } = useQuery(YELP_SEARCH(searchInput));  
    const shops = data?.shops[0].name || [];
    console.log({shops});
  return (
    <main>
      <div>
        <SearchBar />
      <p>
        Hello
      </p>
      </div>
    </main>
  );
};
  
export default Home;
