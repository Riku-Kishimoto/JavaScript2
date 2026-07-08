// src/App.jsx
import { useState } from "react";
import Greeting from "./components/Greeting.jsx";
//コンポーネントの宣言
import ColorCircle from "./components/ColorCircle.jsx";

export default function App() {
  //状態を持つ
  const [color, setColor] = useState("red");

  return (
    //インスタンス
    <main>
      <button onClick={() => setColor("red")}>赤</button>
      <button onClick={() => setColor("blue")}>青</button>
      <button onClick={() => setColor("yellow")}>黃</button>
      <button onClick={() => setColor("green")}>緑</button>
      {/* propsなので、ColorCircleに引かれる */}
      <ColorCircle color={color} />
    </main>
  );
}

//条件分岐
// //JSXの中ではif文が使えない。for・forEach文も使えない
// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(true);

//   return (
//     <main>
//       <h1>マイページ</h1>
//       {/* 論理演算子(かつ、and) */}
//       {/* 左側がtrueだったら右側の値が表示されるという特性を活かした書き方 */}
//       {/* {isLoggedIn && <p>ようこそ！</p>} */}
//       {/* 三項演算子、条件演算子 A?B : C AがtrueだったらB、falseだったらC */}
//       {isLoggedIn ? <p>ようこそ！</p> : <p>ログインしてください</p>}
//     </main>
//   );
// }

//useState

// export default function App() {
//   //分割代入
//   //useState()は初期値なので、最初はcountに0が載っている
//   // setCountはcountの値を変更したいときに変数の代入として入れる
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <p>カウント：{count}</p>
//       {/* setCountの値を変化させるとcountが変わる */}
//       {/* onClickはイベントハンドラ */}
//       <button onClick={() => setCount(count + 1)}>+1</button>
//     </div>
//   );
// }

//新しいapp宣言(大文字なのでコンポーネント)
// export default function App() {
//   return (
//     <main>
//       {/* nameが関数で言う引数(props) */}
//       <Greeting name="太郎" />
//       <Greeting name="花子" />
//       <Greeting name="次郎" />
//     </main>
//   );
// }

//関数の宣言 export
// 大文字なのでコンポーネント
/* export default function App() {
  //変数nameを作る
  const name = "太郎";

  // すでにjsx
  // JSXは一つの要素しか返せない
  return (
    <>
      <h1>タイトル</h1>
      <p>本文</p>
    </>
  );
}
 */
