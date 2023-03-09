/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDispensaryDetailsAction, getProductDetailsAction } from "../../actions/actions";
import { AppContext } from "../../AppContext";
import Header from "../../components/feature/orderProvider/Header";
import ProductImages from "../../components/feature/ProductImages";
import Button from "../../components/shared/Button";
import Loading from "../../components/shared/Loading";
import { getAuthorization, URLS } from "../../constants/constent";
import { range } from "../../constants/helper";
import "./styles.scss";
import rating from "../../public/icons/rating.svg"
import CartModal from "../../components/feature/CartModal";

export default function ProductDetail() {
    const params = useParams()
    const navigate = useNavigate()

    const { cart, setCart, profile } = useContext(AppContext)
    const { dispendaryId, productId } = params
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const [dispensary, setDispensary] = useState(null)
    const [image, setImage] = useState(1)

    useEffect(() => {
        if (profile && !profile.isVerified) {
            navigate("/apply/code")
        }

    }, [profile])
    useEffect(() => {
        getDispensaryDetails(dispendaryId)
        getProduct(productId)

    }, [productId, dispendaryId])

    const getDispensaryDetails = () => {
        getDispensaryDetailsAction(({ data, error }) => {
            if (error) {
            } else {
                setDispensary(data)
            }
        }, dispendaryId);
    };

    const getProduct = () => {
        setLoading(true)
        getProductDetailsAction(({ data, error }) => {
            if (error) {
            } else {
                setProduct(data);
            }
            setLoading(false)
        }, productId);
    };



    const [selectedList, setSelectedList] = useState(null)

    const BUY_OPTIONS = [{ weight: 3.5, price: "50.00" }, { weight: .25, price: "75.00" }, { weight: .50, price: "150.00" }, { weight: 1.0, price: "300.00" }]
    return (<>
        <Header url={`/${dispendaryId}/products`} title={product?.name} />
        {loading ? <Loading /> : <section className="ordering_box">
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
            <div className="children_order">
                <div className="children_order_box" style={{ flexDirection: "column" }}>
                    <div className="order_item">
                        {(product && product.images && product.images.length > 0) && <div className="order_item_img">
                            {product.images.map((e, i) => {
                                return <img src={e} alt={product?.name} key={i} style={{ display: image === i + 1 ? "block" : "none" }} />
                            })}

                            <div className="order_item_img_btn">
                                <Button style={{ color: "green" }} onClick={() => {
                                    if (image > 1) {
                                        setImage(image - 1)
                                    }
                                }}>◁</Button>
                                <div>{image}/{product?.images?.length}</div>
                                <Button style={{ transform: "rotate(180deg)", color: "green" }} onClick={() => {
                                    if (product.images.length !== image) {
                                        setImage(image + 1)
                                    }
                                }}>◁</Button>
                            </div>
                        </div>}
                        <div className="order_item_detail">
                            <SelectList
                                profile={profile}
                                selectedList={selectedList}
                                setSelectedList={setSelectedList}
                                selectOptions={BUY_OPTIONS}
                                product={product}
                                productId={product?._id}
                                cart={cart}
                                setCart={setCart}
                                dispendaryId={dispendaryId}
                            />
                            <div>
                                <p style={{ color: "green" }}>{product?.price}$</p>
                                <p>{product?.name}</p>
                            </div>
                            <div>
                                <p>24% <span style={{ color: "green" }}>THC</span></p>
                                <p>HYBRID</p>
                            </div>
                        </div>
                    </div>
                    <div className="children_desc">
                        <p>{product.description}</p>
                        {product.flavor && <p>Flavor: {product.flavor}</p>}
                    </div>
                </div>
            </div>
            <ProductImages id={dispendaryId} />
        </section>}
    </>
    )
}


const SelectList = ({ selectOptions = [], product, cart, setCart, dispendaryId, profile }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [sending, setSending] = useState(false)
    const [error, setError] = useState("")
    const [openModal, setOpenModal] = useState(false)

    const addtoCart = (weight) => {
        const item = {}
        item.userId = profile._id
        item.product = product._id
        item.category = product.category
        item.dispensary = product.dispensary._id
        item.weight = weight
        item.quantity = 1
        item.type = product.type
        setSending(true)
        axios.post(URLS.API + 'cart', item, getAuthorization).then((res) => {
            setCart(arr => [...arr, item])
            if (res.status === 200) {
            } else {
                setError("Try Again")
            }
            setSending(false)
        }).catch((e) => {
            setError(e?.response?.data?.message || e?.response?.data?.error)
            setSending(false)
        })
    }


    return <>
        <CartModal show={openModal} onClose={() => { setOpenModal(false) }} />

        <div className="select_container"
            onClick={() => {
                if (cart.length > 0 && (cart[0].dispensary !== dispendaryId)) {
                    setOpenModal(true)
                } else {
                    setIsOpen(!isOpen)
                }
            }} error={error}>
            <p className="selected_text" style={{ background: "linear-gradient(180deg, rgb(0, 128, 0) 0%, rgba(98, 98, 98, 0.8) 100%)" }}>{sending ? "Adding" : "Add to cart"}</p>
            <div className="select_box" style={{ height: isOpen ? selectOptions.length * 38 : 0 }}>
                {selectOptions && selectOptions.map((item, index) => {
                    if (!item.weight) {
                        return ""
                    }
                    return <div key={index}
                        style={{
                            border: "1px solid transparent",
                            borderRadius: 8,
                            paddingLeft: 8,
                            paddingRight: 8,
                        }} className="select_item"
                        onClick={() => {
                            addtoCart(item.weight)
                        }}>
                        <p style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4 }}>
                            <span>{item.weight}</span>
                            <span>{item.price}$</span>
                        </p>
                    </div>
                })}
            </div>
        </div>
    </>
}