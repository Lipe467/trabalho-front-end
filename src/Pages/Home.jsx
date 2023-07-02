import "./home.css";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, Button, Container, Heading, Spinner, Stack } from '@chakra-ui/react';
import PokemonCard from '../components/PokemonCard';

const Home = () => {
  const [Loading, setLoading] = useState(false);
  const [pokeData, setPokeData] = useState([]);
  const [page, setPage] = useState("https://pokeapi.co/api/v2/pokemon/");

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(page);
      setPokeData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchUserData();
  }, [page]);

  const renderPokeData = () => {
    if (Loading) {
      return <Spinner size='xl' />;
    } else
      return (
        <>
        {pokeData.results?.map((pokemon) => (
          <Link to={`/${pokemon.name}`}>
             <PokemonCard name={pokemon.name} url={pokemon.url}/>
          </Link>
        ))}
        </>
      );
  };

  return (
    <div style={{background:"#6e87ef",minHeight:"100vh"}} >
      <Container maxW='container.lg'>
        <Heading textAlign={'center'} p={5} textColor={"#f1f1f1"}>Pokedex - Selecione um pokemon </Heading>
        <Box display="flex" alignItems="center" justifyContent="space-evenly" flexWrap={'wrap'} gap={1}>
          {renderPokeData()}
        </Box>
        <Stack spacing={2} direction='row' display="flex" justifyContent="center" p={3}>
          <Button colorScheme='teal' size='sm' onClick={() => setPage(pokeData.previous)}>
            Anterior
          </Button>
          <Button colorScheme='teal' size='sm' onClick={() => setPage(pokeData.next)}>
            Próxima
          </Button>
        </Stack>
      </Container>
    </div>
  );
};

export default Home;
