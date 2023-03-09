import { Link } from "react-router-dom";
import Button from "../components/shared/Button";

export default function PageNotFound() {
    return <section style={{ color: "white", minHeight: "100vh", padding: "100px 60px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "column" }}>

        <div style={{ textAlign: "center", fontSize: 16 }}>
            Oops! Page Not Found.
        </div>
        <div style={{ textAlign: "center", marginTop: 20 }}>
            <Link to="/self-destruct" style={{ color: "green" }}> <Button className="btn_white">
                Home
            </Button></Link>
        </div>
    </section>
}