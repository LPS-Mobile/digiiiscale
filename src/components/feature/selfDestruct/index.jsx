import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../shared/Button";
import Hamburger from "../../shared/hamburger";
import { HAMBURGER_ITEMS } from "../../../constants/hamburger_items";

import "./styles.scss";

export default function SelfDestruct() {
  const [kgGrams, setKgGrams] = useState("0 kg");

  const handleSetKgGrams = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) return setKgGrams("0 Grams");
    return setKgGrams("0 kg");
  };

  const createHamburgerItems = () => {
    const items = HAMBURGER_ITEMS;
    if (!items) return;

    return items.map((item, index) => {
      if (item.otherName) {
        return (
          <p key={index} className="swtich_toggle_text">
            {item.name}
            <label className="switch">
              <input type="checkbox" onClick={handleSetKgGrams} />
              <span className="slider round"></span>
            </label>
            {item.otherName}
          </p>
        );
      } else {
        return (
          <Link key={index} to={item.href}>
            {item.name}
          </Link>
        );
      }
    });
  };

  return (
    <div className="self_destruct_container">
      <div className="self_destruct_header">
        <Hamburger>{createHamburgerItems()}</Hamburger>
        <Button>
          <Link to="/digiscale-form">Self Destruct</Link>
        </Button>
      </div>
      <div className="kg_grams_box" />
      <div className="kg_grams_btn">
        <Button>{kgGrams}</Button>
      </div>
    </div>
  );
}
