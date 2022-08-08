import {
  HStack,
  Box,
  Image,
  Heading,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import FavoritesButton from './FavoritesButton';
import { useMutation } from '@apollo/client';
import { FAVORITE } from '../utils/mutations';

export default function CoffeeShopCard({ coffeeShopData, type }) {
  const toggleTextColor = useColorModeValue('gray.600', 'gray.400');
  const [favorite, { error }] = useMutation(FAVORITE);
  const { id, rating, review_count, name, url, image_url } = coffeeShopData;

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
    <HStack
      maxW='lg'
      maxHeight={{ base: '125px', md: '175px' }}
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      paddingRight='12px'
      marginBottom='12px'
    >
      <Image
        src={image_url}
        alt={name}
        objectFit='cover'
        height={{ base: '125px', md: '175px' }}
        width={{ base: '125px', md: '175px' }}
      />
      <Box p={{ base: 1, md: 4 }}>
        <Link href={url} isExternal>
          <Heading size={{ base: 'md', md: 'lg' }} noOfLines={2}>            
          {name}
          </Heading>
        </Link>
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
      <FavoritesButton type={type} onClick={() => handleFavorite(id)}/>
    </HStack>
  );
}