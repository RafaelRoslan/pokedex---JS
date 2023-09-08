const listPokemon    = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const limit  = 20;

const maxRecord = 151;
let   offset = 0;


function convertToHTML(pokemon) {
    return `<li class="pokemon ${pokemon.type}">
                <div class="nameRegister">
                    <span class="name">${pokemon.name}</span>
                    <span class="number">#${pokemon.number}</span>
                </div>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type)=> `<li class="type">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.img}" alt="${pokemon.name}">
                </div>
            </li>`;
}

function loadMorePokemons(offset, limit) {
    pokeApi.getPokemons(offset,limit).then((pokeArr = [])  => {
    
        listPokemon.innerHTML += pokeArr.map(convertToHTML).join('');
        
    });
}

loadMorePokemons(offset,limit);

loadMoreButton.addEventListener('click',()=>{
    offset += limit;
    const qtdRecord = offset + limit;

    if(qtdRecord >= maxRecord){
        const newLimit = maxRecord - offset;
        loadMorePokemons(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
        return
    }
    loadMorePokemons(offset, limit);
})
