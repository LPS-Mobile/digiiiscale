import axios from "axios"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../AppContext"
import ProductImages from "../components/feature/ProductImages"
import DriverTip from "../components/feature/thanks/DriverTip"
import ThankYou from "../components/feature/thanks/DriverTip"
import TipRate from "../components/feature/thanks/TipRate"
import Button from "../components/shared/Button"
import { getAuthorization, URLS } from "../constants/constent"
import minus from "../public/icons/minus.png";
import plus from "../public/icons/plus.png";

export default function Cart() {
    const { cart, setCart, profile } = useContext(AppContext)
    const [step, setStep] = useState(1)
    const [error, setError] = useState("")
    const [sending, setSending] = useState(false)
    const [orderId, setOrderId] = useState("")
    const Submit = () => {
        const values = { cart }
        values.userId = profile._id
        values.dispensaryId = "63e4bae785494c41f05bba46"
        values.name = "name"
        values.quantity = 2
        setSending(true)
        axios.post(`${URLS.API}orders`, values, getAuthorization).then((res) => {
            setSending(false)
            const data = res.data
            if (res.status === 201) {
                const item = {}
                item.userId = profile._id
                item.products = []
                setSending(true)
                axios.put(URLS.API + 'cart', item, getAuthorization).then((res) => {
                    if (res.status === 200) {
                    } else {
                        setError("Try Again")
                    }
                }).catch((e) => {
                    setError(e?.response?.data?.message || e?.response?.data?.error)
                    setSending(false)
                })
                setOrderId(data._id)
                setError('');
                setStep(2)
                setCart([])
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

    return (<>
        {step === 1 && <section className="digiscale_cart_data" error={error}>
            <div className="digiscale_header">
                <Button className="close_btn" style={{ color: "green", fontSize: 30 }}><Link to="/order" style={{ color: "green" }}>◁</Link></Button>
                <Button >
                    Self Destruct
                </Button>
                <Button>icon</Button>
                <Button>
                    <Link to="/self-destruct" className="logo-link">
                        Logo
                    </Link>
                </Button>
            </div>

            <div className="digiscale_cart_container">
                <div className="cart_wrapper">
                    {cart && cart.length > 0 ? (cart.map((e, i) => {
                        return <CartItem e={e._doc} i={i} setCart={setCart} />
                    })) : <h4 style={{ textAlign: "center" }} className="text-white">No Item in your cart</h4>}
                </div>
            </div>
            {cart && cart.length > 0 && <div className="order_price_detail_wrapper">
                <div className="order_price_detail">
                    <p>Item #: $50.00</p>
                    <p>Tax: $5.00</p>
                    <p>Delivery Fee: 8.00</p>
                </div>

                <div className="address_btn">
                    <button className="btn">Street Address</button>
                </div>
                <div className="order_total">Total: $63.00</div>
                <button className="btn-green" onClick={() => { Submit() }} disabled={sending}>{sending ? "Placing Order" : "PLACE ORDER"}</button>
            </div>}
            <ProductImages />
        </section>}
        {step === 2 && <DriverTip step={step} setStep={setStep} />}
        {step === 3 && <TipRate orderId={orderId} step={step} setStep={setStep} />}
        {step === 4 && <ThankYou step={step} setStep={setStep} />}
    </>)
}


const CartItem = ({ e, i, setCart }) => {
    const [qty, setQty] = useState(1)
    return <div className="cart_item" key={i}>
        <div className="remove_cart-btn"
            onClick={() => {
                setCart(arr => arr.filter(er => er._doc.name !== e.name))
            }}>
            <Button className="close_btn">X</Button>
        </div>
        <div className="cart_item_img">
            <img src={e?.images} alt="" />
        </div>
        <div className="cart_details">
            <p>{e.price}/-</p>
            <p>{e.name}</p>
        </div>
        <div className="cart_qty">
            {e.weight}
        </div>

        <div className="cart_btns">
            <Button className="cart_btn"
                onClick={() => {
                    if (qty !== 1) {
                        setQty(qty - 1)
                    }
                }}>
                <img src={minus} alt="" />
            </Button>
            {qty}
            <Button className="cart_btn"
                onClick={() => {
                    setQty(qty + 1)
                }}>
                <img src={plus} alt="" />
            </Button>
        </div>
    </div>
}