import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../shared/Button";
import TitleSubtitle from "../../shared/TitleSubtitle";

import "./styles.scss";

export default function Digiscale() {
  const [digiscaleTexts] = useState({
    title: "Digiscale",
    subTitle: "Are you over 21 years of age?",
  });

  const navigate = useNavigate();

  const redirectPage = () => {
    navigate("digiscale-form", { replace: true });
  };

  return (
    <div className="digiscale_container">
      <TitleSubtitle
        title={digiscaleTexts.title}
        subTitle={digiscaleTexts.subTitle}
      />
      <div className="digiscale_btn">
        <Button text="Yes" onClick={redirectPage} />
        <Button text="No" />
      </div>
    </div>
  );
}
