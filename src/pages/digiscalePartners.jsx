import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { getDispensariesAction } from "../actions/actions";
import Button from "../components/shared/Button"
import Loading from "../components/shared/Loading";
import mainImage from "../public/images/blueDream.jpg"

export default function DigiscalePartners() {
    const [dispensaries, setDispensaries] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        getDispensaries()
    }, [])
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
            <Button>
                Digiscale Partners
            </Button>
            <Button>
                <Link to="/self-destruct" className="logo-link">
                    Logo
                </Link>
            </Button>
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