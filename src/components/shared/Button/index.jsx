import "./styles.scss";

export default function Button({ children, color, onClick, disabled, ...rest }) {
  return (
    <div className="btn_box">
      <button style={{ color }} disabled={disabled} onClick={onClick} {...rest}>
        {typeof children === "string" ? children : children}
      </button>
    </div>
  );
}
