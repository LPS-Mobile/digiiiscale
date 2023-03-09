import { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../../shared/Button";
import SelectList from "../../shared/Select";
import cartImage from "../../../public/icons/cart.png";
import { ROLLING_OPTIONS } from "../../../constants/constArray";
import { AppContext } from "../../../AppContext";


export default function Header({ url = "/", title, setSelectedCat, selectedCat }) {
    const selectOptions = ROLLING_OPTIONS;
    const { cart } = useContext(AppContext)

    return <div className="order_provider_container">
        <div className="digiscale_header" style={{ padding: 0, marginBottom: 0 }}>
            <Button className="close_btn" style={{ color: "green" }}>
                <Link to={url} style={{ color: "green" }}>◁</Link></Button>
        </div>

        {title && <Button style={{ backgroundColor: "green" }}>
            {title || ""}
        </Button>}
        {!title && <SelectList
            selectOptions={selectOptions}
            selectedList={selectedCat}
            setSelectedList={setSelectedCat}
        />}
        <div className="card_box" style={{ position: "relative" }}>
            <Link to="/cart">
                <img src={cartImage} alt="" />
                {cart && cart.length > 0 && <div className="cart_icon">{cart.length}</div>}
            </Link>
        </div>
    </div>
}