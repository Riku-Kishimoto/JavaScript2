import "./style.css";
import { animate } from "motion";
// 3つのAPIを取得
import { getPokemon, getSpecies, loadJpDict } from "./api.js";
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
    const dict = await loadJpDict();
    // null合体演算子(左辺がnullかundefinedの時だけ右辺を返す)
    const query = dict[name] ?? name.toLowerCase();

    // 2. ★ 2つのAPIを並行取得
    const [pokemon, species] = await Promise.all([
      getPokemon(query, controller.signal),
      getSpecies(query, controller.signal),
    ]);

    const description = species.flavor_text_entries.find(
      (entry) => entry.language.name === "ja",
    )?.flavor_text;

    // 3. species から日本語名を取り出して renderPokemon に渡す
    const jpName = species.names.find((n) => n.language.name === "ja")?.name;
    renderPokemon(pokemon, jpName, description);
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
  // .toLowerCase()を外して日本語を受けるように
  load(document.querySelector("#keyword").value.trim());
});
