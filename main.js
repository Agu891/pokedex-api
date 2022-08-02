const API_URL = "https://pokeapi.co/api/v2/pokemon/";
const input = document.querySelector("#input");
const pokedexImg = document.querySelector("#pokedexImg");
const stats = document.querySelector("#stats");
const innerLight = document.querySelector(".searching");

function lightLoading() {
  innerLight.setAttribute("id", "innerLight");
  setTimeout(() => {
    innerLight.removeAttribute("id", "innerLight");
  }, 1500);
}

const pokeSearch = async () => {
  let inputValue = input.value;
  let datos = [];

  try {
    lightLoading();
    let response = await fetch(`${API_URL}${inputValue}`);
    let pokemon = await response.json();
    datos = pokemon;

    pokedexImg.setAttribute("src", `${datos.sprites.front_default}`);

    stats.innerHTML = `<h2>${datos.name.toUpperCase()}</h2>  
                <h3> BASE STATS:</h3>
  `;
    for (let i = 0; i < datos.stats.length; i++) {
      stats.innerHTML += `<p>${datos.stats[i].stat.name.toUpperCase()}  : ${
        datos.stats[i].base_stat
      }</p>  `;
    }
    stats.innerHTML += `<h3>HABILIDADES:</h3>`;
    for (let j = 0; j < datos.abilities.length; j++) {
      stats.innerHTML += `<p> Hablilidad ${[j + 1]}: ${
        datos.abilities[j].ability.name
      }</p>`;
    }
  } catch (error) {
    alert("El pokemon que  buscas no  existe");
  }
};
