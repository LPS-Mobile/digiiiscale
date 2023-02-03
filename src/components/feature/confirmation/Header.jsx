import Button from "../../shared/Button";

export default function Header(props) {
    const { step, setStep } = props
    return (
        <div className="digiscale_header">
            <Button
                onClick={() => {
                    if (step > 1) {
                        setStep(step - 1)
                    }
                }}
                className="close_btn" style={{ color: "green" }}>◁</Button>
            {step !== 3 && <Button style={{ backgroundColor: "red" }}>
                Self Destruct
            </Button>}
            <Button>
                Logo
            </Button>
        </div>
    )
}