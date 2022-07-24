import { useState } from "react";
import Button from "../Button";

import "./styles.scss";

export default function Hamburger({ children }) {
  const [isShowHamburger, setIsShowHamburger] = useState(false);

  return (
    <div className="hamburger_container">
      <div
        className="hamburger_line"
        onClick={() => setIsShowHamburger(!isShowHamburger)}
      >
        <span className="top_line" />
        <span className="middle_line" />
        <span className="bottom_line" />
      </div>
      <div
        className={`hamburger_item_box ${
          isShowHamburger ? "hamburger_item_box_active" : ""
        }`}
      >
        <div
          className="close_btn"
          onClick={() => setIsShowHamburger(!isShowHamburger)}
        >
          <Button children="CLose" />
        </div>
        <div className="hamburger_items">{children}</div>
      </div>
    </div>
  );
}
