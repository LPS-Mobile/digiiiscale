import { Link } from "react-router-dom";
import Button from "../shared/Button";

export default function Verification() {
    return <section style={{ color: "white", minHeight: "100vh", padding: "100px 60px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "column" }}>

        <div style={{ textAlign: "center", fontSize: 16 }}>   Once of the background check is finish we will send you an email with an update of your status.
            A confirmation number will be included if approve. Simply click on Digiscale icon then input the number to gain
            access of available pickups in your local area.
        </div>
        <div style={{ textAlign: "center", marginTop: 20 }}>
            <Button className="btn_white">
                <Link to="/self-destruct" style={{ color: "green" }}>Home</Link>
            </Button>
        </div>
    </section>
}