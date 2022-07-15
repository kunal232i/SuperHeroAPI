//https://superheroapi.com/api/access-token/character-id

const SUPERHERO_TOKEN = "785737262585008";
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`;
const newHeroButton = document.getElementById("newHeroButton");
const heroImageDiv = document.getElementById("heroImage");
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");

let getSuperHero = (id, name) => {
  fetch(`${BASE_URL}/${id}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      heroImageDiv.innerHTML = `<img src="${json.image.url}" height=200 width=200/>`;
    });
};

const randomHero = () => {
  const numberOfHeroes = 731;
  return Math.floor(Math.random() * numberOfHeroes) + 1;
};

newHeroButton.onclick = () => getSuperHero(randomHero());

const getSearchSuperHero = (name) => {
  console.log(searchInput.value);
  fetch(`${BASE_URL}/search/${name}`)
    .then((response) => response.json())
    .then((json) => {
      const hero = json.results[0];
      console.log(hero);
      heroImageDiv.innerHTML = `<img src="${hero.image.url}"height=200 width=200/>`;
    });
};

searchButton.onclick = () => getSearchSuperHero(searchInput.value);
