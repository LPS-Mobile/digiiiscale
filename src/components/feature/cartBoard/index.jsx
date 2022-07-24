import { useState } from "react";
import Button from "../../shared/Button";
import { useProductContext } from "../../../hooks/useSelectedProduct";

import "./styles.scss";

export default function CartBoard() {
  const [cartProduct, setCartProduct] = useState([]);

  const { product, setProduct } = useProductContext();

  const handleAddOrRemoveCart = (addOrRemove) => {
    if (addOrRemove === "add") {
      setCartProduct([...cartProduct, product.orderId]);
    } else {
      if (cartProduct.length === 0) return;
      setCartProduct(cartProduct.slice(0, -1));
    }
  };

  const getProduct = () => {
    const result = product?.orderInfo?.childrenOrderData?.filter((info) => {
      if (product.orderId === product.orderInfo.id) {
        return info;
      }
    });

    result?.pop();

    return result?.map((res, index) => (
      <div key={index}>
        <Button onClick={() => setProduct([])}>Delet</Button>
        <div>
          <div className="cart_board_image">
            <img src={product?.orderInfo.url} alt="" />
          </div>
          <div className="cart_board_text">
            <p>{res.text}</p>
            <p>Quantity: {cartProduct.length}</p>
            <p>{res.price}</p>
          </div>
        </div>
        <div>
          <Button onClick={() => handleAddOrRemoveCart("remove")}>-</Button>
          <Button onClick={() => handleAddOrRemoveCart("add")}>+</Button>
        </div>
      </div>
    ));
  };

  return (
    <div className="cart_board_container">
      <div className="cart_board_box">
        <h2>My Cart</h2>
        <div className="cart_board_detail">{getProduct()}</div>
      </div>
    </div>
  );
}
