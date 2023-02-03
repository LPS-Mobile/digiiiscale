import { Link } from "react-router-dom";
import Input from "../../shared/Input";
import Button from "../../shared/Button";
import "./styles.scss";

export default function PickupRegistration() {
    return (<section className="digiscale_confirmation">
        <div className="digiscale_header">
            <div className="btn_box">
                <button className="close_btn" style={{ color: "green" }}>◁</button>
            </div>
            <div className="btn_box">
                <button>Logo</button>
            </div>
        </div>
        <div className="digiscale_confirmation_container">
            <div className="digiscale_form">
                <Input label="First & Last Name" />
                <Input label="License/ID Number" />
                <Input label="SSN/EIN" />
                <Input label="Address" />
                <Input label="State" />
                <Input label="City/Country" />
                <Input label="Zip Code" />
                <Input label="Email Address" />
            </div>

            <p style={{ textAlign: "center", fontSize: 12, color: "white" }}>All digital delivery drivers are subject to a background check.</p>
            <Link to="/confirmation?step=2" style={{ display: "block", color: "green", textAlign: "center" }}>Already Have  Confimation Number?</Link>

            <div style={{ textAlign: "center", marginTop: 20 }}>
                <div className="btn_box">
                    <Button className="btn_white">
                        <Link to="/verification" style={{ color: "green" }}>Continue</Link></Button>
                </div>
            </div>
        </div>
    </section>
    );
}
