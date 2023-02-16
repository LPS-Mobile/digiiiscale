import { Link } from "react-router-dom";
import Button from "../../shared/Button";

export default function ThankYou() {
    return (<div className="digiscale_container thank_you">
        <p className="app_title">Digiscale</p>
        <div className="digiscale_btn">
            <Button className="btn-green" >
                <Link to="/self-destruct">Thank You</Link></Button>
        </div>
    </div>
    )
}