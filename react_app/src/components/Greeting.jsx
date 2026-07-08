//exportしている関数 大文字なのでコンポーネント
//コンポーネントの引数をpropsという{}で囲む
export default function Greeting({ name }) {
  return <p>こんにちは、{name}さん！</p>;
}
