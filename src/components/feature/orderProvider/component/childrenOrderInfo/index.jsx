import Button from "../../../../shared/Button";
import { useProductContext } from "../../../../../hooks/useSelectedProduct";

import "./styles.scss";
import { Link } from "react-router-dom";

export default function ChildrenOrderInfo({ setIsShowCartBoard }) {
  const { product } = useProductContext();
  return (
    <div className="children_order_box">
      <div className="children_order_image" style={{ marginTop: 35 }}>
        <img src={product?.orderInfo.images} alt="" />
      </div>
      <div className="details">
        <Button
        // onClick={() => setIsShowCartBoard(true)}
        ><Link to="/cart">Add to Cart</Link></Button>
        <div className="children_order_info">
          <div className="info_detail">
            <p>{product?.orderInfo.price}</p>
            <p>{product?.orderInfo.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
