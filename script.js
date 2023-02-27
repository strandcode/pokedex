let pokedexGallery = document.getElementById('pokedexGallery');
let allPokemons = [];

// TODO store allPokemons to localeStorage for better performance

let pokemonTypeColors = {
  "normal": "#A8A878",
  "fighting": "#C03028",
  "flying": "#A890F0",
  "poison": "#A040A0",
  "ground": "#E0C068",
  "rock": "#B8A038",
  "bug": "#A8B820",
  "ghost": "#705898",
  "steel": "#B8B8D0",
  "fire": "#F08030",
  "water": "#6890F0",
  "grass": "#78C850",
  "electric": "#F8D030",
  "psychic": "#F85888",
  "ice": "#98D8D8",
  "dragon": "#7038F8",
  "dark": "#705848",
  "fairy": "#EE99AC"
}

// NOTE gelernt
let totalQuantityOfPokemons;
let apiIndexStart = 1;
let apiIndexEnd = 26;

async function loadPokemon() {
  getTotalQuantityOfPokemons();
  let currentPokemon;
  if (apiIndexEnd > totalQuantityOfPokemons) {
    apiIndexEnd = totalQuantityOfPokemons + 1;
  }
  for (apiIndexStart; apiIndexStart < apiIndexEnd; apiIndexStart++) {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + apiIndexStart;
    let response = await fetch(url);
    currentPokemon = await response.json();
    allPokemons.push(currentPokemon);
  }
  apiIndexEnd += 25;
  renderPokedexGallery();
}

async function getTotalQuantityOfPokemons() {
  await fetch('https://pokeapi.co/api/v2/pokemon/')
    .then(response => response.json())
    .then(data => {
      totalQuantityOfPokemons = data.count;
    })
    .catch(error => console.error(error));
}


function renderPokedexGallery() {
  let pokemonQuantity = document.getElementById('pokemonQuantity');

  pokemonQuantity.innerHTML = `
  You have <b>${allPokemons.length}</b> of <b>${totalQuantityOfPokemons}</b> Pokémons in your Pokédex.
  `;
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
    if (allPokemons[i].types[0].type.name in pokemonTypeColors) {
      let pokemonCard = document.getElementById('pokemonCard-' + i);
      pokemonCard.style.backgroundColor = pokemonTypeColors[allPokemons[i].types[0].type.name];
    }
  }
}

function renderPokemonPortraitTypes(i) {
  let pokemonTypes = document.getElementById('pokemonPortraitTypes-' + i);
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
  pokedexGallery.classList.remove('d-none');
  document.getElementById('navbar').classList.remove('d-none');
}


let activePortraitBodyMenu = 0;

function openPokemonPortrait(i) {
  if (i < 0) { i = allPokemons.length - 1; }
  if (i >= allPokemons.length) { i = 0; }
  activePortraitBodyMenu = 0
  pokedexGallery.classList.add('d-none');

  let pokemonPortrait = document.getElementById('pokemonPortrait');
  pokemonPortrait.innerHTML = '';
  pokemonPortrait.classList.remove('d-none');

  document.getElementById('navbar').classList.add('d-none');

  pokemonPortrait.innerHTML += /*html*/ `
  <div id="pokemonPortraitWrapper" class="pokemon-portrait-wrapper">
  <div class="pokemon-portrait-header">
    <div class="header-top">
      <div>
        <span class="cp material-symbols-sharp" onclick="openPokemonPortrait(${i - 1})">arrow_back</span>
        <span class="cp material-symbols-sharp" onclick="openPokemonPortrait(${i + 1})">arrow_forward</span>
      </div>
      <span class="cp material-symbols-sharp" onclick="closePokemonPortrait()">close</span>
      
    </div>
    <div class="header-info">
      <div class="header-wrapper">
        <h2 id="pokemonName">${upperCaseFirstChar(allPokemons[i].name)}
        <span class="cp material-symbols-sharp" onclick="likePokemonPortrait(${i})" id="pokemonPortraitLike-${i}">favorite</span>
      </h2>
        <div id="pokemonPortraitTypes-${i}" class="pokemon-portrait-type-wrapper">
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
  renderPokemonPortraitTypes(i);
  renderPokemonPortraitBody(i);
  if (allPokemons[i].types[0].type.name in pokemonTypeColors) {
    let pokemonPortraitWrapper = document.getElementById('pokemonPortraitWrapper');
    pokemonPortraitWrapper.style.backgroundColor = pokemonTypeColors[allPokemons[i].types[0].type.name];
  }
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
      <span id="PortraitBodyMenu-0" class="cp" onclick="changePortraitBodyMenu(0, ${i})">About</span>
      <span id="PortraitBodyMenu-1" class="cp" onclick="changePortraitBodyMenu(1, ${i})">Base Stats</span>
      <span id="PortraitBodyMenu-2" class="cp" onclick="changePortraitBodyMenu(2, ${i})">Evolution</span>
      <span id="PortraitBodyMenu-3" class="cp" onclick="changePortraitBodyMenu(3, ${i})">Moves</span>
    </div>
    <hr>
  `;

  if (activePortraitBodyMenu == 0) {
    document.getElementById('PortraitBodyMenu-0').classList.add('active');
    pokemonPortraitBody.innerHTML += templateTablePortraitAbout(i);
    renderAboutAbilities(i);
  }

  if (activePortraitBodyMenu == 1) {
    document.getElementById('PortraitBodyMenu-1').classList.add('active');
    pokemonPortraitBody.innerHTML += templateTablePortraitBaseStats(i);
  }

  if (activePortraitBodyMenu == 3) {
    document.getElementById('PortraitBodyMenu-3').classList.add('active');
    pokemonPortraitBody.innerHTML += templatePortraitMoves(i);
    renderPortraitMoves(i);
  }
}

function renderBaseStatsCharts() {
  return /*html*/ `
  <div class="chart-base">
    <div class="chart-value"></div>
  </div>
  `;
}

// TODO das kann alles innerhalb einer Schleife gerendert werden!!

function templateTablePortraitBaseStats(i) {
  let totalStrength = 0;
  for (let s = 0; s < allPokemons[i].stats.length; s++) {
    totalStrength += allPokemons[i].stats[s].base_stat;
  }
  return /*html*/ `
  <table class="table-base-stats">
    <tr>
      <td>Hitpoints</td>
      <td>${allPokemons[i].stats[0].base_stat}</td>
      <td>
      <div class="chart-base">
        <div class="chart-value" style="width:${(100 * (allPokemons[i].stats[0].base_stat / 140))}%">
        </div>
      </div>


      </td>
    </tr>
    <tr>
      <td>Attack</td>
      <td>${allPokemons[i].stats[1].base_stat}</td>
      <td>
      <div class="chart-base">
        <div class="chart-value" style="width:${(100 * (allPokemons[i].stats[1].base_stat / 135))}%">
        </div>
      </div>

      </td>
    </tr>
    <tr>
      <td>Defense</td>
      <td>${allPokemons[i].stats[2].base_stat}</td>
      <td>
      <div class="chart-base">
        <div class="chart-value" style="width:${(100 * (allPokemons[i].stats[2].base_stat / 130))}%">
        </div>
      </div>

      </td>
    </tr>
    <tr>
      <td>Special Attack</td>
      <td>${allPokemons[i].stats[3].base_stat}</td>
      <td>
      <div class="chart-base">
        <div class="chart-value" style="width:${(100 * (allPokemons[i].stats[3].base_stat / 135))}%">
        </div>
      </div>

      </td>
    </tr>
    <tr>
      <td>Special Defense</td>
      <td>${allPokemons[i].stats[4].base_stat}</td>
      <td>

      <div class="chart-base">
        <div class="chart-value" style="width:${(100 * (allPokemons[i].stats[4].base_stat / 105))}%">
        </div>
      </div>
      </td>
    </tr>
    <tr>
      <td>Speed</td>
      <td>${allPokemons[i].stats[5].base_stat}</td>
      <td>

      <div class="chart-base">
        <div class="chart-value" style="width:${(100 * (allPokemons[i].stats[5].base_stat / 120))}%">
        </div>
      </div>
      </td>
    </tr>
    <tr>
      <td>Total Strength</td>
      <td>${totalStrength}</td>
      <td>
      <div class="chart-base">
        <div class="chart-value" style="width:${(100 * (totalStrength / 765))}%">
        </div>
      </div>

      </td>
    </tr>
  </table>
  `;
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
          <td>${allPokemons[i].height * 10}cm</td>
        </tr>
        <tr>
          <td>Weight:</td>
          <td>${allPokemons[i].weight / 10}kg</td>
        </tr>
        <tr>
          <td>Abilities:</td>
          <td id="aboutAbilities"></td>
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
      <span>${upperCaseFirstChar(allPokemons[i].abilities[x].ability.name)},</span>
    `;
  }
}

function likePokemonPortrait(i) {
  let pokemonPortraitLike = document.getElementById('pokemonPortraitLike-' + i);
  pokemonPortraitLike.classList.toggle('fill-icon');
}

// ####################### Search Pokemon ################################

function searchPokemon() {
  pokedexGallery.innerHTML = '';
  let searchTerm = document.getElementById("search").value;
  for (let i = 0; i < allPokemons.length; i++) {
    if (allPokemons[i].name.toLowerCase().includes(searchTerm.toLowerCase())
      || allPokemons[i].types[0].type.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      pokedexGallery.innerHTML += templatePokemonCard(i);
      renderPokemonTypes(i);
    }
  }
}


// TODO Nur teilladen