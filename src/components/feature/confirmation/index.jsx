import { useEffect } from "react"
import { useState } from "react"
import Step1 from "./confirmationForm/Step1"
import Step2 from "./confirmationForm/Step2"
import Step3 from "./confirmationForm/Step3"
import Step4 from "./confirmationForm/Step4"
import Header from "./Header"
import "./styles.scss"

export default function Confirmation() {
    const [step, setStep] = useState(1)
    const queryParams = new URLSearchParams(window.location.search)
    const currStep = queryParams.get("step")

    useEffect(() => {
        if (currStep) {
            setStep(parseInt(currStep))
        }
    }, [currStep])

    return (<section className="digiscale_confirmation">
        <Header step={step} setStep={setStep} />
        <div className="digiscale_confirmation_container">
            {step === 1 && <Step1 step={step} setStep={setStep} />}
            {step === 2 && <Step2 step={step} setStep={setStep} />}
            {step === 3 && <Step3 step={step} setStep={setStep} />}
            {step === 4 && <Step4 step={step} setStep={setStep} />}
        </div>
    </section>
    )
}