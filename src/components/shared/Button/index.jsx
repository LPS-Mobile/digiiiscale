import "./styles.scss";

export default function Button({ text, color, onClick }) {
  return (
    <div className="btn_box">
      <button style={{ color }} onClick={onClick}>
        {text}
      </button>
    </div>
  );
}
