// src/App.jsx
import { useState } from "react";
import PokemonCard from "./components/PokemonCard";

//localstrageの設定
//全部大文字の変数は慣例で定数
const STORAGE_KEY = "pokegacha:registered";

//アロー関数の関数式(関数宣言)
const loadRegistered = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  //三項演算子
  return saved ? JSON.parse(saved) : [];
};

export default function App() {
  const [view, setView] = useState("gacha");

  // useState
  const [pokemon, setPokemon] = useState(null); //nulは何もない
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(loadRegistered);

  const register = () => {
    //もしpokemonの値がなければreturnしちゃうので何もしない
    if (!pokemon) return;
    // 同じポケモンを重複登録しない あったらreturnしちゃうので何もしない
    if (registered.find((p) => p.id === pokemon.id)) return;

    const next = [
      ...registered,
      {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default,
      },
    ];
    setRegistered(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  // AJAX非同期通信
  // 普通のJavaScript
  const drawGacha = async () => {
    setLoading(true);
    try {
      const id = Math.floor(Math.random() * 151) + 1; // 1〜151
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) throw new Error(`HTTPエラー: ${res.status}`);
      const data = await res.json();
      setPokemon(data);
    } catch (err) {
      console.error(err);
      alert("読み込みに失敗しました");
    } finally {
      //set
      setLoading(false);
    }
  };

  //JSX
  return (
    <main className="app-shell">
      <header className="app-header">
        <h1 className="app-title">PokeAPIガチャ</h1>
        <p>ランダムに出会ったポケモンをコレクションします。</p>
      </header>

      <nav className="app-tabs">
        <button
          className={view === "gacha" ? "tab-button active" : "tab-button"}
          onClick={() => setView("gacha")}
        >
          ガチャ
        </button>
        <button
          className={view === "list" ? "tab-button active" : "tab-button"}
          onClick={() => setView("list")}
        >
          登録済み（{registered.length}）
        </button>
      </nav>

      <section className="app-panel">
        {view === "gacha" && (
          <>
            <button
              className="primary-button"
              onClick={drawGacha}
              disabled={loading}
            >
              {loading ? "読み込み中…" : "ガチャを引く"}
            </button>
            {pokemon && (
              <>
                <PokemonCard pokemon={pokemon} />
                <button className="secondary-button" onClick={register}>
                  登録する
                </button>
              </>
            )}
          </>
        )}

        {view === "list" && (
          <>
            <h2>登録済みポケモン</h2>
            <p>登録数：{registered.length}</p>

            {registered.length === 0 ? (
              <div className="empty-state">
                <p>まだ登録がありません。</p>
                <p>ガチャ画面でポケモンを引いて登録してください。</p>
              </div>
            ) : (
              <ul className="registered">
                {registered.map((p) => (
                  <li className="registered-card" key={p.id}>
                    <img src={p.image} alt={p.name} />
                    <span>{p.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>
    </main>
  );
}
