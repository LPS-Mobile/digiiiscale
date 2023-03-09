import "./styles.scss";

export default function SelectBox(props) {
  const { type = "text", placeholder, label, value = "", onChange } = props
  return (<div className="digiscale_input">
    {label && <label className="inp_label" htmlFor={type}>{label}</label>}
    <select className="select" type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}>
      {props.children}
    </select>
  </div>
  );
}
