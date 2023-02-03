import Button from "../../../shared/Button";
import ProductImages from "../../ProductImages";
import "./styles.scss"
export default function BuyItem() {
    return (<section>
        <div className="order_item">
            <div className="order_item_img">
                <img src="/static/media/fragments.e066f7de6d7fc229851f.jpg" alt="" />

                <div className="order_item_img_btn">
                    <Button style={{ color: "green" }}>◁</Button>
                    <div>1/3</div>
                    <Button style={{ transform: "rotate(180deg)", color: "green" }}>◁</Button>
                </div>
            </div>
            <div className="order_item_detail">
                <div className="order_buy_btn"><Button >Buy</Button></div>
                <div>
                    <p style={{ color: "green" }}>$$.$$</p>
                    <p>Product Name</p>
                </div>
                <div>
                    <p>24% <span style={{ color: "green" }}>THC</span></p>
                    <p>HYBRID</p>
                </div>
            </div>
        </div>
        <ProductImages />
    </section>
    )
}