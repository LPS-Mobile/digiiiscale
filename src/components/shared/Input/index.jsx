import "./styles.scss";

export default function Input({ type = "text", placeholder }) {
  return (
    <label className="inp_label" htmlFor={type}>
      <input type={type} placeholder={placeholder} />
    </label>
  );
}
