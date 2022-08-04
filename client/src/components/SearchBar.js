import {
  Button,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function SearchBar() {
  const [searchState, setSearchState] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchState(value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const queryString = searchState;
     //TODO: Add yelp query
    const data = '';

    return <Navigate to={{
      pathname: '/search',
      restaurants: data
    }} />
  }

  return (
    <InputGroup width={{ base: "75%", md: "50%" }} margin="auto">
      <Input
        placeholder="Enter a city or zip code" 
        value={searchState}
        onChange={handleChange}
      />
      <InputRightElement width="min-content">
        <Button
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          bg={"green.400"}
          href={"#"}
          _hover={{ bg: "green.300" }}
          onClick={handleSubmit}
        >
          Search
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}