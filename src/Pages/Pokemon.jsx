import { useEffect, useState } from "react";
import "./pokemon.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Button, Container, Heading, Input, Spinner, Text, Textarea } from "@chakra-ui/react";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState();
  const { pokemonName } = useParams();
  const [title, setTitle] = useState()
  const [body, setBody] = useState()

  useEffect(() => {
    axios(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const renderAbilities = () => {
    return (
      <ul style={{margin:"0 0 10px"}}>
        {pokemon.abilities.map(item => (
          <li style={{color:"#444"}}>
            {item.ability.name}
          </li>
        ))}
      </ul>
    )
  }

  const onChangeTitle = (event) => {
    const InputValue = event.target.value
    setTitle(InputValue)
}

const onChangeBody = (event) => {
    const Inputvalue = event.target.value
    setBody(Inputvalue)
}

const handleClick = async () =>{
    try{
        const postToSubmit = {
            userId: 1,
            name: title,
            body: body
        }
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', postToSubmit)
}catch(error){
    console.error(error)
}
    }

  return (
    <div className="Pokemon" style={{ background: "#6e87ef" }}>
      <Container centerContent gap= '12px'>
        {pokemon ? (
          <>
            <Heading textAlign={"center"} p={5} textColor={"#f1f1f1"} textTransform={"capitalize"}>
              {pokemon.name}
            </Heading>
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              title={pokemon.name}
              style={{ width: "250px" }}
              alt={pokemon.name}
            />
            <Text fontSize='xl' textColor={"#f1f1f1"}>Habilidades:</Text>
            {renderAbilities()}
            <Link to="/">
              <Button>Voltar</Button>
            </Link>
          </>
        ) : (
          <Spinner size='xl' />
        )}

<Input placeholder='Título'  onChange={onChangeTitle} value={title}/>
                 <Textarea placeholder='Digite aqui' onChange={onChangeBody}/>
                <Button onClick={handleClick}>OK</Button>
        
        <audio src="http://soundfxcenter.com/music/television-theme-songs/8d82b5_Pokemon_Theme_Song.mp3" controls />

        
      </Container>
    </div>
  );
};

export default Pokemon;
