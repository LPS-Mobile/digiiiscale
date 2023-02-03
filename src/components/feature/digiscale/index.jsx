import { useNavigate } from "react-router-dom";
import Button from "../../shared/Button";

import "./styles.scss";

export default function Digiscale() {
  const navigate = useNavigate();

  const redirectPage = () => {
    navigate("digiscale-form", { replace: true });
  };

  return (
    <div className="digiscale_container">
      <p className="app_title">Digiscale</p>

      <div className="app_logo">

      </div>
      <p className="age_title">I'm over 21</p>
      <div className="digiscale_btn">
        <Button children="Yes" onClick={redirectPage} />
        <Button children="No" />
      </div>
    </div>
  );
}
