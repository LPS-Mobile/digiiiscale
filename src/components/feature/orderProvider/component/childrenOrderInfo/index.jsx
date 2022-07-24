import Button from "../../../../shared/Button";
import { useProductContext } from "../../../../../hooks/useSelectedProduct";

import "./styles.scss";

export default function ChildrenOrderInfo({ setIsShowCartBoard }) {
  const { product } = useProductContext();

  return (
    <div className="children_order_box">
      <div className="children_order_image">
        <img src={product?.orderInfo.url} alt="" />
      </div>
      <div className="details">
        <Button onClick={() => setIsShowCartBoard(true)}>Add to Cart</Button>
        <div className="children_order_info">
          {product?.orderInfo?.childrenOrderData?.map((order, index) => (
            <div className="info_detail" key={index}>
              <p>{order.price}</p>
              <p>{order.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
