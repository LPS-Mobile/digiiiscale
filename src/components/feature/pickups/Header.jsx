import { Link } from "react-router-dom"
import Button from "../../shared/Button"

export default function Header(props) {
    const { step, setStep } = props
    return (<div className="location_header">
        {step > 2 ? <Button className="close_btn" style={{ color: "green" }}
            onClick={() => {
                if (step === 6) {
                    setStep(1)
                } else if (step > 1 && step !== 6) {
                    setStep(step - 1)
                }
            }}>◁</Button>
            : <Button className="close_btn">
                <Link to="/digiscale-delivery">◁</Link></Button>}

        {(step === 1 || step === 2 || step === 3) && <Button>
            Set Location
        </Button>}
        {step === 4 && <Button onClick={() => setStep(step + 1)}>Next</Button>}
        {step === 5 && <Button>Delivery Location</Button>}

        <Button>
            <Link to="/self-destruct" className="logo-link">
                Logo
            </Link>
        </Button>
    </div>
    )
}