//書き出し コンポーネント 引数
export default function ColorCircle({ color }) {
  return (
    <div
      style={{
        width: 100,
        height: 100,
        borderRadius: "50%",
        backgroundColor: color,
      }}
    />
  );
}
