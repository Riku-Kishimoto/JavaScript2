//LocalStorage用のキー
const STORAGE_KEY = "vote-2026";

//初期値
const initialCandidates = [
  {
    id: 1,
    votes: 0,
  },
  {
    id: 2,
    votes: 0,
  },
  {
    id: 3,
    votes: 0,
  },
];

// ⬇ 追加：起動時にLocalStorageから読み込む（無ければ初期値）
//アロー関数、関数の定義、
const loadCandidates = () => {
  //LocalStorageから"vote-2026"をキーに持つ値を取得
  const saved = localStorage.getItem(STORAGE_KEY);
  //三項(条件)演算子
  return saved ? JSON.parse(saved) : initialCandidates;
};

// ⬇ 追加：投票後にLocalStorageに保存する
//関数の定義(引数付き)
const saveCandidates = (candidates) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
};

// ⬇ 書き換え：const → let（map()で作り直すため）+ 初期値を loadCandidates から
// 変数(let)に宣言 ←関数の実行した結果(return,戻り値)
let candidates = loadCandidates();

// 票数表示更新
const updateVoteText = () => {
  candidates.forEach((item) => {
    const card = document.querySelector(`[data-id="${item.id}"]`);

    const votesText = card.querySelector(".votes");

    votesText.textContent = `${item.votes}票`;
  });
};

// 得票率を返す
export const getRates = () => {
  const total = candidates.reduce((sum, item) => {
    return sum + item.votes;
  }, 0);

  return candidates.map((item) => {
    return {
      id: item.id,
      rate: total > 0 ? Math.round((item.votes / total) * 100) : 0,
    };
  });
};

// 投票処理
// export const vote = (id) => {
//   const target = candidates.find((item) => {
//     return item.id === id;
//   });

//   if (!target) return;

//   target.votes++;

//   updateVoteText();
// };
export const vote = (id) => {
  const target = candidates.find((item) => item.id === id);

  if (!target) return;

  target.votes++;

  // LocalStorageに保存
  saveCandidates(candidates);

  // 画面更新
  updateVoteText();
};

//投票処理の関数
export const getWinnerId = () => {
  //変数の更新　配列.map((引数)=>{})
  //前についた配列の要素分ループする(今回は3回)cは
  candidates = candidates.map((c) =>
    //cには各回の要素(オブジェクト)
    //三項(条件)演算子
    //...c＝スプレット構文id: 1,votes: 0 に展開
    c.id === id ? { ...c, votes: c.votes + 1 } : c,
  );

  //関数の実行(引数付き)*candidatesは上書きされている
  saveCandidates(candidates);
  //関数の実行
  updateVoteText();
};

// ⬇ 末尾に追加：リセット用にexport
export const resetCandidates = () => {
  localStorage.removeItem(STORAGE_KEY);
  //スプレット構文で展開
  candidates = initialCandidates.map((c) => ({ ...c }));
  updateVoteText();
};
//最新の情報を描写(レンダリング)する関数の実行
updateVoteText();
