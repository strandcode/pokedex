let pokedexGallery = document.getElementById('pokedexGallery');
let allPokemons = [];
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

let apiIndexStart = 1;
let apiIndexEnd = 26;

async function fetchPokemonsFromApi() {
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
    renderPokedexGallery();
  }
  apiIndexEnd += 25;
}

let totalQuantityOfPokemons;

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
    You have <b>${allPokemons.length}</b> of <b>${totalQuantityOfPokemons}</b>
    Pokémons in your Pokédex.
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
  const words = word.split('-');
  const capitalizedWords = words.map(w => w.charAt(0).toUpperCase() + w.slice(1));
  return capitalizedWords.join('-');
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
  let pokemonPortrait = document.getElementById('pokemonPortrait');
  pokedexGallery.classList.add('d-none');
  pokemonPortrait.innerHTML = '';
  pokemonPortrait.classList.remove('d-none');
  document.getElementById('navbar').classList.add('d-none');
  let like = '';
  if (allPokemons[i].like === true) {
    like = 'fill-icon';
  }
  pokemonPortrait.innerHTML += templatePokemonPortraitHeader(i, like);
  renderPokemonPortraitTypes(i);
  renderPokemonPortraitBody(i);
  if (allPokemons[i].types[0].type.name in pokemonTypeColors) {
    let pokemonPortraitWrapper = document.getElementById('pokemonPortraitWrapper');
    pokemonPortraitWrapper.style.backgroundColor = pokemonTypeColors[allPokemons[i].types[0].type.name];
  }
  isPortraitReady = true;
  nextPokemonViaKeys(i);
}

function templatePokemonPortraitHeader(i, like) {
  return /*html*/ `
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
              <span class="cp material-symbols-sharp fs-2rem ${like}" 
                onclick="likePokemonPortrait(${i})"
                id="pokemonPortraitLike-${i}">favorite</span>
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
}

function changePortraitBodyMenu(newActiveMenu, i) {
  activePortraitBodyMenu = newActiveMenu;
  renderPokemonPortraitBody(i);
}

function renderPokemonPortraitBody(i) {
  let pokemonPortraitBody = document.getElementById('pokemonPortraitBody');
  pokemonPortraitBody.innerHTML = '';
  pokemonPortraitBody.innerHTML += templatePokemonPortraitBodyMenu(i);


  if (activePortraitBodyMenu == 0) {
    document.getElementById('PortraitBodyMenu-0').classList.add('active');
    pokemonPortraitBody.innerHTML += templateTablePortraitAbout(i);
    renderAboutAbilities(i);
  }

  if (activePortraitBodyMenu == 1) {
    document.getElementById('PortraitBodyMenu-1').classList.add('active');
    pokemonPortraitBody.innerHTML += templateTablePortraitBaseStats(i);
    getChartValueWidth();
  }

  if (activePortraitBodyMenu == 3) {
    document.getElementById('PortraitBodyMenu-3').classList.add('active');
    pokemonPortraitBody.innerHTML += templatePortraitMoves(i);
    renderPortraitMoves(i);
  }
}

function templatePokemonPortraitBodyMenu(i) {
  return /*html*/ `
    <div class="portrait-menu">
      <span id="PortraitBodyMenu-0" class="cp" onclick="changePortraitBodyMenu(0, ${i})">About</span>
      <span id="PortraitBodyMenu-1" class="cp" onclick="changePortraitBodyMenu(1, ${i})">Base Stats</span>
      <!--
      <span id="PortraitBodyMenu-2" class="cp" onclick="changePortraitBodyMenu(2, ${i})">Evolution</span>
      -->
      <span id="PortraitBodyMenu-3" class="cp" onclick="changePortraitBodyMenu(3, ${i})">Moves</span>
    </div>
    <hr>
  `;
}

function renderTablePortraitBaseStats(i) {
  const statLabels = ['Hitpoints', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'];
  const statMaxValues = [140, 135, 130, 135, 105, 120, 1200];
  tableRows = '';
  totalStrength = 0;
  for (let s = 0; s < allPokemons[i].stats.length; s++) {
    const statValue = allPokemons[i].stats[s].base_stat;
    const statLabel = statLabels[s];
    const statMaxValue = statMaxValues[s];
    totalStrength += statValue;
    const statRow = templateTablePortraitBaseStatsRows(s, statLabel, statValue, statMaxValue);

    tableRows += statRow;
  }
  return tableRows;
}

function templateTablePortraitBaseStatsRows(s, statLabel, statValue, statMaxValue) {
  return /*html*/ `
    <tr>
      <td>${statLabel}</td>
      <td>${statValue}</td>
      <td>
        <div class="chart-base">
          <div id="chartValue-${s}" class="chart-value" style="width:${(100 * (statValue / statMaxValue))}%">
          </div>
        </div>
      </td>
    </tr>
  `;
}

let totalStrength = 0;
let tableRows = '';

function templateTablePortraitBaseStats(i) {
  renderTablePortraitBaseStats(i);
  return /*html*/ `
    <table class="table-base-stats">
      <tr>
        <th colspan="3">Combat Experience</th>
      </tr>
      ${tableRows}
      <tr>
        <td>Total Strength</td>
        <td>${totalStrength}</td>
        <td>
          <div class="chart-base">
            <div id="chartValue-6" class="chart-value" style="width:${(100 * (totalStrength / 1200))}%">
            </div>
          </div>
        </td>
      </tr>
    </table>
  `;
}

function getChartValueWidth() {
  for (let c = 0; c < 7; c++) {
    let chartValue = document.getElementById('chartValue-' + c).style;
    let chartValueWidth = chartValue.width;
    chartValueWidth = parseInt(chartValueWidth);
    if (chartValueWidth < 25) {
      chartValue.backgroundColor = '#78C850';
    } else if (chartValueWidth < 50) {
      chartValue.backgroundColor = '#F8D030';
    } else if (chartValueWidth < 75) {
      chartValue.backgroundColor = '#F08030';
    } else {
      chartValue.backgroundColor = '#C03028';
    }
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
          <th colspan="2">Body Measurements</th>
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
          <th colspan="2">Abilities & Experience</th>
        </tr>
        <tr>
          <td>Abilities:</td>
          <td id="aboutAbilities"></td>
        </tr>
        <tr>
          <td>Experience:</td>
          <td>${allPokemons[i].base_experience}</td>
        </tr>
      </tbody>
    </table>
  `;
}

function renderAboutAbilities(i) {
  let aboutAbilities = document.getElementById('aboutAbilities');
  aboutAbilities.innerHTML = '';
  for (let x = 0; x < allPokemons[i].abilities.length; x++) {
    let abilityName = upperCaseFirstChar(allPokemons[i].abilities[x].ability.name);
    if (x === allPokemons[i].abilities.length - 1) {
      // letztes Element der abilities-Liste: kein Komma hinzufügen
      aboutAbilities.innerHTML += `<span>${abilityName}</span>`;
    } else {
      aboutAbilities.innerHTML += `<span>${abilityName}, </span>`;
    }
  }
}

function likePokemonPortrait(i) {
  let pokemonPortraitLike = document.getElementById('pokemonPortraitLike-' + i);
  if (allPokemons) {
    pokemonPortraitLike.classList.toggle('fill-icon');
    allPokemons[i].like = allPokemons[i].like === undefined ? true : !allPokemons[i].like;
  }
}

// ####################### Search Pokemon ################################

function searchPokemon() {
  pokedexGallery.innerHTML = '';
  let searchTerm = document.getElementById("search").value.toLowerCase();
  let found = false;
  for (let i = 0; i < allPokemons.length; i++) {
    if (allPokemons[i].name.toLowerCase().includes(searchTerm)
      || allPokemons[i].id.toString().includes(searchTerm)
      || allPokemons[i].types[0].type.name.toLowerCase().includes(searchTerm)
      || allPokemons[i].types[0].type.name.toLowerCase().includes(searchTerm)
      || (typeof allPokemons[i].types[1] !== 'undefined'
        && allPokemons[i].types[1].type.name.toLowerCase().includes(searchTerm))
    ) {
      pokedexGallery.innerHTML += templatePokemonCard(i);
      renderPokemonTypes(i);
      found = true;
    }
  }
  if (!found) {
    if (searchTerm == 'hans') {
      pokedexGallery.innerHTML = 'Nobody would really look for Hans!';
    } else {
      pokedexGallery.innerHTML = 'No matching Pokémon found!';
    }
  }
}

function resetSearchField() {
  document.getElementById("search").value = '';
}


// FIXME Pfeiltasten hängt sich auf
let isPortraitReady = false;

function nextPokemonViaKeys(i) {
  window.addEventListener('keyup', (event) => {
    if (isPortraitReady && (event.code === 'ArrowLeft' || event.code === 'ArrowRight')) {
      if (event.code === 'ArrowLeft') {
        openPokemonPortrait(i - 1);
      }
      if (event.code === 'ArrowRight') {
        openPokemonPortrait(i + 1);
      }
    }
  });


  closeOnClickByside();
}


function closeOnClickByside() {
  const parent = document.querySelector('#pokemonPortrait');
  const child = document.querySelector('#pokemonPortraitWrapper');

  function handleClick(event) {
    console.log(event);
    console.log('Parent clicked!');
    event.stopPropagation();
  }



  parent.addEventListener('click', handleClick);
  child.addEventListener('click', () => console.log('Child clicked!'));


}










