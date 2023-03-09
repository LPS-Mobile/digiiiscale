import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import "./styles.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { URLS } from "../../constants/constent";
import { getProfileAction } from "../../actions/actions";
import { AppContext } from "../../AppContext";
import logo from "../../public/images/logo.png"

export default function Login() {
  const { setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [sending, setSending] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const Submit = () => {
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

    const values = { email, password }
    setSending(true)
    axios.post(URLS.API + 'auth/log-in', values).then((res) => {
      if (res.status === 200) {
        localStorage.setItem("token", res.data)
        getProfileAction(({ data, error }) => {
          if (error) {
          } else {
            setProfile(data);
            localStorage.setItem("id", data._id)
          }
        }, res.data);
        navigate("/self-destruct")
        window.location.reload(true)
      } else {
        setError("Try Again")
      }
      setSending(false)
    }).catch((e) => {
      setError(e?.response?.data?.message || e?.response?.data?.error)
      setSending(false)

    })
  }


  return (<div className="digiscale_form_container login">
    <div className="form_box">
      <div className="digiscale_header" style={{ backgroundColor: "transparent" }}>
        <button className="close_btn" style={{ color: "green", textAlign: "left" }}>
          <Link to="/self-destruct" style={{ color: "green" }}>◁</Link>
        </button>
      </div>
      <div>
        <div className="auth_logo">
          <Link to="/self-destruct">
            <img src={logo} alt="digiscale" />
          </Link>
        </div>
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
        {error && <p className="error-data" style={{ textAlign: "center", paddingTop: 0 }}>{error}</p>}

      </div>

      <div>
        <div className="digiscale_btn digiscale_form_btn">
          <Button disabled={sending} onClick={Submit} style={{ color: "green" }}>{sending ? "Entering" : "Enter"}</Button>
        </div>
        <p className="text-white" style={{ textAlign: "center" }}>You have not any account? <span><Link to="/register" className="text-primary">Register</Link></span></p>
      </div>
    </div>
  </div>
  );
}
