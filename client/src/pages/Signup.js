import React, { useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  InputRightElement,
  useColorModeValue,
  Text
} from '@chakra-ui/react';
import { FaUserAlt, FaLock, FaEnvelope } from 'react-icons/fa';
import { Link as RouteLink } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const CFAEnvelope = chakra(FaEnvelope);
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formState);
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Flex
      marginTop='20vh'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <Stack
        flexDir='column'
        mb='2'
        justifyContent='center'
        alignItems='center'
      >
        <Avatar />
        <Heading>Welcome</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          {!data ?
            <form
              onSubmit={handleFormSubmit}>
              <Stack
                spacing={4}
                p='1rem'
                boxShadow='md'
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                      <CFaUserAlt color='gray.300' />
                    </InputLeftElement>
                    <Input
                      type='text'
                      name="username"
                      placeholder='Your username'
                      onChange={handleChange}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                      <CFAEnvelope color='gray.300' />
                    </InputLeftElement>
                    <Input
                      type='email'
                      name='email'
      
                      placeholder='Your email'
                      onChange={handleChange}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      color='gray.300'
                    >
                      <CFaLock color='gray.300' />
                    </InputLeftElement>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Password'
                      name='password'
                      onChange={handleChange}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button h='1.75rem' size='sm' onClick={handleShowClick}>
                        {showPassword ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  borderRadius={0}
                  type='submit'
                  variant='solid'
                  colorScheme='green'
                  width='full'
                >
                  Sign Up
                </Button>
              </Stack>
            </form> :
            <Text textAlign='center'>
              Success! You may now head{' '}
              <RouteLink to="/">back to the homepage.</RouteLink>
            </Text>
          }
        </Box>
        {error && <Text color='red.500'>Failed to sign up.</Text>}
      </Stack>
      <Box>
        Already have an account?&nbsp;
        <RouteLink to='/login'>
          <Link color={useColorModeValue('blue.600', 'blue.100')}>
            Log In
          </Link>
        </RouteLink>
      </Box>
    </Flex>
  )
}