import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Link,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons';
import { Link as RouteLink } from "react-router-dom";
import LogoSVG from '../assets/logoSVG.js';
import Auth from '../utils/auth';

const logout = (event) => {
  event.preventDefault();
  Auth.logout();
};

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <LogoSVG height={24} />
          <Text ml={2}
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            fontWeight={500}
            color={useColorModeValue('gray.800', 'white')}>
            JavaLocator
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          {Auth.loggedIn ?
            <>
              <RouteLink to='/login'>
                <Button
                  display={{ base: 'none', md: 'inline-flex' }}
                  as={Link}
                  bg='none'
                  fontSize={'sm'}
                  fontWeight={400}>
                  Sign In
                </Button>
              </RouteLink>
              <RouteLink to='/signup'>
                <Button
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'green.400'}
                  _hover={{ bg: 'green.300', }}>
                  Sign Up
                </Button>
              </RouteLink>
            </> :
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              bg='none'
              fontSize={'sm'}
              fontWeight={400}
              onClick={logout}>
              Sign Out
            </Button>}
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <RouteLink to={navItem.route}>
            <Link
              p={2}
              fontSize={'sm'}
              fontWeight={500}
              color={linkColor}
              _hover={{
                textDecoration: 'none',
                color: linkHoverColor,
              }}>
              {navItem.label}
            </Link>
          </RouteLink>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('gray.50', 'gray.700')}
      px={5}
      py={3}
      color={useColorModeValue('gray.600', 'gray.200')}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      {Auth.loggedIn ?
        MOBILE_NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        )) :
        <Stack spacing={4}>
          <Flex
            py={1}
            as={Button}
            justify={'space-between'}
            align={'center'}
            onClick={logout}
            _hover={{
              textDecoration: 'none',
            }}>
            <Text
              fontWeight={600}>
              Sign&nbsp;Out
            </Text>
          </Flex>
        </Stack>
      }
    </Stack>
  );
};

const MobileNavItem = ({ label, route }) => {
  return (
    <Stack spacing={3}>
      <Flex
        py={1}
        as={Link}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <RouteLink to={route}>
          <Text
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}>
            {label}
          </Text>
        </RouteLink>
      </Flex>
    </Stack>
  );
};



let NAV_ITEMS = [
  {
    label: 'Home',
    route: '/'
  },
];

if (Auth.loggedIn()) {
  NAV_ITEMS = NAV_ITEMS.concat({
    label: 'Favorites',
    route: 'favorites'
  });
}

const MOBILE_NAV_ITEMS = [
  {
    label: 'Sign In',
    route: '/login'
  },
  {
    label: 'Sign Up',
    route: 'signup'
  },
]
