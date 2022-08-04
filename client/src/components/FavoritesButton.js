import { IconButton } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

export default function FavoritesButton({ type, onClick }) {
  if (type === 'add') {
    return <IconButton
      bg='none'
      aria-label='Add to favorites'
      icon={<AddIcon w={6} h={6} />}
      onClick={onClick ?? ''}
    />
  } else if (type === 'remove') {
    return <IconButton
      bg='none'
      aria-label='Remove from favorites'
      icon={<DeleteIcon w={8} h={8} />}
      onClick={onClick ?? ''}
    />
  } else return;
}