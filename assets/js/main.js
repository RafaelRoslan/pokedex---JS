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
                                <aside class="poke-info grass">
                                    
                                    <section class="info-pokemon">
                                        <div class="register">
                                            <span class="name">Bulbasaur</span>
                                            <span class="number">#001</span>
                                        </div>
                                        <div class="detail">
                                            <ol class="types">
                                                <li class="type">grass</li>
                                                <li class="type">poison</li>
                                            </ol>
                                            <div class="imgPokemon">
                                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"alt="${pokemon.name}">
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
                                                <h4 class="stats-name grass">Hp</h4>
                                                <p class="stats-number">45</p>
                                            </li>
                                            <li class="stats-item">
                                                <h4 class="stats-name grass">Atk</h4>
                                                <p class="stats-number">49</p>
                                            </li>
                                            <li class="stats-item">
                                                <h4 class="stats-name grass">Def</h4>
                                                <p class="stats-number">49</p>
                                            </li>
                                            <li class="stats-item">
                                                <h4 class="stats-name grass">Sp-Atk</h4>
                                                <p class="stats-number">65</p>
                                            </li>
                                            <li class="stats-item">
                                                <h4 class="stats-name grass">Sp-Def</h4>
                                                <p class="stats-number">65</p>
                                            </li>
                                            <li class="stats-item">
                                                <h4 class="stats-name grass">Spd</h4>
                                                <p class="stats-number">45</p>
                                            </li>
                                        </ol>
                                        
                                    </section>
                                </aside>
                            </div>`
        
        infoContent.innerHTML = statusContent;
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

closePokeInfo.addEventListener('click',()=>{
    popupPokeInfo.style.display = 'none';
});



