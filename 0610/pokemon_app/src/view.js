const card = document.querySelector(".card");
const errorEl = document.querySelector(".error");
const loader = document.querySelector(".loader");
import { animate } from "motion";

const typeJa = {
  normal: "ノーマル",
  fire: "ほのお",
  water: "みず",
  electric: "でんき",
  grass: "くさ",
  ice: "こおり",
  fighting: "かくとう",
  poison: "どく",
  ground: "じめん",
  flying: "ひこう",
  psychic: "エスパー",
  bug: "むし",
  rock: "いわ",
  ghost: "ゴースト",
  dragon: "ドラゴン",
  dark: "あく",
  steel: "はがね",
  fairy: "フェアリー",
};

export const renderPokemon = (data) => {
  const types = data.types.map((t) => typeJa[t.type.name]).join(" / ");
  card.innerHTML = `
    <h2>${data.jpName}</h2>
    <p>タイプ : ${types}</p>
    <p>身長 : ${data.height / 10}m</p>
    <p>体重 : ${data.weight / 10}kg</p>
    <img src="${data.sprites.front_default}" alt="${data.name}">
  `;
  card.hidden = false;
  errorEl.hidden = true;
  animate(
    card,
    {
      opacity: [0, 1],
      y: [30, 0],
      scale: [0.9, 1],
    },
    {
      duration: 0.5,
      easing: "ease-out",
    },
  );
  animate(
    ".card img",

    {
      scale: [0, 1.3, 1],
      opacity: [0, 1],
    },

    {
      duration: 0.7,
    },
  );
};

export const showError = function (message) {
  errorEl.textContent = message;
  errorEl.hidden = false;
  card.hidden = true;
};

export function setLoading(isLoading) {
  loader.hidden = !isLoading;
  if (isLoading) {
    card.hidden = true;
    errorEl.hidden = true;
  }
}
