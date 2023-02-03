import Button from "../../shared/Button";

export default function DriverTip() {
    return (<div className="digiscale_container">
        <p className="app_title">Digiscale</p>
        <div className="digiscale_btn" style={{ width: "100%" }}>
            <Button className="btn-green" style={{ width: "100%" }}>Tip your Delivery Driver</Button>
            <Button className="btn-red">No</Button>
        </div>
    </div>
    )
}