let allPokemons = [];

// NOTE Gets the pokemon data with the ids 1 - 20
async function loadPokemon() {
  let currentPokemon;
  for (let a = 1; a < 100; a++) {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + a;
    let response = await fetch(url);
    currentPokemon = await response.json();
    allPokemons.push(currentPokemon);
  }
  renderPokedexGallery();
}

function renderPokedexGallery() {
  let pokedexGallery = document.getElementById('pokedexGallery');
  pokedexGallery.innerHTML = '';
  for (let i = 0; i < allPokemons.length; i++) {
    pokedexGallery.innerHTML += templatePokemonCard(i);
    renderPokemonTypes(i);
  }
}

function renderPokemonTypes(i) {
  let pokemonTypes = document.getElementById('pokemonTypes-' + i);
  pokemonTypes.innerHTML = '';
  for (let t = 0; t < allPokemons[i].types.length; t++) {
    pokemonTypes.innerHTML += `
      <div class="pokemon-type">${upperCaseFirstChar(allPokemons[i].types[t].type.name)}</div>
    `;
  }
}

// TODO openPokemonCard(${i})

function templatePokemonCard(i) {
  return /*html*/ `
     <div id="pokemonCard-${i}" class="pokemon-card-wrapper" onclick="openPokemonCard(${i})">
      <div class="pokemon-card-header">
        <div id="pokemonId" class="pokemon-id">#${allPokemons[i].id}</div>
        <h2 id="pokemonName">${upperCaseFirstChar(allPokemons[i].name)}</h2>
      </div>
      <div class="pokemon-card-body">
        <div id="pokemonTypes-${i}" class="pokemon-type-wrapper">
        </div>
        <img id="spritesFrontDefault" src="${allPokemons[i].sprites.front_default}" alt="Front default">
      </div>
    </div>
  `;
}


function upperCaseFirstChar(word) {
  const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
  return capitalizedWord;
}