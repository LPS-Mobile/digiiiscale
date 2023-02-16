import { Link } from "react-router-dom";
import Button from "../../shared/Button";

export default function DriverTip(props) {
    const { setStep } = props
    return (<>
        <div className="digiscale_container driver_tip" style={{ justifyContent: "flex-start" }}>
            <div className="digiscale_header" style={{ width: "90%" }}>
                <button className="close_btn" style={{ color: "green", fontSize: 30, }}>
                    <Link style={{ color: "green", fontSize: 30, }} to="/order">◁</Link></button>
            </div>

            <p className="app_title">Digiscale</p>
            <div className="digiscale_btn" style={{ width: "100%" }}>
                <Button className="btn-green" style={{ width: "100%" }} onClick={() => { setStep(3) }}>Tip your Delivery Driver</Button>
                <Button className="btn-red" onClick={() => { setStep(4) }}>No</Button>
            </div>
        </div>
    </>
    )
}