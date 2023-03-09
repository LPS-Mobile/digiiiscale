/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { getDispensariesAction } from "../actions/actions";
import { AppContext } from "../AppContext";
import AppLogo from "../components/shared/AppLogo";
import Button from "../components/shared/Button"
import Loading from "../components/shared/Loading";
import mainImage from "../public/images/blueDream.jpg"

export default function DigiscalePartners() {
    const { profile } = useContext(AppContext)
    const navigate = useNavigate()
    const [dispensaries, setDispensaries] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        if (profile && !profile.isVerified) {
            navigate("/apply/code")
        }
        getDispensaries()
    }, [profile])

    const getDispensaries = () => {
        setLoading(true)
        getDispensariesAction(({ data, error }) => {
            if (error) {
            } else {
                setDispensaries(data);
            }
            setLoading(false)
        });
    };


    return (<section className="location_container">
        <div className="digiscale_header">
            <Button className="close_btn" style={{ color: "green" }}><Link to="/self-destruct" style={{ color: "green" }}>◁</Link></Button>
            <div style={{ cursor: "pointer", color: "green", fontSize: "20px", fontWeight: 600 }}>
                Digiscale Partners
            </div>
            <AppLogo />
        </div>

        <div className="digiscale_pickups">
            <div className="dispensaries">
                {loading ? <Loading /> : (dispensaries && dispensaries.length > 0 ? dispensaries.map((e) => {
                    return <div className="dispensary">
                        <img src={e.image || mainImage} alt={e.name} />
                        <p>{e.name}</p>
                    </div>
                }) : "No Data Found")}
            </div>

        </div>
    </section>
    )
}