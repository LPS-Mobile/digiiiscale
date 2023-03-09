import "./styles.scss";

export default function Input({ type = "text", placeholder, label, value = "", onChange, disabled }) {
  return (<div className="digiscale_input">
    {label && <label className="inp_label" htmlFor={type}>{label}</label>}
    <input type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      disabled={disabled}
    />
  </div>
  );
}
