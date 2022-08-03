import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloLink } from "apollo-link";


import SearchedMovies from './pages/SearchedMovies';




// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const yelpLink = new createHttpLink({
  uri: "https://api.yelp.com/v3/graphql",
});
const yelpAuthLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
      'Content-Type': 'application/graphql',
    },
  };
});
const YelpAuthorization = new ApolloClient({
  link: ApolloLink.split(
    operation => operation.getContext().clientName === "third-party",
    yelpAuthLink, // <= apollo will send to this if clientName is "third-party"
    yelpLink // <= otherwise will send to this
  )
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// const YelpAuthorization = new ApolloClient({
//   link: yelpAuthLink.concat(yelpLink),
//   cache: new InMemoryCache(),
// });

function App() {
  return (
    <ApolloProvider client={client} YelpAuthorization={YelpAuthorization}>
      <Router>
        <>
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<SearchedMovies />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/me" element={<Profile />} />
            <Route path="/users/:id" element={<Profile />} /> */}
          </Routes>
          {/* <Footer /> */}
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
