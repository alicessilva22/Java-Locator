import { IconButton } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

export default function FavoritesButton({ type }) {
  if (type === 'add') {
    return <IconButton
      bg='none'
      aria-label='Add to favorites'
      icon={<AddIcon w={6} h={6} />}
    />
  } else if (type === 'remove') {
    return <IconButton
      bg='none'
      aria-label='Remove from favorites'
      icon={<DeleteIcon w={8} h={8} />}
    />
  } else return;
}