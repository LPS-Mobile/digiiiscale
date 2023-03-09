import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../AppContext"
import AppLogo from "../components/shared/AppLogo"
import Button from "../components/shared/Button"
import { getToken } from "../constants/constent"

export default function Settings(props) {
    const navigate = useNavigate()
    const { profile } = useContext(AppContext)
    return (<>
        <section className="digiscale_confirmation">
            <div className="digiscale_header">
                <Button className="close_btn" style={{ color: "green" }}><Link to="/self-destruct" style={{ color: "green" }}>◁</Link></Button>
                <Button style={{ backgroundColor: "green" }}>
                    Settings
                </Button>
                <AppLogo />
            </div>
            <div className="digiscale_confirmation_container">
                <div className="confirmation_heading">
                    {profile.isVerified ? <div
                        onClick={() => {
                            if (getToken()) {
                                navigate("/payment-info")
                            }
                        }}
                        className={`confirmation_heading_item`}>
                        Enter Payment Info
                    </div> : <div
                        onClick={() => {
                            if (getToken()) {
                                navigate("/apply/code")
                            }
                        }}
                        className={`confirmation_heading_item`} style={{ color: "green", fontSize: 16 }}>
                        Enter confirmation number to start Digiscale Delivery
                    </div>}

                    <div className={`confirmation_heading_item `}>
                        <div style={{ color: "green" }}>Settings</div>
                    </div>
                </div>
                <div className="business_space">
                    <div className="business_space_item">Business ad space</div>
                    <div className="business_space_item">Business ad space</div>
                    <div className="business_space_item">Business ad space</div>
                </div>
            </div>
        </section>
    </>
    )
}