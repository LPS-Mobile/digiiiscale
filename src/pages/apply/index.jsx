import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import AppLogo from "../../components/shared/AppLogo";
import Button from "../../components/shared/Button";
import Input from "../../components/shared/Input";
import SelectBox from "../../components/shared/SelectBox";
import { STATES } from "../../constants/constArray";
import { getAuthorization, URLS } from "../../constants/constent";
import "./styles.scss";

export default function Apply() {
    const { profile, setProfile } = useContext(AppContext)
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("USA")
    const [zip, setZipCode] = useState("")
    const [ssn, setSsn] = useState("")
    const [licenseNum, setLicenseNum] = useState("")
    const [error, setError] = useState("")
    const [sending, setSending] = useState(false)

    useEffect(() => {
        if (profile) {
            setFirstName(profile.firstName)
            setLastName(profile.lastName)
            setAddress(profile.street)
            setCity(profile.city)
            setState(profile.state)
            setZipCode(profile.zip)
            setSsn(profile.ssn)
            setLicenseNum(profile.licenseNum)
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
        if (!ssn) {
            setError("SSN is required")
            return
        }
        if (!licenseNum) {
            setError("License Number is required")
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
        profile.licenseNum = licenseNum
        profile.ssn = ssn
        profile.city = city
        profile.state = state
        profile.country = country
        profile.zip = zip
        setSending(true)
        axios.put(URLS.API + 'auth/apply', profile, getAuthorization).then((res) => {
            if (res.status === 200) {
                setProfile(profile)
                navigate("/verification")
            } else {
                setError("Try Again")
            }
            setSending(false)
        }).catch((e) => {
            setError(e?.response?.data?.message || e?.response?.data?.error)
            setSending(false)
        })
    }

    return (<section className="digiscale_confirmation">
        <div className="digiscale_header">
            <div className="btn_box">
                <button className="close_btn" style={{ color: "green" }}>
                    <Link style={{ color: "green" }} to="/self-destruct">◁</Link></button>
            </div>
            <AppLogo />
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
                <Input label="SSN/EIN" value={ssn}
                    onChange={(e) => {
                        setSsn(e.target.value)
                        setError("")
                    }}
                />
                <Input label="License Num" value={licenseNum}
                    onChange={(e) => {
                        setLicenseNum(e.target.value)
                        setError("")
                    }}
                />
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
                <SelectBox label="State" value={state}
                    onChange={(e) => {
                        setState(e.target.value)
                        setError("")
                    }}>
                    <option value="">Select State</option>
                    {STATES.map((e, i) => {
                        return <option value={e} key={i}>{e}</option>
                    })}
                </SelectBox>
                <Input label="Country" value={country} disabled={true}
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
            </div>

            <p style={{ textAlign: "center", fontSize: 12, color: "white" }}>All digital delivery drivers are subject to a background check.</p>
            <Link to="/apply/code" style={{ display: "block", color: "green", textAlign: "center" }}>Already Have  Confimation Number?</Link>

            <div style={{ textAlign: "center", marginTop: 20 }}>
                {error && <p className="error-data" style={{ textAlign: "center", paddingBottom: 8 }}>{error}</p>}
                <div className="btn_box">
                    <Button className="btn_white" type="button" disabled={sending}
                        onClick={() => { Submit() }} >
                        {sending ? "Submitting" : "Submit"}
                    </Button>
                </div>
            </div>
        </div>
    </section>
    );
}
