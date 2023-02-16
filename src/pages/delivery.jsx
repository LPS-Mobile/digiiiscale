import { Link } from "react-router-dom";
import Map from "../components/feature/pickups/delivery/Map";
import Button from "../components/shared/Button";

export default function Delivery(props) {
    return (<div className="location_container">
        <div className="location_header">
            <Button className="close_btn" style={{ color: "green" }}>
                <Link to="/self-destruct">◁</Link></Button>
            <Button>Set Location</Button>

            <Button>
                <Link to="/self-destruct" className="logo-link">
                    Logo
                </Link>
            </Button>
        </div>

        <div className="digiscale_pickups">
            <div className="pickups_heading">
                <Link to="/pickups" className={`pickups_heading_item`}>
                    <div>Pickups</div>
                </Link>
                <Link to="/prev-pickups" className={`pickups_heading_item`} >
                    <div>Previous Pickups</div>
                </Link>
            </div>
            <Map />
        </div>
    </div>
    )
}