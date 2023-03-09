/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import Map from "../components/feature/pickups/delivery/Map";
import AppLogo from "../components/shared/AppLogo";
import Button from "../components/shared/Button";

export default function Delivery(props) {
    const { profile } = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (profile && !profile.isVerified) {
            navigate("/apply/code")
        }
    }, [profile])

    return (<div className="location_container">
        <div className="location_header">
            <Button className="close_btn" style={{ color: "green" }}>
                <Link to="/self-destruct">◁</Link></Button>
            <Button>Set Location</Button>
            <AppLogo />
        </div>

        <div className="digiscale_pickups">
            <div className="pickups_heading">
                <Link to="/available-deliveries" className={`pickups_heading_item`}>
                    <div>Available Deliveries</div>
                </Link>
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