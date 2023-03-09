/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getDispensariesAction } from "../../actions/actions";
import { AppContext } from "../../AppContext";
import Header from "../../components/feature/orderProvider/Header";
import MapModal from "../../components/feature/orderProvider/MapModal";
import Map from "../../components/feature/pickups/delivery/Map";
import Loading from "../../components/shared/Loading";
import { getToken } from "../../constants/constent";
import { range } from "../../constants/helper";
import rating from "../../public/icons/rating.svg"

export default function Dispensaries() {
    const { profile } = useContext(AppContext)
    const navigate = useNavigate()
    const [dispensaries, setDispensaries] = useState([])
    const [loading, setLoading] = useState(true)
    const [show, setShow] = useState(false)
    const token = getToken()

    useEffect(() => {
        if (profile && !profile.isVerified) {
            navigate("/apply/code")
        }
    }, [profile])

    useEffect(() => {
        if (token) {
            getDispensaries()
        }

    }, [token])
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

    return (<>
        <MapModal show={show} onClose={() => { setShow(false) }} />
        <Header url="/self-destruct" title="Dispensaries" />
        <div className="ordering_box" style={{ marginBottom: 150 }}>
            {loading ? <Loading /> :
                (dispensaries && dispensaries.length > 0 ?
                    (dispensaries.map((e, index) => {
                        return <Dispensary option={e} key={e._id} index={index} />
                    }))
                    : <h2 style={{ color: "white" }}>No Data</h2>)}

            <div className="dis_map" onClick={() => setShow(true)}>
                <div className="dis_map_conatiner">
                    <Map types={false} height_="100%" />
                    <p style={{ color: "white", fontSize: 12, textAlign: "center" }}>Tap Map to enlarge</p>
                </div>
            </div>
        </div>
    </>
    );
}

const Dispensary = ({ option, index }) => {
    const navigate = useNavigate()

    return <div key={index} className="parent_order_box"
        onClick={() => {
            navigate(`/${option._id}/products`)
        }}>
        <div className="parent_order_img">
            <img src={option.image} alt="" />
        </div>
        <div className="parent_order_info">
            <p>{option.name}</p>
            <p>Street: {option?.street}{option?.city && ","} {option?.city}{option?.state && ","} {option?.state} {option?.zip && "-"} {option?.zip}</p>
            <p>Phone: {option.phone}</p>
            <p>{range(option.rating).map((e, i) => {
                return (<img src={rating} alt={option.name} key={i} />)
            })}
            </p>
        </div>
    </div>
}
