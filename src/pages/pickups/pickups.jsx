/* eslint-disable react-hooks/exhaustive-deps */
import "./styles.scss"
import { useContext, useEffect, useState } from "react";
import Header from "../../components/feature/pickups/Header"
import Step2 from "../../components/feature/pickups/delivery/Step2";
import Step3 from "../../components/feature/pickups/delivery/Step3";
import Step4 from "../../components/feature/pickups/delivery/Step4";
import Step5 from "../../components/feature/pickups/delivery/Step5";
import { getAuthorization, URLS } from "../../constants/constent";
import axios from "axios";
import Step6 from "../../components/feature/pickups/delivery/Step6";
import { AppContext } from "../../AppContext";
import { useNavigate } from "react-router-dom";

export default function Pickups() {
    const { profile } = useContext(AppContext)
    const navigate = useNavigate()
    const [step, setStep] = useState(2)
    const [pickups, setPickups] = useState([])
    const [pickup, setPickup] = useState(null)
    const [error, setError] = useState("")
    const [sending, setSending] = useState(false)


    useEffect(() => {
        if (profile && !profile.isVerified) {
            navigate("/apply/code")
        }
    }, [profile])

    const updateOrder = (status) => {
        const values = {}
        setSending(true)
        values.status = status
        axios.post(`${URLS.API}orders/${pickup?._id}/status`, values, getAuthorization).then((res) => {
            setSending(false)
            const data = res.data
            if (res.status === 201) {
                setError('');
                setStep(step + 1)
            } else {
                window.scrollTo(0, 0)
                setError(`${data}`)
            }
            setSending(false)
        }).catch((e) => {
            window.scrollTo(0, 0)
            setError("Try again")
            setSending(false)
        })
    }

    return (<div className="location_container">
        <Header step={step} setStep={setStep} />
        <div className="digiscale_pickups">
            {step === 2 && <Step2 step={step} setStep={setStep} pickup={pickup} setPickup={setPickup} pickups={pickups} setPickups={setPickups} />}
            {step === 3 && <Step3 step={step} updateOrder={updateOrder} sending={sending} error={error} setStep={setStep} pickup={pickup} setPickup={setPickup} route={true} />}
            {step === 4 && <Step4 step={step} updateOrder={updateOrder} sending={sending} error={error} setStep={setStep} pickup={pickup} setPickup={setPickup} />}
            {step === 5 && <Step5 step={step} updateOrder={updateOrder} sending={sending} error={error} setStep={setStep} pickup={pickup} setPickup={setPickup} />}
            {step === 6 && <Step6 step={step} updateOrder={updateOrder} sending={sending} error={error} setStep={setStep} pickup={pickup} setPickup={setPickup} />}
        </div>
    </div>
    )
}