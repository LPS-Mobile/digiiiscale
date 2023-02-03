import Map from "./delivery/Map";
import "./styles.scss"
import { useState } from "react";
import Step1 from "./delivery/Step1";
import Step2 from "./delivery/Step2";
import Step3 from "./delivery/Step3";
import Step4 from "./delivery/Step4";
import Step5 from "./delivery/Step5";
import PreviousPickups from "./PreviousPickups";
import Header from "./Header";

export default function Location() {
    const [step, setStep] = useState(1)
    const [active, setActive] = useState("")

    return (<div className="location_container">
        <Header step={step} setStep={setStep} />

        <div className="digiscale_pickups">
            {step === 1 && <Step1 step={step} setStep={setStep} active={active} setActive={setActive} />}
            {step === 2 && <Step2 step={step} setStep={setStep} />}
            {step === 3 && <Step3 step={step} setStep={setStep} />}
            {step === 4 && <Step4 step={step} setStep={setStep} />}
            {step === 5 && <Step5 step={step} setStep={setStep} />}
            {step === 6 && <PreviousPickups step={step} setStep={setStep} />}

            <Map />
        </div>
    </div>
    )
}