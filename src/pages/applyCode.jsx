/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../AppContext"
import AppLogo from "../components/shared/AppLogo"
import Button from "../components/shared/Button"
import { getAuthorization, URLS } from "../constants/constent"

export default function ApplyCode(props) {
    const navigate = useNavigate()
    const { setProfile } = useContext(AppContext)
    const [code, setcode] = useState("")
    const [sending, setSending] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [window.location])

    const Submit = () => {
        if (!code) {
            setError("Enter code")
            return
        }
        setSending(true)
        const values = { code: code }
        axios.put(`${URLS.API}auth/applycode`, values, getAuthorization).then((res) => {
            setSending(false)
            const data = res.data
            if (res.status === 200) {
                setProfile(res.data)
                navigate("/payment-info")
            } else {
                setError(`${data.message}`)
            }
            setSending(false)
        }).catch((e) => {
            setError(e.response.data.message)
            window.scrollTo(0, 0)
            setSending(false)
        })
    }

    return (
        <section className="digiscale_confirmation">
            <div className="digiscale_header">
                <Button className="close_btn" style={{ color: "green" }}><Link to="/self-destruct" style={{ color: "green" }}>◁</Link></Button>
                <Button style={{ backgroundColor: "green" }}>
                    Apply Code
                </Button>
                <AppLogo />
            </div>
            <div className="digiscale_confirmation_container">
                <div className="confirmation_heading">
                    <div className={`confirmation_heading_item`}>
                        <div className="confirmation_code">
                            <input name="digit1" maxLength={3}
                                onChange={(e) => {
                                    setcode(e.target.value)
                                    setError("")
                                }} />
                        </div>
                        {error && <p className="error-data">{error}</p>}
                    </div>
                    <button disabled={sending} className={`confirmation_heading_item `} onClick={() => { Submit() }}>
                        <div style={{ color: "green" }} >{sending ? "Saving" : "Save"}</div>
                    </button>
                </div>

                <div className="business_space">
                    <div className="business_space_item">Business ad space</div>
                    <div className="business_space_item">Business ad space</div>
                    <div className="business_space_item">Business ad space</div>
                </div>
            </div>
        </section>
    )
}