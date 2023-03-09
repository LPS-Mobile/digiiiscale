/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDispensaryDetailsAction, getProductsAction } from "../../actions/actions";
import { AppContext } from "../../AppContext";
import Header from "../../components/feature/orderProvider/Header";
import Loading from "../../components/shared/Loading";
import SelectList from "../../components/shared/Select";
import { PRODUCTS } from "../../constants/constArray";
import { getToken } from "../../constants/constent";
import { range } from "../../constants/helper";
import rating from "../../public/icons/rating.svg"
export default function Products() {
    const { profile } = useContext(AppContext)
    const navigate = useNavigate()
    const params = useParams()
    const { id } = params
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedList, setSelectedList] = useState(null)
    const [dispensary, setDispensary] = useState(null)
    const [selectedCat, setSelectedCat] = useState(null)
    const token = getToken()

    useEffect(() => {
        if (profile && !profile.isVerified) {
            navigate("/apply/code")
        }



    }, [profile])

    useEffect(() => {
        if (token) {
            getDispensaryDetails()
            getProduct(id)
        }
    }, [token, id])

    const getDispensaryDetails = () => {
        getDispensaryDetailsAction(({ data, error }) => {
            if (error) {
            } else {
                setDispensary(data)
            }
        }, id);
    };

    const getProduct = (id) => {
        getProductsAction(({ data, error }) => {
            if (error) {
            } else {
                setProducts(data);
            }
            setLoading(false)
        }, id);
    };

    let productData = products
    if (selectedList) {
        productData = products?.filter((e) => e.type === selectedList)
    } else if (selectedCat) {
        productData = products?.filter((e) => e.category === selectedCat)
    }

    return (<>
        <Header url="/dispensaries" selectedCat={selectedCat} setSelectedCat={setSelectedCat} />
        <section className="ordering_box">
            {loading ? <Loading /> : <>
                {dispensary ? <div className="parent_order_box" style={{ borderBottom: "2px solid gray", paddingBottom: 12 }}>
                    <div className="parent_order_img">
                        <img src={dispensary.image} alt="" />
                    </div>
                    <div className="parent_order_info">
                        <p>{dispensary.name}</p>
                        <p>{dispensary?.street}{dispensary?.city && ","} {dispensary?.city}{dispensary?.state && ","} {dispensary?.state} {dispensary?.zip && "-"} {dispensary?.zip}</p>
                        <p>{dispensary.phone}</p>
                        <p>Rating</p>
                        <p>{range(dispensary.rating).map((e, i) => {
                            return (<img src={rating} alt={dispensary.name} key={i} />)
                        })}
                        </p>
                    </div>
                </div> : ""}
                {products && products.length > 0 && <div style={{ width: "60%", marginLeft: "auto", paddingBottom: 20 }}>
                    <SelectList
                        selectOptions={PRODUCTS}
                        setSelectedList={setSelectedList}
                    />
                </div>}
                {productData && productData.length > 0 ? <div className="product_box" style={{ paddingTop: 0 }}>
                    {productData.map((e, index) => {
                        return <Product e={e} index={index} key={index} id={id} />
                    })}
                </div> : <h4 style={{ textAlign: "center" }} className="text-white">No Products</h4>}
            </>}
        </section>
    </>
    )
}


const Product = ({ e, index, id }) => {
    const navigate = useNavigate()
    let color = ""
    if (e.type === "Flower") {
        color = "green"
    } else if (e.type === "NonFlower") {
        color = "#e4bd01"
    } else if ("MiscellaniesProduct") {
        color = "gray"
    } else {
        return ""
    }
    return <div className="children_order" key={index} onClick={() => navigate(`/${id}/product/${e._id}`)}>
        <div className="children_order_box">
            <div className="children_order_img">
                <img src={e.images} alt={e.name} />
                <svg fill={color} height={13} width={13} xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" viewBox="0 0 31.955 31.955">
                    <g>
                        <path d="M27.25,4.655C20.996-1.571,10.88-1.546,4.656,4.706C-1.571,10.96-1.548,21.076,4.705,27.3   c6.256,6.226,16.374,6.203,22.597-0.051C33.526,20.995,33.505,10.878,27.25,4.655z" />
                        <path d="M13.288,23.896l-1.768,5.207c2.567,0.829,5.331,0.886,7.926,0.17l-0.665-5.416   C17.01,24.487,15.067,24.5,13.288,23.896z M8.12,13.122l-5.645-0.859c-0.741,2.666-0.666,5.514,0.225,8.143l5.491-1.375   C7.452,17.138,7.426,15.029,8.12,13.122z M28.763,11.333l-4.965,1.675c0.798,2.106,0.716,4.468-0.247,6.522l5.351,0.672   C29.827,17.319,29.78,14.193,28.763,11.333z M11.394,2.883l1.018,5.528c2.027-0.954,4.356-1.05,6.442-0.288l1.583-5.137   C17.523,1.94,14.328,1.906,11.394,2.883z" />
                        <circle cx="15.979" cy="15.977" r="6.117" />
                    </g>
                </svg>
            </div>
            <div className="children_order_text_box">
                <div className="children_order_text">
                    <p>{e.price}$</p>
                    <p>{e.name}</p>
                </div>
            </div>
            <div className="children_order_text_box">
                <div className="children_order_text">
                    <div>24% <span className="text-primary">THC</span></div>
                    <div>HYBRID</div>
                </div>
            </div>
        </div>
    </div>
}
