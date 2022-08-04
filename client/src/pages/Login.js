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
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link as RouteLink } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const CFaEnvelope = chakra(FaEnvelope);
const CFaLock = chakra(FaLock);

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

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
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    // clear form values
    setFormState({
      email: '',
      password: '',
    });
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
                      <CFaEnvelope color='gray.300' />
                    </InputLeftElement>
                    <Input
                      type='email'
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
                  Login
                </Button>
              </Stack>
            </form> :
            <Text>
              Success! You may now head{' '}
              <RouteLink to="/">back to the homepage.</RouteLink>
            </Text>
          }
        </Box>
        {error && <Text color='red.500'>Failed to log in.</Text>}
      </Stack>
      <Box>
        Don&apos;t have an account?&nbsp;
        <RouteLink to='/signup'>
          <Link color={useColorModeValue('blue.600', 'blue.100')}>
            Sign Up
          </Link>
        </RouteLink>
      </Box>
    </Flex>
  )
}