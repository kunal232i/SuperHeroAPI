const SUPERHERO_TOKEN = "785737262585008";
const BASE_URL: string = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`;
const newHeroButton = document.getElementById("newHeroButton") as HTMLButtonElement;
const heroImageDiv = document.getElementById("heroImage") as HTMLElement;
const searchButton = document.getElementById("searchButton") as HTMLButtonElement;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;

interface PowerStats {
  [key: string]: string;
}

interface SuperHero {
  name: string;
  image: {
    url: string;
  };
  powerstats: PowerStats;
}

const showPopup = (message: string): void => {
  const popup = document.getElementById("popup") as HTMLElement;
  const popupMessage = document.getElementById("popup-message") as HTMLElement;
  const closePopupButton = document.getElementById("closePopupButton") as HTMLButtonElement;

  if (popup && popupMessage && closePopupButton) {
    popupMessage.textContent = message;
    popup.style.display = "flex";

    closePopupButton.onclick = () => {
      popup.style.display = "none";
    };
  }
};

const getSuperHero = (id: number) => {
  fetch(`${BASE_URL}/${id}`)
    .then((response) => response.json())
    .then((json: SuperHero) => {
      console.log(json.powerstats);
      const superHero = json;
      showHeroInfo(superHero);
    });
};

const statToEmoji: Record<string, string> = {
  intelligence: "🧠",
  strength: "💪",
  speed: "⚡",
  durability: "🏋️",
  power: "📊",
  combat: "⚔️",
};

const showHeroInfo = (character: SuperHero): void => {
  const name = `<h2>${character.name}</h2>`;
  const img = `<img src="${character.image.url}" height=200 width=200/>`;

  const stats = Object.keys(character.powerstats)
    .map((stat) => {
      return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: ${character.powerstats[stat]}</p>`;
    })
    .join("");

  heroImageDiv.innerHTML = `${name}${img}${stats}`;
};

const randomHero = (): number => {
  const numberOfHeroes = 731;
  return Math.floor(Math.random() * numberOfHeroes) + 1;
};

newHeroButton.onclick = () => getSuperHero(randomHero());


const getSearchSuperHero = (name: string): void => {
  console.log(searchInput.value);
  fetch(`${BASE_URL}/search/${name}`)
    .then((response) => response.json())
    .then((json) => {
      if (json.response === "error") {
        showPopup("Superhero not found or wrong entry.");
      } else {
        const hero: SuperHero = json.results[0];
        showHeroInfo(hero);
      }
    });
};

searchButton.onclick = () => getSearchSuperHero(searchInput.value);
