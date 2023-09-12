const body           = document.getElementById('body-main'); 
const listPokemon    = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const closePokeInfo  = document.getElementById('close-popup');
const popupPokeInfo  = document.getElementById('popInfo');
const infoContent    = document.getElementById('area-content');


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
        let statusContent = `<div class="info-content">  
                                <aside class="poke-info ${pokemon.type}">
                                    
                                    <section class="info-pokemon">
                                        <div class="register">
                                            <span class="name">${pokemon.name}</span>
                                            <span class="number">#${pokemon.number}</span>
                                        </div>
                                        <div class="detail">
                                            <ol class="types">
                                                ${pokemon.types.map((type)=> `<li class="type">${type}</li>`).join('')}
                                            </ol>
                                            <div class="imgPokemon">
                                                <img src="${pokemon.img}"alt="${pokemon.name}">
                                            </div>
                                            
                                        </div>
                                        
                                    </section>
                                </aside>
                                <aside class="info-status">
                                    <ul class="nav-status">
                                        <li class="tab-status checked">Stats</li>
                                        <li class="tab-status">Moves</li>
                                    </ul>
                                    <section class="info-content">
                                        <ol class="poke-stats">
                                            <li class="stats-item">
                                                <h4 class="stats-name ${pokemon.type}">Hp</h4>
                                                <p class="stats-number">${pokemon.allstats.hp}</p>
                                            </li>
                                            <li class="stats-item">
                                                <h4 class="stats-name ${pokemon.type}">Atk</h4>
                                                <p class="stats-number">${pokemon.allstats.atk}</p>
                                            </li>
                                            <li class="stats-item">
                                                <h4 class="stats-name ${pokemon.type}">Def</h4>
                                                <p class="stats-number">${pokemon.allstats.def}</p>
                                            </li>
                                            <li class="stats-item">
                                                <h4 class="stats-name ${pokemon.type}">Sp-Atk</h4>
                                                <p class="stats-number">${pokemon.allstats.spAtk}</p>
                                            </li>
                                            <li class="stats-item">
                                                <h4 class="stats-name ${pokemon.type}">Sp-Def</h4>
                                                <p class="stats-number">${pokemon.allstats.spDef}</p>
                                            </li>
                                            <li class="stats-item">
                                                <h4 class="stats-name ${pokemon.type}">Spd</h4>
                                                <p class="stats-number">${pokemon.allstats.spd}</p>
                                            </li>
                                        </ol>
                                        
                                    </section>
                                </aside>
                            </div>`
        
        
        infoContent.innerHTML = statusContent;
        popupPokeInfo.style.display = 'grid';
        body.style.overflowY = 'hidden';
        console.log('foi');

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

closePokeInfo.addEventListener('click',()=>{
    popupPokeInfo.style.display = 'none';
    body.style.overflowY = 'auto';
});



