/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/shared/Button";
import { getToken, getUserAge } from "../../constants/constent";
import logo from "../../public/images/logo.png"

import "./styles.scss";

export default function Home() {
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const token = getToken()

    useEffect(() => {
        if (getUserAge() || token) {
            navigate("/self-destruct")
        }
    }, [token])

    const redirectPage = (age) => {
        navigate("register", { replace: true });
        localStorage.setItem("age", age)
        setError("")
    };

    return (
        <div className="digiscale_container">
            <p className="app_title">Digiscale</p>
            <div className="auth_logo">
                <Link to="/self-destruct" style={{ padding: 0 }}>
                    <img src={logo} alt="digiscale" height={80} width={80} style={{ height: 80, width: 80 }} />
                </Link>
            </div>
            <p className="age_title">I'm over 21</p>
            <div className="digiscale_btn">
                <Button children="Yes" onClick={() =>
                    redirectPage("yes")
                } />
                <Button children="No" onClick={() => {
                    setError("Not allowed")
                }} />
            </div>
            {error && <p className="error-data">{error}</p>}

        </div>
    );
}
