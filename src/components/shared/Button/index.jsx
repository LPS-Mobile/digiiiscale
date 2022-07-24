import "./styles.scss";

export default function Button({ children, color, onClick, ...rest }) {
  return (
    <div className="btn_box">
      <button style={{ color }} onClick={onClick} {...rest}>
        {typeof children === "string" ? children : children}
      </button>
    </div>
  );
}
