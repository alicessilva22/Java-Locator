import {
  Button,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';

export default function SearchBar({ onSubmit }) {
  return (
    <InputGroup
      width={{ base: "75%", md: "50%" }}
      margin="auto"
    >
      <Input placeholder="Enter a city or zip code" />
      <InputRightElement width="min-content">
        <Button
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          bg={"green.400"}
          href={"#"}
          _hover={{ bg: "green.300", }}
          onClick={onSubmit}>
          Search
        </Button>
      </InputRightElement>
    </InputGroup>
  )
  
}