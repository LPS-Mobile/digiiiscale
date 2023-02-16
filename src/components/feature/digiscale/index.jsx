import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../shared/Button";

import "./styles.scss";

export default function Digiscale() {
  const navigate = useNavigate();
  const [error, setError] = useState("")

  const redirectPage = (age) => {
    navigate("register", { replace: true });
    localStorage.setItem("age", age)
    setError("")
  };

  return (
    <div className="digiscale_container">
      <p className="app_title">Digiscale</p>
      <div className="app_logo">
      </div>
      <p className="age_title">I'm over 21</p>
      <div className="digiscale_btn">
        <Button children="Yes" onClick={() =>
          redirectPage("yes")
        } />
        <Button children="No" onClick={() => {
          setError("Not allowed")
        }} />
        {error && <p className="error-data">{error}</p>}
      </div>
    </div>
  );
}
