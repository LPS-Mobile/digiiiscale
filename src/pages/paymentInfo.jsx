import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import Button from "../components/shared/Button";
import Input from "../components/shared/Input";
import { getAuthorization, URLS } from "../constants/constent";

export default function PaymentInfo(props) {
    const { profile, setProfile } = useContext(AppContext)
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [zip, setZipCode] = useState("")
    const [error, setError] = useState("")
    const [sending, setSending] = useState(false)

    useEffect(() => {
        if (profile) {
            setFirstName(profile.firstName)
            setLastName(profile.lastName)
            setAddress(profile.street)
            setCity(profile.city)
            setState(profile.state)
            setCountry(profile.country)
            setZipCode(profile.zip)
        }
    }, [profile])

    const Submit = () => {
        if (!firstName) {
            setError("First Name is required")
            return
        }
        if (!lastName) {
            setError("Last Name is required")
            return
        }
        if (!address) {
            setError("Address is required")
            return
        }
        if (!city) {
            setError("City is required")
            return
        }
        if (!state) {
            setError("State is required")
            return
        }
        if (!country) {
            setError("Country is required")
            return
        }
        if (!zip) {
            setError("Email is required")
            return
        }

        profile.firstName = firstName
        profile.lastName = lastName
        profile.street = address
        profile.city = city
        profile.state = state
        profile.country = country
        profile.zip = zip
        setSending(true)
        axios.put(URLS.API + 'auth/profile', profile, getAuthorization).then((res) => {
            if (res.status === 200) {
                setProfile(profile)
                navigate("/card-info")
            } else {
                setError("Try Again")
            }
            setSending(false)
        }).catch((e) => {
            setError(e?.response?.data?.message || e?.response?.data?.error)
            setSending(false)
        })
    }

    return (<>
        <section className="digiscale_confirmation">
            <div className="digiscale_header">
                <Button className="close_btn" style={{ color: "green" }}><Link to="/self-destruct" style={{ color: "green" }}>◁</Link></Button>
                <Button style={{ backgroundColor: "red" }}>
                    Payment Info
                </Button>
                <Button>
                    <Link to="/self-destruct" className="logo-link">
                        Logo
                    </Link>
                </Button>
            </div>
            <div className="digiscale_confirmation_container">
                <div className="digiscale_form">
                    <div className="digiscale_input">
                        <label className="inp_label" >Email</label>
                        <div className="input disabled">{profile?.email}</div>
                    </div>
                    <Input label="First Name" value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value)
                            setError("")
                        }} />
                    <Input label="Last Name" value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value)
                            setError("")
                        }} />

                    <Input label="Address" value={address}
                        onChange={(e) => {
                            setAddress(e.target.value)
                            setError("")
                        }} />
                    <Input label="City" value={city}
                        onChange={(e) => {
                            setCity(e.target.value)
                            setError("")
                        }} />
                    <Input label="State" value={state}
                        onChange={(e) => {
                            setState(e.target.value)
                            setError("")
                        }} />
                    <Input label="Country" value={country}
                        onChange={(e) => {
                            setCountry(e.target.value)
                            setError("")
                        }} />
                    <Input label="Zip Code" value={zip}
                        type="number"
                        onChange={(e) => {
                            setZipCode(e.target.value)
                            setError("")
                        }} />
                    {error && <p className="error-data">{error}</p>}
                </div>
                <div className="confirmation_heading" style={{ paddingTop: 20 }}>
                    <button disabled={sending} className={`confirmation_heading_item `}
                        onClick={() => { navigate("/card-info") }} >
                        <div style={{ color: "green" }}>{sending ? "Submitting" : "Payment Info"}</div>
                    </button>
                </div>
                <div style={{ textAlign: "center", marginTop: 20 }}>
                    <Button disabled={sending} className="btn_white" onClick={() => { Submit() }}>
                        {sending ? "Saving" : "Save"}
                    </Button>
                </div>
            </div>
        </section>
    </>
    )
}