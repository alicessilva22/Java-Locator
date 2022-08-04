import React from 'react';
import {
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { ChakraProvider, Flex } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Signup from './pages/Signup';

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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Router>
          <Flex
            flexDirection='column'
            width='100wh'
            height='100vh'
          >
            <Navbar />
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route exact path='/profile'>
                <Profile />
              </Route>
              <Route exact path='/favorites'>
                <Favorites />
              </Route>
              <Route exact path='/search'>
                <Search />
              </Route>
              <Route exact path='/login'>
                <Login />
              </Route>
              <Route exact path='/signup'>
                <Signup />
              </Route>
            </Switch>
          </Flex>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;