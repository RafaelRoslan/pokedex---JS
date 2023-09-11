const pokeApi ={};

function convertDetail(pokeDetails){
    const pokemon  = new Pokemon();
    pokemon.number = pokeDetails.id.toString().padStart(3, '0');
    pokemon.name   = pokeDetails.name;
    
    const types = pokeDetails.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    
    for (let i = 0; i < Object.keys(pokemon.allstats).length; i++) {
        Object.keys(pokemon.allstats)[i] = pokeDetails.stats[i].base_stat;
        
    }
    
    pokemon.img = pokeDetails.sprites.other['official-artwork'].front_default;

    return pokemon;

}

pokeApi.getPokemonDetails = (pokemon)=>{
    return fetch(pokemon.url)
                .then((response) => response.json())
                .then(convertDetail);
}

pokeApi.getPokemons = (offset = 0, limit = 10)=>{
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
   .then((response) => response.json())
   .then((jsonBody) => jsonBody.results)
   .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
   .then((detailRequests) => Promise.all(detailRequests))
   .then((pokemonDetails)=> pokemonDetails)
   .catch((error)   => console.log(error));
}