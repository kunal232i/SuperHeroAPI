var SUPERHERO_TOKEN = "785737262585008";
var BASE_URL = "https://superheroapi.com/api.php/".concat(SUPERHERO_TOKEN);
var newHeroButton = document.getElementById("newHeroButton");
var heroImageDiv = document.getElementById("heroImage");
var searchButton = document.getElementById("searchButton");
var searchInput = document.getElementById("searchInput");
var showPopup = function (message) {
    var popup = document.getElementById("popup");
    var popupMessage = document.getElementById("popup-message");
    var closePopupButton = document.getElementById("closePopupButton");
    if (popup && popupMessage && closePopupButton) {
        popupMessage.textContent = message;
        popup.style.display = "flex";
        closePopupButton.onclick = function () {
            popup.style.display = "none";
        };
    }
};
var getSuperHero = function (id) {
    fetch("".concat(BASE_URL, "/").concat(id))
        .then(function (response) { return response.json(); })
        .then(function (json) {
        console.log(json.powerstats);
        var superHero = json;
        showHeroInfo(superHero);
    });
};
var statToEmoji = {
    intelligence: "🧠",
    strength: "💪",
    speed: "⚡",
    durability: "🏋️",
    power: "📊",
    combat: "⚔️",
};
var showHeroInfo = function (character) {
    var name = "<h2>".concat(character.name, "</h2>");
    var img = "<img src=\"".concat(character.image.url, "\" height=200 width=200/>");
    var stats = Object.keys(character.powerstats)
        .map(function (stat) {
        return "<p>".concat(statToEmoji[stat], " ").concat(stat.toUpperCase(), ": ").concat(character.powerstats[stat], "</p>");
    })
        .join("");
    heroImageDiv.innerHTML = "".concat(name).concat(img).concat(stats);
};
var randomHero = function () {
    var numberOfHeroes = 731;
    return Math.floor(Math.random() * numberOfHeroes) + 1;
};
newHeroButton.onclick = function () { return getSuperHero(randomHero()); };
var getSearchSuperHero = function (name) {
    console.log(searchInput.value);
    fetch("".concat(BASE_URL, "/search/").concat(name))
        .then(function (response) { return response.json(); })
        .then(function (json) {
        if (json.response === "error") {
            showPopup("Superhero not found or wrong entry.");
        }
        else {
            var hero = json.results[0];
            showHeroInfo(hero);
        }
    });
};
searchButton.onclick = function () { return getSearchSuperHero(searchInput.value); };
