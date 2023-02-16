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

  return childrenOrderOptions?.map((orderInfo, index) => {
    console.log("orderInfo", orderInfo)

    return (<div
      className="children_order_box"
      key={index}
      onClick={() => setIncardCategoryProduct(orderInfo)}>
      <div className="children_order_img">
        <img src={orderInfo.images} alt="" />
      </div>
      <div className="children_order_text_box">
        <div className="children_order_text" key={index}>
          <p>{orderInfo.price}</p>
          <p>{orderInfo.name}</p>
        </div>
      </div>
    </div>
    )
  })
}
