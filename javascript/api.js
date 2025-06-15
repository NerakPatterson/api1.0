class Pokemon {  //defines the object and given data from API.
  constructor({ id, name, types, sprites }) {
    this.id = id;
    this.name = name;
    this.types = types.map(t => t.type.name);
    this.sprite = sprites.front_default;
  }

  renderCard() { //creates card displaying pokemon defined pokemon class.
    const card = document.createElement('div');
    card.className = 'pokemon-card';

    card.innerHTML = ` 
      <h2>${this.name} (#${this.id})</h2>
      <img src="${this.sprite}" alt="${this.name}">
      <p>Type${this.types.length > 1 ? 's' : ''}: ${this.types.join(', ')}</p>
    `;

    return card;
  }
}

async function fetchPokemon(query) { //fetches pokemon data by name from the api.
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
    if (!response.ok) throw new Error('Pokémon not found');
    const data = await response.json();
    return new Pokemon(data); //if found
  } catch (error) { //if not found
    alert(error.message);
  }
}

document.addEventListener('DOMContentLoaded', () => { //waits for the page to load.
  const form = document.getElementById('search-form'); //finds the form area.
  const input = document.getElementById('search-input'); //finds the input area.
  const results = document.getElementById('results'); //finds the result area.

  form.addEventListener('submit', async e => { 
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    const pokemon = await fetchPokemon(query); //calls fetch pokemon
    if (pokemon) {
      results.innerHTML = ''; // clear previous
      results.appendChild(pokemon.renderCard());
    }
  });
});
