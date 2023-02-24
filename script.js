let allPokemons = [];

let


  // NOTE Gets the pokemon data with the ids 1 - 20
  async function loadPokemon() {
    let currentPokemon;
    for (let a = 1; a < 25; a++) {
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
        <img id="spritesFrontDefault" src="${allPokemons[i].sprites.other.home.front_default}" alt="Front default">
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
  let pokedexGallery = document.getElementById('pokedexGallery');
  pokedexGallery.classList.remove('d-none');
}


let activePortraitBodyMenu = 0;

function openPokemonPortrait(i) {
  activePortraitBodyMenu = 0
  let pokedexGallery = document.getElementById('pokedexGallery');
  pokedexGallery.classList.add('d-none');

  let pokemonPortrait = document.getElementById('pokemonPortrait');
  pokemonPortrait.innerHTML = '';
  pokemonPortrait.classList.remove('d-none');
  console.log(i);
  pokemonPortrait.innerHTML += /*html*/ `
  <div class="pokemon-portrait-wrapper">
  <div class="pokemon-portrait-header">
    <div class="header-top">
      <span class="cp material-symbols-sharp" onclick="closePokemonPortrait()">arrow_back</span>
      <span class="cp material-symbols-sharp" onclick="">favorite</span>
    </div>
    <div class="header-info">
      <div class="header-wrapper">
        <h2 id="pokemonName">${upperCaseFirstChar(allPokemons[i].name)}</h2>
        <div class="pokemon-portrait-type-wrapper">
          <div id="pokemonTypes-${i}" class="pokemon-type">#Grass</div>
          <div id="pokemonTypes-${i}" class="pokemon-type">#Poison</div>
        </div>
      </div>
      <div id="pokemonId" class="pokemon-id">#${allPokemons[i].id}
      </div>
    </div>
  <div class="img-container">
    <img id="spritesFrontDefault" src="${allPokemons[i].sprites.other.home.front_default}" alt="Front default">
  </div>
  </div>
  
  <div id="pokemonPortraitBody" class="pokemon-portrait-body"></div>
</div>
  `;
  renderPokemonPortraitBody(i);
}


function changePortraitBodyMenu(newActiveMenu, i) {
  activePortraitBodyMenu = newActiveMenu;
  renderPokemonPortraitBody(i);
}

function renderPokemonPortraitBody(i) {
  let pokemonPortraitBody = document.getElementById('pokemonPortraitBody');
  pokemonPortraitBody.innerHTML = '';
  pokemonPortraitBody.innerHTML += `
    <div class="portrait-menu">
      <span id="PortraitBodyMenu-0" onclick="changePortraitBodyMenu(0, ${i})">About</span>
      <span id="PortraitBodyMenu-1" onclick="changePortraitBodyMenu(1, ${i})">Base Stats</span>
      <span id="PortraitBodyMenu-2" onclick="changePortraitBodyMenu(2, ${i})">Evolution</span>
      <span id="PortraitBodyMenu-3" onclick="changePortraitBodyMenu(3, ${i})">Moves</span>
    </div>
    <hr>
  `;

  if (activePortraitBodyMenu == 0) {
    document.getElementById('PortraitBodyMenu-0').classList.add('active');
    pokemonPortraitBody.innerHTML += templateTablePortraitAbout(i);
    renderAboutAbilities(i);
  }
  if (activePortraitBodyMenu == 3) {
    document.getElementById('PortraitBodyMenu-3').classList.add('active');
    pokemonPortraitBody.innerHTML += templatePortraitMoves(i);
    renderPortraitMoves(i);
  }
}




function templatePortraitMoves(i) {
  return /*html*/ `
  <div id="portraitMovesWrapper" class="portrait-moves-wrapper"></div>
  `;
}

function renderPortraitMoves(i) {
  let portraitMovesWrapper = document.getElementById('portraitMovesWrapper');
  portraitMovesWrapper.innerHTML = '';
  for (let m = 0; m < allPokemons[i].moves.length; m++) {
    portraitMovesWrapper.innerHTML += /*html*/ `
        <span class="portrait-moves">${upperCaseFirstChar(allPokemons[i].moves[m].move.name)}</span>
    `;
  }
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
          <td>Weight:</td>
          <td class="no-data">6,9kg</td>
        </tr>
        <tr>
          <td>Abilities:</td>
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
  let aboutAbilities = document.getElementById('aboutAbilities');
  aboutAbilities.innerHTML = '';
  for (let x = 0; x < allPokemons[i].abilities.length; x++) {
    aboutAbilities.innerHTML += `
      <span>${upperCaseFirstChar(allPokemons[i].abilities[x].ability.name)}</span>
    `;
  }
}