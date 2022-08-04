import Navbar from './Navbar';
import { Flex } from '@chakra-ui/react';

export default function Layout({ children }) {
  return (
    <Flex
      flexDirection='column'
      width='100wh'
      height='100vh'
    >
      <Navbar />
      <main>{children}</main>
    </Flex>
  )
}