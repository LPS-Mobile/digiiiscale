import { Link } from "react-router-dom";
import Input from "../../shared/Input";
import Button from "../../shared/Button";

import "./styles.scss";

export default function DigiscaleForm() {
  return (
    <div className="digiscale_form_container">
      <div className="app_logo"></div>
      <div className="form_box">
        <form>
          <Input label="First and Last Name" />
          <Input label="License/ID Number" />
          <Input label="SSN/EIN" type="number" />
          <Input label="Address" />
          <Input label="State" />
          <Input label="City/County" />
          <Input label="Zip Code" />
          <Input label="Email Address" type="email" />
        </form>
        <div className="digiscale_btn digiscale_form_btn">
          <Button>
            <Link to="/self-destruct" style={{ color: "red" }}>Skip</Link>
          </Button>
          <Button>
            <Link style={{ color: "green" }} to="/self-destruct">Enter</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
