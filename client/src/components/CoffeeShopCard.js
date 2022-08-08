import {
  Flex,
  Spacer,
  Box,
  Image,
  Heading,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import FavoritesButton from './FavoritesButton';
import { useMutation } from '@apollo/client';
import { FAVORITE } from '../utils/mutations';

export default function CoffeeShopCard({ coffeeShopData, type }) {
  const toggleTextColor = useColorModeValue('gray.600', 'gray.400');
  const [favorite, { error }] = useMutation(FAVORITE);
  const { id, rating, review_count, location, name, url, image_url } = coffeeShopData;

  const handleFavorite = async (id) => {
    if (!error) {
      try {
        await favorite({
          variables: {
            id,
            rating,
            review_count,
            name,
            url,
            image_url
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <Flex
      w={{ base: '95vw', md: '65vw', lg: '30vw' }}
      h={{ base: '125px', md: '175px' }}
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      marginBottom='12px'
    >
      <Image
        src={image_url}
        alt={name}
        objectFit='cover'
        minW={{ base: '125px', md: '175px' }}
        maxW={{ base: '125px', md: '175px' }}
        h='auto'
      />
      <Box p={{ base: 1, md: 4 }}>
        <Link href={url} isExternal>
          <Heading size={{ base: 'sm', md: 'md' }} noOfLines={2}>
            {name}
          </Heading>
        </Link>
        <Text>
          {location.display_address.join(' ')}
        </Text>
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
            {review_count}&nbsp;{review_count > 0 ? 'reviews' : 'review'}
          </Box>
        </Box>
      </Box>
      <Spacer />
      <FavoritesButton type={'add'} onClick={() => handleFavorite(id)} />
    </Flex>
  );
}