import Button from "../../../shared/Button"
import minus from "../../../../public/icons/minus.png";
import plus from "../../../../public/icons/plus.png";
import { Link } from "react-router-dom";
import ProductImages from "../../ProductImages";

export default function Cart() {
    const ITEMS = [{}]
    return (<section className="digiscale_cart_data">
        <div className="digiscale_header">
            <Button className="close_btn" style={{ color: "green", fontSize: 30 }}><Link to="/" style={{ color: "green" }}>◁</Link></Button>
            <Button >
                Self Destruct
            </Button>
            <Button>icon</Button>
            <Button>Logo</Button>
        </div>

        <div className="digiscale_cart_container">
            <div className="cart_wrapper">
                {ITEMS.map((e, i) => {
                    return <div className="cart_item" key={i}>
                        <div className="remove_cart-btn">
                            <Button className="close_btn">X</Button>
                        </div>
                        <div className="cart_item_img">
                            <img src="/static/media/fragments.e066f7de6d7fc229851f.jpg" alt="" />
                        </div>
                        <div className="cart_details">
                            <p>$$.$$</p>
                            <p>Product Name</p>
                        </div>
                        <div className="cart_qty">
                            3.5
                        </div>
                        <div className="cart_btns">
                            <Button
                                className="cart_btn">
                                <img src={minus} alt="" />
                            </Button>
                            <Button
                                className="cart_btn">
                                <img src={plus} alt="" />
                            </Button>
                        </div>
                    </div>
                })}

            </div>
        </div>
        <div className="order_price_detail_wrapper">
            <div className="order_price_detail">
                <p>Item #: $50.00</p>
                <p>Tax: $5.00</p>
                <p>Delivery Fee: 8.00</p>
            </div>

            <div className="address_btn">
                <button className="btn">Street Address</button>
            </div>
            <div className="order_total">Total: $63.00</div>

            <button className="btn-green">PLACE ORDER</button>
        </div>

        <ProductImages />
    </section>
    )
}