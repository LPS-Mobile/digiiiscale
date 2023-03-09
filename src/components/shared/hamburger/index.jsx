import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../AppContext";
import "./styles.scss";

export default function Hamburger({ children }) {
  const { profile } = useContext(AppContext)
  const [isShowHamburger, setIsShowHamburger] = useState(false);

  const menuRef = useRef()
  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsShowHamburger(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [])

  return (
    <div className="hamburger_container">
      <div
        className="hamburger_line"
        onClick={() => setIsShowHamburger(!isShowHamburger)}>
        <span className="top_line" />
        <span className="middle_line" />
        <span className="bottom_line" />
      </div>
      <div ref={menuRef}
        className={`hamburger_item_box ${isShowHamburger ? "hamburger_item_box_active" : ""
          }`}>
        <div>
          <div
            className="close_btn"
            onClick={() => setIsShowHamburger(!isShowHamburger)}>
            X
          </div>
          {profile && <div className="user_name">{profile.fullName}</div>}
        </div>
        <div className="hamburger_items">{children}</div>
      </div>
    </div>
  );
}
