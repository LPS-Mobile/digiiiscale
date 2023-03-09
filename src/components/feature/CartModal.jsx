/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../AppContext";
import { getAuthorization, URLS } from "../../constants/constent";
import Button from "../shared/Button";

export default function CartModal({ show, onClose }) {
    const menuRef = useRef()
    const { setCart } = useContext(AppContext)
    const [sending, setSending] = useState(false)
    const clearCart = () => {
        setSending(true)
        axios.delete(URLS.API + 'cart', getAuthorization).then((res) => {
            if (res.status === 200) {
                setCart([])
                onClose()
            } else {
            }
            setSending(false)
        }).catch((e) => {
            console.log(e?.response?.data?.message || e?.response?.data?.error)
            setSending(false)

        })
    }

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                onClose()
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [])

    return (<section className={`modal-overlay`} style={{ zIndex: show ? 10 : -1 }}>
        <div className={`modal ${show ? "open" : ""}`} ref={menuRef} style={{ padding: 20 }}>
            <p style={{ textAlign: "center", color: "black" }}>Your cart have already some items.To order new items, Please empty your cart.</p>
            <div className="cart-modal-btn">
                <Button className="btn-red" disabled={sending} onClick={() => clearCart()}>{sending ? "Clearing" : "Clear Cart"}</Button>
                <Button className="btn-green" onClick={onClose}>Cancel</Button>
            </div>
        </div>
    </section>)
}