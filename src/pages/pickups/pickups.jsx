import "./styles.scss"
import { useState } from "react";
import Header from "../../components/feature/pickups/Header"
import Step2 from "../../components/feature/pickups/delivery/Step2";
import Step3 from "../../components/feature/pickups/delivery/Step3";
import Step4 from "../../components/feature/pickups/delivery/Step4";
import Step5 from "../../components/feature/pickups/delivery/Step5";
import Map from "../../components/feature/pickups/delivery/Map";

export default function Pickups() {
    const [step, setStep] = useState(2)

    return (<div className="location_container">
        <Header step={step} setStep={setStep} />

        <div className="digiscale_pickups">
            {step === 2 && <Step2 step={step} setStep={setStep} />}
            {step === 3 && <Step3 step={step} setStep={setStep} />}
            {step === 4 && <Step4 step={step} setStep={setStep} />}
            {step === 5 && <Step5 step={step} setStep={setStep} />}
            <Map />
        </div>
    </div>
    )
}