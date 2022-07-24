import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../shared/Input";
import Button from "../../shared/Button";
import TitleSubtitle from "../../shared/TitleSubtitle";

import "./styles.scss";

export default function DigiscaleForm() {
  const [digiscaleTexts] = useState({
    title: "Digiscale",
    subTitle: "Are you over 21 years of age?",
  });

  return (
    <div className="digiscale_form_container">
      <TitleSubtitle
        title={digiscaleTexts.title}
        subTitle={digiscaleTexts.subTitle}
      />
      <div className="form_box">
        <form>
          <Input placeholder="First and Last Name" />
          <Input placeholder="License/ID Number" />
          <Input placeholder="SSN/EIN" type="number" />
          <Input placeholder="Address" />
          <Input placeholder="State" />
          <Input placeholder="City/County" />
          <Input placeholder="Zip Code" />
          <Input placeholder="Email Address" type="email" />
        </form>
        <div className="digiscale_btn">
          <Button children="Sign Up" />
          <Link to="/self-destruct">
            <Button children="Skip" color="red" />
          </Link>
        </div>
      </div>
    </div>
  );
}
