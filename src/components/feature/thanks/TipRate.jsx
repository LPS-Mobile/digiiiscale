import axios from "axios";
import { useState } from "react";
import { getAuthorization, URLS } from "../../../constants/constent";
import Button from "../../shared/Button";

export default function TipRate(props) {
    const { setStep, step, orderId } = props
    const DATA = [{ per: "10", rate: "$0.0" }, { per: "20", rate: "$0.0" }, { per: "30", rate: "$0.0" }]
    const [tip, setTip] = useState(null)
    const [error, setError] = useState("")
    const [sending, setSending] = useState(false)

    const Submit = (driverTip) => {
        const values = {}
        setSending(true)
        values.orderId = orderId
        values.driverTip = driverTip || tip
        axios.post(`${URLS.API}orders/tip`, values, getAuthorization).then((res) => {
            setSending(false)
            const data = res.data
            if (data) {
                setError('');
                setStep(4)
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

    return <section className="digiscale_cart_data driver_tip_rate" error={error} sending={sending}>
        <div className="digiscale_header">
            <Button className="close_btn" onClick={() => { setStep(step - 1) }} style={{ color: "green", fontSize: 30 }}>◁</Button>
        </div>
        <div className="digiscale_container">
            <p className="app_title">Digiscale</p>
            <div className="tip_rate_box">
                <p>Tip Your Delivery Driver</p>
                <ul>
                    {DATA.map((e, i) => {
                        return <li onClick={() => {
                            setTip(e)
                            Submit(e)
                        }} key={i}><span>{e.per + "%"}</span><span>{e.rate}</span></li>
                    })}
                </ul>
            </div>
            <p className="custom_tip">Custom</p>
        </div>
    </section>
}