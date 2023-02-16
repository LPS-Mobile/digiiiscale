import { Link } from "react-router-dom"
import Button from "../components/shared/Button"

export default function StateOfLaws() {
    return (<section className="location_container">
        <div className="digiscale_header">
            <Button className="close_btn" style={{ color: "green" }}><Link to="/self-destruct" style={{ color: "green" }}>◁</Link></Button>
            <Button>
                State Of Laws
            </Button>
            <Button>
                <Link to="/self-destruct" className="logo-link">
                    Logo
                </Link>
            </Button>
        </div>
        <div>
            <h3 style={{ textAlign: "center", color: "white" }}>State of Laws</h3>
        </div>


    </section>
    )
}