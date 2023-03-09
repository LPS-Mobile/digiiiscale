/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getCartAction } from "../actions/actions"
import { AppContext } from "../AppContext"
import ProductImages from "../components/feature/ProductImages"
import DriverTip from "../components/feature/thanks/DriverTip"
import ThankYou from "../components/feature/thanks/ThankYou"
import TipRate from "../components/feature/thanks/TipRate"
import AppLogo from "../components/shared/AppLogo"
import Button from "../components/shared/Button"
import Loading from "../components/shared/Loading"
import { getAuthorization, URLS } from "../constants/constent"
import { sumArray } from "../constants/helper"
import minus from "../public/icons/minus.png";
import plus from "../public/icons/plus.png";

export default function Cart() {
    const { profile, cart, setCart } = useContext(AppContext)
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [error, setError] = useState("")
    const [sending, setSending] = useState(false)
    const [orderId, setOrderId] = useState("")
    const [orderAmount, setOrderAmount] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (profile && !profile.isVerified) {
            navigate("/apply/code")
        }
    }, [profile])
    useEffect(() => {
        getCart()
    }, [])

    const getCart = () => {
        setLoading(true)
        getCartAction(({ data, error }) => {
            if (error) {
            } else {
                setLoading(false)
                setCart(data);

            }
        });
    }
    let products = cart?.map(e => {
        return { productName: e.product.name, productId: e.product._id, weight: e.weight, quantity: e.quantity, type: e.product.type, category: e.product.category, price: e.product.price }
    });
    let p = cart?.map((e) => { return e?.product?.price * (e.quantity || 1) })
    let totalPrice = sumArray(p)
    let finalAmount = (totalPrice + 5 + 8)

    const Submit = () => {
        const values = { products }
        values.user = profile._id
        values.name = "name"
        values.dispensary = cart[0].dispensary
        values.status = "new"
        values.price = finalAmount
        setSending(true)
        axios.post(`${URLS.API}orders`, values, getAuthorization).then((res) => {
            setSending(false)
            const data = res.data
            if (res.status === 201) {
                setSending(true)
                axios.delete(URLS.API + 'cart', getAuthorization).then((res) => {
                    if (res.status === 200) {
                        setCart([])
                    } else {
                        setError("Try Again")
                    }
                }).catch((e) => {
                    setError(e?.response?.data?.message || e?.response?.data?.error)
                })
                setOrderId(data._id)
                setOrderAmount(data.price)
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
                <Button className="close_btn" style={{ color: "green", fontSize: 30 }}><Link to="/dispensaries" style={{ color: "green" }}>◁</Link></Button>
                <Button >
                    Cart
                </Button>
                <AppLogo />
            </div>

            <div className="digiscale_cart_container">
                <div className="cart_wrapper">
                    {loading ? <Loading /> : (cart && cart.length > 0 ? (cart.map((e, i) => {
                        return <CartItem key={i} e={e} i={i} setCart={(arr) => {
                            setCart(arr)
                        }}
                            cart={cart} getCart={getCart} />
                    })) : <h4 style={{ textAlign: "center" }} className="text-white">No Item in your cart</h4>)}
                </div>
            </div>
            {cart && cart.length > 0 && <div className="order_price_detail_wrapper">
                <div className="order_price_detail">
                    <p>Item #: {totalPrice}$</p>
                    <p>Tax: 5.00$</p>
                    <p>Delivery Fee: 8.00$</p>
                </div>

                <div className="address_btn">
                    <button className="btn">Street Address</button>
                </div>
                <div className="order_total">Total: {finalAmount}$</div>
                <button className="btn-green" onClick={() => { Submit() }} disabled={sending}>{sending ? "Placing Order" : "PLACE ORDER"}</button>
            </div>}
            <ProductImages />
        </section>}
        {step === 2 && <DriverTip step={step} setStep={setStep} />}
        {step === 3 && <TipRate orderId={orderId} step={step} setStep={setStep} orderAmount={orderAmount} />}
        {step === 4 && <ThankYou step={step} setStep={setStep} />}
    </>)
}

const CartItem = ({ e, i, getCart, cart, setCart }) => {
    const product = e.product
    const [sending, setSending] = useState(false)

    const removeFromCart = () => {
        setSending(true)
        axios.delete(URLS.API + 'cart/' + e._id, getAuthorization).then((res) => {
            if (res.status === 200) {
                getCart()
            } else {
            }
            setSending(false)
        }).catch((e) => {
            console.log(e?.response?.data?.message || e?.response?.data?.error)
            setSending(false)
        })
    }


    return <div className="cart_item" key={i}>
        <div className="remove_cart-btn">
            <Button className="close_btn" disabled={sending} onClick={() => { removeFromCart() }}>X</Button>
        </div>
        <div className="cart_item_img">
            <img src={product?.images[0]} alt="" />
        </div>
        <div className="cart_details">
            <p>{product.price * e.quantity}$</p>
            <p>{product.name}</p>
        </div>

        <div className="cart_btns">
            <div className="cart_qty">
                {e.quantity}
            </div>
            <Button className="cart_btn"
                onClick={() => {
                    if (e.quantity !== 1) {
                        e.quantity = e.quantity - 1
                        cart[i] = e
                        setCart(cart)
                    }
                }}>
                <img src={minus} alt="" />
            </Button>
            <Button className="cart_btn"
                onClick={() => {
                    e.quantity = e.quantity + 1
                    cart[i] = e
                    setCart(cart)
                }}>
                <img src={plus} alt="" />
            </Button>
        </div>
    </div>
}