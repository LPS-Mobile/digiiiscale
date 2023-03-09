/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import AppLogo from "../components/shared/AppLogo";
import Button from "../components/shared/Button";
import Input from "../components/shared/Input";
import { getAuthorization, URLS } from "../constants/constent";

export default function CardInfo(props) {
    const navigate = useNavigate()
    const { profile } = useContext(AppContext)
    const [name, setName] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [cv, setCV] = useState("")
    const [zip, setZipCode] = useState("")
    const [acNumber, setAcNumber] = useState("")
    const [routingNumber, setRoutingNumber] = useState("")
    const [sending, setSending] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if (profile && !profile.isVerified) {
            navigate("/apply/code")
        }
    }, [profile])

    const Submit = () => {
        if (!name) {
            setError("Name is required")
            return
        }
        if (!cardNumber) {
            setError("Card Number is required")
            return
        }
        if (!cv) {
            setError("CV is required")
            return
        }
        if (!zip) {
            setError("Zipcode is required")
            return
        }
        if (!acNumber) {
            setError("Account Number is required")
            return
        }
        if (!routingNumber) {
            setError("Routing Number is required")
            return
        }
        const values = { name, cardNumber, cv, zip, acNumber, routingNumber }
        setSending(true)
        axios.put(`${URLS.API}payment`, values, getAuthorization).then((res) => {
            setSending(false)
            const data = res.data
            if (data) {
                setError('');
                navigate("/self-destruct")
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
    return (<section className="digiscale_confirmation">
        <div className="digiscale_header">
            <Button className="close_btn" style={{ color: "green" }}><Link to="/self-destruct" style={{ color: "green" }}>◁</Link></Button>
            <Button style={{ backgroundColor: "green" }}>
                Card Info
            </Button>
            <AppLogo />
        </div>
        <div className="digiscale_confirmation_container">

            <div style={{ display: "flex", justifyContent: "space-between", minHeight: "80vh", flexDirection: "column" }}>
                <div className="confirmation_heading" >
                    <div className={`confirmation_heading_item `} style={{ paddingTop: 12 }}>
                        <div style={{ color: "green", fontSize: 20, paddingBottom: 12 }}>Payment Info</div>
                        <div className="digiscale_form payment_info">
                            <Input placeholder="Name on card" value={name}
                                onChange={(e) => {
                                    setName(e.target.value)
                                    setError("")
                                }} />
                            <Input placeholder="Card Number" type="number" value={cardNumber}
                                onChange={(e) => {
                                    setCardNumber(e.target.value)
                                    setError("")
                                }} />
                            <Input placeholder="CV Number" type="number" value={cv}
                                onChange={(e) => {
                                    setCV(e.target.value)
                                    setError("")
                                }} />
                            <Input placeholder="Zip Code" value={zip}
                                onChange={(e) => {
                                    setZipCode(e.target.value)
                                    setError("")
                                }} />
                            <Input placeholder="Account Number (Drivers)" value={acNumber}
                                onChange={(e) => {
                                    setAcNumber(e.target.value)
                                    setError("")
                                }} />
                            <Input placeholder="Routing Number (Drivers)" value={routingNumber}
                                onChange={(e) => {
                                    setRoutingNumber(e.target.value)
                                    setError("")
                                }} />
                        </div>
                        {error && <p className="error-data" style={{ textAlign: "left" }}>{error}</p>}

                    </div>
                </div>
                <div style={{ textAlign: "center", marginTop: 20 }}>
                    <Button className="btn_white" onClick={() => Submit()} disabled={sending}>
                        {sending ? "Saving" : "Save"}
                    </Button>
                </div>
            </div>
        </div>
    </section>
    )
}