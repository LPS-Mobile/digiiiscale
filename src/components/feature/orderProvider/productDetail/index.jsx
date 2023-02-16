import axios from "axios";
import { useContext, useState } from "react";
import { AppContext } from "../../../../AppContext";
import { getAuthorization, URLS } from "../../../../constants/constent";
import Button from "../../../shared/Button";
// import ProductImages from "../../ProductImages";
import "./styles.scss";

export default function ProductDetail({ product }) {
    const [selectedList, setSelectedList] = useState(null)
    const { cart, setCart } = useContext(AppContext)
    // const [product, setProduct] = useState(null)
    // const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     getProduct(id)
    // }, [id])
    // const getProduct = (id) => {
    //     setLoading(true)
    //     getProductDetailsAction(({ data, error }) => {
    //         if (error) {
    //         } else {
    //             setProduct(data);
    //         }
    //         setLoading(false)
    //     }, id);
    // };
    const BUY_OPTIONS = [{ weight: 3.5, price: "$50.00" }, { weight: .25, price: "$75.00" }, { weight: .50, price: "$150.00" }, { weight: 1.0, price: "$300.00" }]

    return (<section>
        <div className="digiscale_pickups">
            {/* {loading ? <Loading /> : (!product ? "Something went wrong" : <> */}
            <div className="order_item">
                <div className="order_item_img">
                    <img src={product?.orderInfo?.images} alt={product?.orderInfo?.name} />

                    <div className="order_item_img_btn">
                        <Button style={{ color: "green" }}>◁</Button>
                        <div>1/3</div>
                        <Button style={{ transform: "rotate(180deg)", color: "green" }}>◁</Button>
                    </div>
                </div>
                <div className="order_item_detail">
                    <SelectList
                        selectedList={selectedList}
                        setSelectedList={setSelectedList}
                        selectOptions={BUY_OPTIONS}
                        product={product?.orderInfo}
                        productId={product?.orderInfo?._id}
                        cart={cart}
                        setCart={setCart}
                    />
                    {/* <div className="order_buy_btn"><Button><Link to="/cart">Buy</Link></Button></div> */}
                    <div>
                        <p style={{ color: "green" }}>{product?.orderInfo?.price}/-</p>
                        <p>{product?.orderInfo?.name}</p>
                    </div>
                    <div>
                        <p>24% <span style={{ color: "green" }}>THC</span></p>
                        <p>HYBRID</p>
                    </div>
                </div>
            </div>
            {/* {product && <ProductImages />} */}
            {/* </>)} */}
        </div>
    </section>
    )
}


const SelectList = ({ selectOptions = [], product, cart }) => {
    const { profile } = useContext(AppContext)
    const [isOpen, setIsOpen] = useState(false);
    const [sending, setSending] = useState(false)
    const [error, setError] = useState("")
    console.log(cart, product, sending, error)

    const addtoCart = () => {
        const item = {}
        item.userId = profile._id
        item.products = ["63e4bca7714cba2c804f8f8a", "63e4bcc0714cba2c804f8f92"]
        setSending(true)
        axios.put(URLS.API + 'cart', item, getAuthorization).then((res) => {
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


    return <div className="select_container" onClick={() => setIsOpen(!isOpen)}>
        <p className="selected_text" style={{ background: "linear-gradient(180deg, rgb(0, 128, 0) 0%, rgba(98, 98, 98, 0.8) 100%)" }}>Buy</p>  <div className="select_box" style={{ height: isOpen ? selectOptions.length * 38 : 0 }}>
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
                        addtoCart()
                    }}>
                    <p style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4 }}>
                        <span>{item.weight}</span>
                        <span>{item.price}</span>
                    </p>
                </div>
            })}
        </div>
    </div>
}