import {
  HStack,
  Box,
  Image,
  Heading,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

export default function CoffeeShopCard({ coffeeShopData, cardButton }) {
  const toggleTextColor = useColorModeValue('gray.600', 'gray.400');

  const { rating, review_count, name, location, url, image_url } = coffeeShopData;
  const { city, address1 } = location;

  return (
    <HStack
      maxW='lg'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      paddingRight='12px'
    >
      <Image
        src={image_url}
        alt={name}
        objectFit='cover'
        height={{ base: '125px', md: '175px' }}
        width={{ base: '125px', md: '175px' }}
      />

      <Box p={{base: 1, md: 4}}>
        <Link href={url} isExternal>
          <Heading size={{base: 'md', md: 'lg'}}>
            {name}
          </Heading>
        </Link>

        <Box fontSize={{base: 'sm', md: 'md'}}>
          {address1},&nbsp;
          <Box as='span' color={toggleTextColor}>
            {city}
          </Box>
        </Box>

        <Box display='flex' mt='2' alignItems='center'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < Math.round(rating) ? 'yellow.500' : 'gray.300'}
              />
            ))}
          <Box as='span' ml='2' color={toggleTextColor} fontSize='sm'>
            {review_count}&nbsp;reviews
          </Box>
        </Box>
      </Box>

      {cardButton}
    </HStack>
  );
}