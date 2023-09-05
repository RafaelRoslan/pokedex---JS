
function convertToHTML(pokemon) {
    return `<li class="pokemon">
                <div class="nameRegister">
                    <span class="name">${pokemon.name}</span>
                    <span class="number">${pokemon.number}</span>
                </div>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type)=> `<li class="type">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.img}" alt="${pokemon.name}">
                </div>
            </li>`;
}

const listPokemon = document.getElementById('pokemonList');

pokeApi.getPokemons().then((pokeArr = [])  => {
    
    listPokemon.innerHTML += pokeArr.map(convertToHTML).join('');
    
});
   
