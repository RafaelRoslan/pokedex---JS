const pokeApi ={};

function convertDetail(pokeDetails){
    const pokemon  = new Pokemon();
    pokemon.number = pokeDetails.id.toString().padStart(3, '0');
    pokemon.name   = pokeDetails.name;
    
    const types = pokeDetails.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.allstats.hp     = pokeDetails.stats[0].base_stat;
    pokemon.allstats.atk    = pokeDetails.stats[1].base_stat;
    pokemon.allstats.def    = pokeDetails.stats[2].base_stat;
    pokemon.allstats.spAtk  = pokeDetails.stats[3].base_stat;
    pokemon.allstats.spDef  = pokeDetails.stats[4].base_stat;
    pokemon.allstats.spd    = pokeDetails.stats[5].base_stat;
    
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