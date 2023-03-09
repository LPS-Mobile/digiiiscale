/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getToken } from "../../constants/constent";
import "./styles.scss";

export default function Layout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!getToken() && (location.pathname !== "/" && location.pathname !== "/login" && location.pathname !== "/register" && location.pathname !== "/self-destruct")) {
      navigate("/self-destruct")
    }
  }, [])

  return <div className="layout_container">{children}</div>;
}
