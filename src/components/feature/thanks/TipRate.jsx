import axios from "axios";
import { useState } from "react";
import { getAuthorization, URLS } from "../../../constants/constent";
import Button from "../../shared/Button";

export default function TipRate(props) {
    const { setStep, step, orderId, orderAmount } = props
    const DATA = [{ per: "10" }, { per: "20" }, { per: "30" }]
    const [tip, setTip] = useState(null)
    const [error, setError] = useState("")
    const [sending, setSending] = useState(false)
    const [custome, setCustom] = useState(false)

    const Submit = () => {
        if (!tip) {
            setError("Select Percentage")
            return
        }
        const values = {}
        setSending(true)
        values.orderId = orderId
        values.tip = tip
        axios.post(`${URLS.API}orders/${orderId}/tip`, values, getAuthorization).then((res) => {
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

    return <section className="digiscale_cart_data driver_tip_rate" error={error} >
        <div className="digiscale_header" style={{ backgroundColor: "transparent" }}>
            <Button className="close_btn" onClick={() => { setStep(step - 1) }} style={{ color: "green", fontSize: 30 }}>◁</Button>
        </div>
        <div className="digiscale_container">
            <p className="app_title">Digiscale</p>
            <div className="tip_rate_box">
                <p>Tip Your Delivery Driver</p>
                <ul>
                    {DATA.map((e, i) => {
                        return <li className={tip === e.per ? "active" : ""} onClick={() => {
                            setTip(e.per)
                            if (custome) {
                                setCustom(false)
                            }
                        }} key={i}><span>{e.per + "%"}</span><span>{((e.per / 100) * orderAmount).toFixed(2)}</span></li>
                    })}
                    {(custome && tip > 0) && <li className="active" ><span>{tip + "%"}</span><span>{((tip / 100) * orderAmount).toFixed(2)}</span></li>
                    }
                </ul>
                {custome && <div className="">
                    <p>Enter Tip Percentage</p>
                    <input name="rate" onChange={(e) => { setTip(e.target.value) }} type="number" value={tip} className="tip_input" />
                </div>}
            </div>
            {error && <p className="error-data">{error}</p>}
            <Button disabled={sending} style={{ marginTop: 12 }} className="btn_white" onClick={() => { Submit() }}>{sending ? "Saving" : "Save"}</Button>
            <p className="custom_tip" onClick={() => {
                setCustom(true)
                setTip(0)
            }}>Custom</p>
        </div>
    </section>
}