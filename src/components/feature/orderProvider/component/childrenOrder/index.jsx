import { useProductContext } from "../../../../../hooks/useSelectedProduct";

import "./styles.scss";

export default function ChildrenOrder({
  childrenOrderOptions,
  setIsChildrenOrderInfo,
}) {
  const { setProduct } = useProductContext();

  const setIncardCategoryProduct = (orderInfo) => {
    const orderId = orderInfo.id;
    setIsChildrenOrderInfo(true);
    setProduct({ orderInfo, orderId });
  };

  return childrenOrderOptions?.map((orderInfo, index) => (
    <div
      className="children_order_box"
      key={index}
      onClick={() => setIncardCategoryProduct(orderInfo)}
    >
      <div className="children_order_img">
        <img src={orderInfo.url} alt="" />
      </div>
      <div className="children_order_text_box">
        {orderInfo?.childrenOrderData?.map((info, index) => (
          <div className="children_order_text" key={index}>
            <p>{info.price}</p>
            <p>{info.text}</p>
          </div>
        ))}
      </div>
    </div>
  ));
}
