/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import Map from "../pickups/delivery/Map";

export default function MapModal({ show, onClose }) {
    const menuRef = useRef()
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
        <div className={`modal ${show ? "open" : ""}`} ref={menuRef}>
            <Map types={false} />
        </div>
    </section>)
}