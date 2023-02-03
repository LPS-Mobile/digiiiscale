import Button from "../../../shared/Button";
import Input from "../../../shared/Input";

export default function Step4(props) {
    const { setStep } = props
    return (<div style={{ display: "flex", justifyContent: "space-between", minHeight: "80vh", flexDirection: "column" }}>
        <div className="confirmation_heading" >
            <div className={`confirmation_heading_item `} style={{ paddingTop: 12 }} onClick={() => { setStep(4) }}>
                <div style={{ color: "green", fontSize: 16 }}>Payment Info</div>
                <div className="digiscale_form payment_info">
                    <Input placeholder="Name on card" />
                    <Input placeholder="Card Number" type="number" />
                    <Input placeholder="CV Number" type="number" />
                    <Input placeholder="Zip Code" />
                    <Input placeholder="Account Number (Drivers)" />
                    <Input placeholder="Routing Number (Drivers)" />
                </div>
            </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 20 }}>
            <Button className="btn_white">
                Save
            </Button>
        </div>
    </div>
    )
}