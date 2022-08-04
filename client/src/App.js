import React from 'react';
import {
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'

// import Home from './pages/Home';
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import Profile from './pages/Profile';
// import Header from './components/Header';
// import Footer from './components/Footer';
import SearchedMovies from "./pages/SearchedMovies";

// Construct our main GraphQL API endpoint
const httpLink = new HttpLink({ uri: '/graphql' });

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const expressLink = authLink.concat(httpLink);

const coffeeLink = new HttpLink({ 
  uri: 'https://api.yelp.com/v3/graphql' 
});

const yelpAuthLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
    },
  };
});

const yelpLink = yelpAuthLink.concat(coffeeLink);


const directionalLink = ApolloLink.split(
  (operation) => operation.getContext().clientName === 'third-party',
  yelpLink,
  expressLink,
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: directionalLink,
});

function App() {
  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
        <Router>
          <div className="flex-column justify-flex-start min-100-vh">
            {/* <Header /> */}
            <div className="container">
              <Route exact path="/">
                <SearchedMovies />
              </Route>
              {/* <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/me">
                <Profile />
              </Route>
              <Route exact path="/users/:id">
                <Profile />
              </Route> */}
            </div>
            {/* <Footer /> */}
          </div>
        </Router>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;