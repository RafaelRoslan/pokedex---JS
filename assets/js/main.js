const listPokemon    = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const loadPokeInfo   = document.getElementById('close-popup');
const popupPokeInfo  = document.getElementById('popInfo');
const limit  = 20;

const maxRecord = 151;
let   offset = 0;


function convertToHTML(pokemon) {
    const li = document.createElement('li');
    li.classList.add('pokemon',pokemon.type);
    li.innerHTML = `<div class="nameRegister">
                        <span class="name">${pokemon.name}</span>
                        <span class="number">#${pokemon.number}</span>
                    </div>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type)=> `<li class="type">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.img}" alt="${pokemon.name}">
                    </div>`
    li.addEventListener('click',()=>{
        popupPokeInfo.style.display = 'block';
    })
    return li
    
}

function loadMorePokemons(offset, limit) {
    pokeApi.getPokemons(offset,limit).then((pokeArr = [])  => {
        const tempItem = document.createDocumentFragment();

        pokeArr.map((pokemon)=>{
            tempItem.appendChild(convertToHTML(pokemon))
        })
         
        listPokemon.appendChild(tempItem)
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
});

loadPokeInfo.addEventListener('click',()=>{
    popupPokeInfo.style.display = 'none';
});



