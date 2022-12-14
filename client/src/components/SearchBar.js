import { useRef } from 'react';
import {
  Button,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';

export default function SearchBar({ handleSearch }) {
  const inputRef = useRef();
  return (
    <InputGroup
    width={{ base: "75%", md: "50%" }}
    margin="1rem auto"
    >
      <Input ref={inputRef} placeholder="Enter a city or zip code" /> 
      <InputRightElement width="min-content">
        <Button
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          bg={"green.400"}
          href={"#"}
          _hover={{ bg: "green.300", }}
          onClick={(e) => {
            e.preventDefault();
            handleSearch(inputRef.current.value)
          }}>
          Search
        </Button>
      </InputRightElement>
    </InputGroup>
  )
  
}
