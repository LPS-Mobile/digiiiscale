import Button from "../../../shared/Button";
import Input from "../../../shared/Input";

export default function Step3(props) {
    const { setStep } = props
    return (<>
        <div className="digiscale_form">
            <Input label="Full Name" />
            <Input label="User Name" />
            <Input label="Email" type="email" />
            <Input label="Street Name/Apt" />
            <Input label="State" />
            <Input label="City/County" />
            <Input label="Zip Code" />
        </div>
        <div className="confirmation_heading" style={{ paddingTop: 8 }}>
            <div className={`confirmation_heading_item `} onClick={() => { setStep(4) }}>
                <div style={{ color: "green" }}>Payment Info</div>
            </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 20 }}>
            <Button className="btn_white">
                Save
            </Button>
        </div>
    </>
    )
}