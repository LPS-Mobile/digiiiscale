import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import "./styles.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { URLS } from "../../constants/constent";
import logo from "../../public/images/logo.png"
import SelectBox from "../../components/shared/SelectBox";
import { STATES } from "../../constants/constArray";

export default function DigiscaleForm() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
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

    const values = { accountType: "user", firstName, lastName, street: address, licenseNum: "", ssn: "", city, state, country: "USA", zip, email, password }
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
        <div className="auth_logo">
          <Link to="/self-destruct">
            <img src={logo} alt="digiscale" />
          </Link>
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
        <Input label="Country" value="USA" disabled={true} />
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
        </div>
        <p className="text-white" style={{ textAlign: "center" }}>Already have an account? <span><Link to="/login" className="text-primary">Login</Link></span></p>

      </div>
    </div>
  );
}
