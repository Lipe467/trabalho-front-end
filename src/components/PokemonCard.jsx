import './PokemonCard.css';
import { Text } from '@chakra-ui/react';

const PokemonCard = ({ name, url }) => {
  
  const id = url.split("/")[6];

  return (
    <div className='PokemonCard'>
      <img 
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} 
        alt={name} 
        className='PokemonCardImg'
      />
      <Text fontSize='md' align={'center'} textTransform={"capitalize"} textColor={"#333"}>
        <strong>{name}</strong>
      </Text>
    </div>
  );
}

export default PokemonCard;