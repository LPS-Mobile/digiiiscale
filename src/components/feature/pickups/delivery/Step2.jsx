/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { getActivePickupsAction } from "../../../../actions/actions"
import { getToken } from "../../../../constants/constent"
import Loading from "../../../shared/Loading"
import Map from "./Map"

export default function Step2(props) {
    const { setStep, pickups, setPickups, pickup, setPickup } = props
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (getToken()) {
            getData()
        }
    }, [])

    const getData = () => {
        setLoading(true)
        getActivePickupsAction(({ data, error }) => {
            if (error) {
            } else {
                setPickups(data);
            }
            setLoading(false)
        });
    };

    return (<>
        <div className="detail_wrapper">
            <p>Tap set location to receive local orders ready for pick up</p>
            {loading ? <Loading /> : (pickups && pickups.length > 0 ? (pickups.map((e, i) => {
                return <Item i={i} key={i} e={e} setStep={setStep} pickup={pickup} setPickup={setPickup} />
            })) : <h4 className="text-white" style={{ textAlign: "center", paddingTop: 15 }}>No data Found</h4>)}
        </div>
        <Map />
    </>
    )
}

const Item = ({ i, e, setStep, pickup, setPickup }) => {
    const dis = e.dispensary || {}
    const customer = e.user || {}
    return <><div key={i} className="location_detail"
        onClick={() => {
            setPickup(e)
            setStep(3)
        }}>
        <div className="location_detail_wrapper" style={{ alignItems: "baseline", flexWrap: "nowrap", flexDirection: "column" }}>
            <div style={{ display: "flex", width: "100%", paddingLeft: 4, justifyContent: "center", paddingRight: 4 }}>
                <div>
                    <p className="text-primary"> <span><svg fill="green" height={16} width={16} xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" viewBox="0 0 31.955 31.955">
                        <g>
                            <path d="M27.25,4.655C20.996-1.571,10.88-1.546,4.656,4.706C-1.571,10.96-1.548,21.076,4.705,27.3   c6.256,6.226,16.374,6.203,22.597-0.051C33.526,20.995,33.505,10.878,27.25,4.655z" />
                            <path d="M13.288,23.896l-1.768,5.207c2.567,0.829,5.331,0.886,7.926,0.17l-0.665-5.416   C17.01,24.487,15.067,24.5,13.288,23.896z M8.12,13.122l-5.645-0.859c-0.741,2.666-0.666,5.514,0.225,8.143l5.491-1.375   C7.452,17.138,7.426,15.029,8.12,13.122z M28.763,11.333l-4.965,1.675c0.798,2.106,0.716,4.468-0.247,6.522l5.351,0.672   C29.827,17.319,29.78,14.193,28.763,11.333z M11.394,2.883l1.018,5.528c2.027-0.954,4.356-1.05,6.442-0.288l1.583-5.137   C17.523,1.94,14.328,1.906,11.394,2.883z" />
                            <circle cx="15.979" cy="15.977" r="6.117" />
                        </g>
                    </svg></span> Dispensary Details</p>
                    <p>{dis.name}</p>
                    <p>{dis?.street}{dis?.city && ","} {dis?.city}{dis?.state && ","} {dis?.state} {dis?.zip && "-"} {dis?.zip}</p>
                    {dis.phone && <p>ph: {dis.phone}</p>}
                </div>
            </div>

            <div style={{ marginTop: 8, display: "flex", width: "100%", justifyContent: "center", paddingLeft: 4, paddingRight: 4 }}>
                <div>
                    <p className="text-primary"> <span><svg fill="green" height={16} width={16} xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" viewBox="0 0 31.955 31.955">
                        <g>
                            <path d="M27.25,4.655C20.996-1.571,10.88-1.546,4.656,4.706C-1.571,10.96-1.548,21.076,4.705,27.3   c6.256,6.226,16.374,6.203,22.597-0.051C33.526,20.995,33.505,10.878,27.25,4.655z" />
                            <path d="M13.288,23.896l-1.768,5.207c2.567,0.829,5.331,0.886,7.926,0.17l-0.665-5.416   C17.01,24.487,15.067,24.5,13.288,23.896z M8.12,13.122l-5.645-0.859c-0.741,2.666-0.666,5.514,0.225,8.143l5.491-1.375   C7.452,17.138,7.426,15.029,8.12,13.122z M28.763,11.333l-4.965,1.675c0.798,2.106,0.716,4.468-0.247,6.522l5.351,0.672   C29.827,17.319,29.78,14.193,28.763,11.333z M11.394,2.883l1.018,5.528c2.027-0.954,4.356-1.05,6.442-0.288l1.583-5.137   C17.523,1.94,14.328,1.906,11.394,2.883z" />
                            <circle cx="15.979" cy="15.977" r="6.117" />
                        </g>
                    </svg></span> Customer Details</p>
                    <p>{customer.fullName}</p>
                    <p>{customer.street}</p>
                    {customer.phone && <p>Ph: {customer.phone}</p>}
                </div>
            </div>
        </div>
    </div>
    </>
}