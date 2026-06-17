import "./style.css";
import { animate } from "motion";
import { getPokemon } from "./api.js";
import { renderPokemon, showError, setLoading } from "./view.js";

// animate(
//   document.querySelector(".spinner"),
//   { rotate: [0, 360] },
//   { duration: 1, repeat: Infinity, ease: "linear" },
// );

animate(
  ".spinner",
  {
    rotate: [0, 360],
  },
  {
    duration: 1,
    repeat: Infinity,
    ease: "linear",
  },
);

let controller;

const load = async (name) => {
  if (controller) controller.abort();
  controller = new AbortController();

  setLoading(true);

  try {
    const data = await getPokemon(name, controller.signal);
    renderPokemon(data);
  } catch (err) {
    if (err.name === "AbortError") return;
    console.error(err);
    showError("見つかりませんでした");
  } finally {
    setLoading(false);
  }
};

document.querySelector("#searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  load(document.querySelector("#keyword").value.trim().toLowerCase());
});

// const card = document.querySelector(".card");
// const form = document.querySelector("#searchForm");
// const keyword = document.querySelector("#keyword");
// const errorEl = document.querySelector(".error");

// const loader = document.querySelector(".loader");
// const spinner = document.querySelector(".spinner");

// animate(
//   spinner,
//   { rotate: [0, 360] },
//   { duration: 1, repeat: Infinity, ease: "linear" },
// );

// let controller;

// //関数load(アロー関数)
// const load = async (name) => {
//   //連打対策
//   if (controller) controller.abort();
//   controller = new AbortController();

//   errorEl.hidden = true;
//   card.hidden = true;
//   loader.hidden = false;
//   try {
//     const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
//     const data = await res.json();

//     card.innerHTML = `
//     <h2>${data.name}</h2>
//     <img src="${data.sprites.front_default}" alt="${data.name}">
//   `;
//     card.hidden = false;
//   } catch (err) {
//     console.error(err);
//     errorEl.textContent = "見つかりませんでした";
//     errorEl.hidden = false;
//     card.hidden = true;
//   } finally {
//     loader.hidden = true;
//   }
// };

// //formの処理
// form.addEventListener("submit", (e) => {
//   //form(submitが必ず送信)やa(必ずリンク先に飛びます)などの初期動作を無効化する
//   e.preventDefault();
//   load(keyword.value.trim().toLowerCase());
// });

// load();

//スピナーを読み込む
// const spinner = document.querySelector(".spinner");

// animate(
//   spinner,
//   { rotate: [0, 360] },
//   { duration: 1, repeat: Infinity, ease: "linear" },
// );

// //アロー関数の非同期通信 pokeapiの取得
// const getPokemon = async (name) => {
//   try {
//     const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

//     if (!res.ok) {
//       throw new Error(`HTTPエラー: ${res.status}`);
//     }

//     const data = await res.json();
//     return data;
//   } catch (err) {
//     console.error("取得に失敗しました", err);
//     throw err; // 呼び出し側にも知らせる
//   }
// };

// //戻り値を受けて処理
// console.log(getPokemon("pikachu"));

// //APIを取得して表示する処理
// const card = document.querySelector(".card");
// const loader = document.querySelector(".loader");
// const errorEl = document.querySelector(".error");

// //アロー関数引数name
// const load = async (name) => {
//   loader.hidden = false;
//   errorEl.hidden = true;
//   card.hidden = true;

//   try {
//     //getPokemon関数(戻り値でポケモンのデータを返す)の実行
//     const data = await getPokemon(name);
//     //dateの中に呼び出したポケモンのデータが収納される
//     card.innerHTML = `
//       <h2>${data.name}</h2>
//       <img src="${data.sprites.front_default}" alt="${data.name}">
//     `;
//     card.hidden = false;
//   } catch (err) {
//     errorEl.textContent = "読み込みに失敗しました";
//     errorEl.hidden = false;
//   } finally {
//     loader.hidden = true;
//   }
// };

// //関数の実行
// load("bulbasaur");

// //キャンセル処理

// const controller = new AbortController();

// fetch("https://pokeapi.co/api/v2/pokemon/pikachu", {
//   signal: controller.signal,
// })
//   .then((res) => res.json())
//   .then(console.log)
//   .catch((err) => {
//     if (err.name === "AbortError") {
//       console.log("キャンセルされました");
//     } else {
//       console.error(err);
//     }
//   });

// // どこかでキャンセルを実行
// controller.abort();
