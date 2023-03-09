import { Link } from "react-router-dom"
import AppLogo from "../components/shared/AppLogo"
import Button from "../components/shared/Button"

export default function StateOfLaws() {
    return (<section className="location_container">
        <div className="digiscale_header">
            <Button className="close_btn" style={{ color: "green" }}><Link to="/self-destruct" style={{ color: "green" }}>◁</Link></Button>
            <div style={{ cursor: "pointer", color: "green", fontSize: "20px", fontWeight: 600 }}>
                State of Laws
            </div>
            <AppLogo />
        </div>
        <div>
            <h3 style={{ textAlign: "center", color: "white" }}>State of Laws</h3>
        </div>


    </section>
    )
}