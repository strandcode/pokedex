let allPokemons = [];

// NOTE Gets the pokemon data with the ids 1 - 20
async function loadPokemon() {
  let currentPokemon;
  for (let a = 1; a < 4; a++) {
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



function templatePokemonCard(i) {
  return /*html*/ `
     <div id="pokemonCard-${i}" class="pokemon-card-wrapper" onclick="openPokemonPortrait(${i})">
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


function closePokemonPortrait() {
  let pokemonPortrait = document.getElementById('pokemonPortrait');
  pokemonPortrait.classList.add('d-none');
}


function openPokemonPortrait(i) {
  let pokemonPortrait = document.getElementById('pokemonPortrait');
  pokemonPortrait.innerHTML = '';
  pokemonPortrait.classList.remove('d-none');
  console.log(i);
  pokemonPortrait.innerHTML += `
  <div class="pokemon-portrait-wrapper">
  <div class="pokemon-portrait-header">
    <div class="header-top">
      <img class="cp" src="img/arrow-left-2-48.png" alt="" onclick="closePokemonPortrait()">
      <img class="cp" src="img/menu-4-48.png" alt="">
    </div>
    <div class="header-info">
      <div class="header-wrapper">
        <h2 id="pokemonName">${upperCaseFirstChar(allPokemons[i].name)}</h2>
        <div class="pokemon-type-wrapper">
          <div id="pokemonTypes-${i}" class="pokemon-type">#Grass</div>
          <div id="pokemonTypes-${i}" class="pokemon-type">#Poison</div>
        </div>
      </div>
      <div id="pokemonId" class="pokemon-id">#${allPokemons[i].id}
      </div>
    </div>
  </div>
  <div class="img-container">
    <img id="spritesFrontDefault" src="${allPokemons[i].sprites.front_default}" alt="Front default">
  </div>
  
  <div id="pokemonPortraitBody" class="pokemon-portrait-body"></div>
</div>
  `;
  renderPokemonPortraitBody(i);
}

function renderPokemonPortraitBody(i) {
  let pokemonPortraitBody = document.getElementById('pokemonPortraitBody');
  pokemonPortraitBody.innerHTML = '';
  pokemonPortraitBody.innerHTML += `
    <div class="portrait-menu">
      <span class="active">About</span>
      <span>Base Stats</span>
      <span>Evolution</span>
      <span>Moves</span>
    </div>
    <hr>
  `;
  pokemonPortraitBody.innerHTML += templateTablePortraitAbout(i);
  renderAboutAbilities(i);
}

function templateTablePortraitAbout(i) {
  return /*html*/ `
      <table id="tablePortraitAbout">
      <tbody>
        <tr>
          <td>Species:</td>
          <td class="no-data">Seed</td>
        </tr>
        <tr>
          <td>Height:</td>
          <td class="no-data">0.70cm</td>
        </tr>
        <tr>
          <td>Weight</td>
          <td class="no-data">6,9kg</td>
        </tr>
        <tr>
          <td>Abilities</td>
          <td id="aboutAbilities">Overgrow, Chlorophyl</td>
        </tr>
        <tr>
          <th colspan="2">Breeding</th>
        </tr>
        <tr>
          <td>Gender:</td>
          <td class="no-data">87,5% female, 12,5% male</td>
        </tr>
        <tr>
          <td>Egg Groups:</td>
          <td class="no-data">Monster</td>
        </tr>
        <tr>
          <td>Egg Cycle:</td>
          <td class="no-data">Grass</td>
        </tr>

      </tbody>
    </table>
  `;

}

function renderAboutAbilities(i) {
  console.log('Hallo: ' + i);
  let aboutAbilities = document.getElementById('aboutAbilities');
  aboutAbilities.innerHTML = '';
  for (let x = 0; x < allPokemons[i].abilities.length; x++) {
    aboutAbilities.innerHTML += `
      <span>${upperCaseFirstChar(allPokemons[i].abilities[x].ability.name)}</span>
    `;
  }
}