import { ApolloLink } from "apollo-link";
import Home from '../pages/Home';
// import Profile from './pages/Profile';
// import Signup from './pages/Signup';
// import Login from './src/components/loginModal';
import Footer from './../src/components/Footer/index';
import Navbar from '../../src/components/Navbar/index';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const yelpAuthLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
    },
  };
});

const myLink = new createHttpLink({
  uri: "/graphql",
});

const yelpLink = new createHttpLink({
  uri: "https://api.yelp.com/v3/businesses/search?location=40515&term&categories=vet&limit=10",
});

const client = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === "yelp-third-party",
    // the string "third-party" can be anything you want,
    // we will use it in a bit
    yelpLink, // <= apollo will send to this if clientName is "third-party"
    myLink // <= otherwise will send to this
  ),
  // other options
});

const coffee = new ApolloClient({
  link: authLink.concat(yelpAuthLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Navbar />
          <div className="container">
            <div>
                { coffee }
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/me" element={<Profile />} /> */}
              {/* <Route path="/profiles/:profileId" element={<Profile />} /> */}
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}
export default App;
