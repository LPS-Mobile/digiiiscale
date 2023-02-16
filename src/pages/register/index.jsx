import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import "./styles.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { URLS } from "../../constants/constent";

export default function DigiscaleForm() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const [zip, setZipCode] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [sending, setSending] = useState(false)


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
    if (!email) {
      setError("Email is required")
      return
    }
    if (!password) {
      setError("Password is required")
      return
    }
    if (password.length < 7) {
      setError("Password must be longer than or equal to 7 characters")
      return
    }

    const values = { firstName, lastName, street: address, licenseNum: "", ssn: "", city, state, country, zip, email, password }
    setSending(true)
    axios.post(URLS.API + 'auth/register', values).then((res) => {
      if (res.status === 201) {
        navigate("/login")
      } else {
        setError("Try Again")
      }
      setSending(false)
    }).catch((e) => {
      setError(e?.response?.data?.message || e?.response?.data?.error)
      setSending(false)
    })
  }


  return (
    <div className="digiscale_form_container">
      <div className="form_box">
        <div className="digiscale_header">
          <button className="close_btn" style={{ color: "green", textAlign: "left" }}>
            <Link to="/" style={{ color: "green" }}>◁</Link>
          </button>
        </div>

        <div className="app_logo"></div>
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
        <Input label="Email Address" type="email" value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError("")
          }} />
        <Input label="Password" type="password" value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setError("")
          }} />

        {error && <p className="error-data">{error}</p>}
        <div className="digiscale_btn digiscale_form_btn">
          <Button>
            <Link to="/self-destruct" style={{ color: "red" }}>Skip</Link>
          </Button>
          <Button disabled={sending} onClick={Submit} style={{ color: "green", marginBottom: 0 }}>{sending ? "Entering" : "Enter"}</Button>
          <p className="text-white">Already have an account? <span><Link to="/login" className="text-primary">Login</Link></span></p>
        </div>
      </div>
    </div>
  );
}
