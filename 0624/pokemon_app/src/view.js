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

export const renderPokemon = (data, jpName, description) => {
  const displayName = jpName ?? data.name;
  const types = data.types.map((t) => typeJa[t.type.name]).join(" / ");
  const images = [
    data.sprites.front_default,
    data.sprites.back_default,
    data.sprites.front_shiny,
    data.sprites.back_shiny,
    data.sprites.versions["generation-v"]?.["black-white"]?.animated
      ?.front_default,
  ].filter(Boolean);
  card.innerHTML = `
    <h2>${displayName} <small>(${data.name})</small></h2>
    <p>タイプ : ${types}</p>
    <p>身長 : ${data.height / 10}m</p>
    <p>体重 : ${data.weight / 10}kg</p>
    <p class="description">
    図鑑説明 :
      ${description ?? "説明がありません"}
    </p>
    <img id="pokemonImage" src="${data.sprites.front_default}" alt="${data.name}">
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
  const img = document.querySelector("#pokemonImage");

  let currentImage = 0;

  img?.addEventListener("click", () => {
    currentImage = (currentImage + 1) % images.length;
    img.src = images[currentImage];
    animate(
      img,
      {
        scale: [0.9, 1.1, 1],
        opacity: [0.5, 1],
      },
      {
        duration: 0.3,
      },
    );
  });
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

// ⬇ 既存の renderPokemon を「日本語名併記」対応に書き換え
// 関数式+アロー関数 関数の定義 exportされている
// export const renderPokemon = (data, jpName) => {
//   const displayName = jpName ?? data.name;
//   card.innerHTML = `
//     <h2>${displayName} <small>(${data.name})</small></h2>
//     <img src="${data.sprites.front_default}" alt="${displayName}">
//   `;
//   card.hidden = false;
//   errorEl.hidden = true;
// };
