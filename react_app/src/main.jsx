import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
//受け取っているapp
//最初の文字が大文字ならコンポーネント。コンポーネントは最初の文字を大文字にしないといけない
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* コンポーネントとして実行されている */}
    {/* タグは必ず閉じる 　後ろ側にスラッシュ*/}
    <App />
  </StrictMode>,
);
