import { Link } from "react-router-dom"
import logo from "../../public/images/logo.png"

export default function AppLogo({ link = "/self-destruct" }) {
    return (<div className="logo-container"><Link to={link} className="logo-link">
        <img src={logo} alt="digiscale" />

    </Link></div>
    )
}