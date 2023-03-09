/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getNewPickupsAction } from "../../actions/actions";
import { AppContext } from "../../AppContext";
import Map from "../../components/feature/pickups/delivery/Map";
import AppLogo from "../../components/shared/AppLogo";
import Button from "../../components/shared/Button";
import Loading from "../../components/shared/Loading";
import { getAuthorization, URLS } from "../../constants/constent";
import { convertDate } from "../../constants/helper";

export default function AvailableDeliveries() {
    const { profile } = useContext(AppContext)
    const navigate = useNavigate()
    const [pickups, setPickups] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (profile && !profile.isVerified) {
            navigate("/apply/code")
        }
        getData()
    }, [profile])

    const getData = () => {
        setLoading(true)
        getNewPickupsAction(({ data, error }) => {
            if (error) {
            } else {
                setPickups(data);
            }
            setLoading(false)
        });
    };

    return (<div className="location_container">
        <div className="location_header">
            <Button className="close_btn" style={{ color: "green" }}>
                <Link to="/digiscale-delivery">◁</Link></Button>
            <Button>Assigned deliveries</Button>

            <AppLogo />
        </div>

        <div className="digiscale_pickups">
            <div className="previous_pickups detail_wrapper ">
                <p>Assigned deliveries are refreshed every 24 hours</p>
                {loading ? <Loading /> : (pickups && pickups.length > 0 ? (pickups.map((e, i) => {
                    return <Item key={i} e={e} i={i} getData={() => getData()} />
                })) : <h4 className="text-white" style={{ textAlign: "center" }}>No Data Found</h4>)}
            </div>
            <Map />
        </div>
    </div>)
}


const Item = ({ i, e, getData }) => {
    const [sending, setSending] = useState(false)
    const [error, setError] = useState("")
    const update = () => {
        setSending(true)
        axios.post(`${URLS.API}pickups/${e._id}/accept`, "", getAuthorization).then((res) => {
            setSending(false)
            const data = res.data
            if (res.status === 201) {
                setError('');
                getData()
            } else {
                window.scrollTo(0, 0)
                setError(`${data}`)

            }
            setSending(false)
        }).catch((e) => {
            window.scrollTo(0, 0)
            setError("Try again")
            setSending(false)
        })
    }
    return <div key={i} className="location_detail" error={error}>
        <div className="location_detail_wrapper">
            <span style={{ display: "flex" }}><svg fill="green" height={16} width={16} xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" viewBox="0 0 31.955 31.955">
                <g>
                    <path d="M27.25,4.655C20.996-1.571,10.88-1.546,4.656,4.706C-1.571,10.96-1.548,21.076,4.705,27.3   c6.256,6.226,16.374,6.203,22.597-0.051C33.526,20.995,33.505,10.878,27.25,4.655z" />
                    <path d="M13.288,23.896l-1.768,5.207c2.567,0.829,5.331,0.886,7.926,0.17l-0.665-5.416   C17.01,24.487,15.067,24.5,13.288,23.896z M8.12,13.122l-5.645-0.859c-0.741,2.666-0.666,5.514,0.225,8.143l5.491-1.375   C7.452,17.138,7.426,15.029,8.12,13.122z M28.763,11.333l-4.965,1.675c0.798,2.106,0.716,4.468-0.247,6.522l5.351,0.672   C29.827,17.319,29.78,14.193,28.763,11.333z M11.394,2.883l1.018,5.528c2.027-0.954,4.356-1.05,6.442-0.288l1.583-5.137   C17.523,1.94,14.328,1.906,11.394,2.883z" />
                    <circle cx="15.979" cy="15.977" r="6.117" />
                </g>
            </svg>
            </span>
            <div style={{ paddingLeft: 4 }}>
                #{e.orderNumber}
            </div>
        </div>

        <div className="order_detail">
            <div>
                <p>Picked From: {e?.dispensary?.street}{e?.dispensary?.city && ","} {e?.dispensary?.city}{e?.dispensary?.state && ","} {e?.dispensary?.state} {e?.dispensary?.ip && "-"} {e?.dispensary?.zip}</p>
                <p>Delivered to: {e?.user?.fullName}</p>
            </div>
            <div className="order_btn">
                <div className="deliver_btn">
                    <Button disabled={sending} onClick={() => { update() }}>{sending ? "Accepting" : "Accept Order"}</Button>
                </div>
            </div>
        </div>
        <div className="pickup_date">{convertDate(e?.date)}</div>
    </div>
}