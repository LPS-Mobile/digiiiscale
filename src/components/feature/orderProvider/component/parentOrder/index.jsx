import { useState } from "react";
import CartBoard from "../../../cartBoard";
import ChildrenOrder from "../childrenOrder";
import SelectList from "../../../../shared/Select";
import ChildrenOrderInfo from "../childrenOrderInfo";
import { PRODUCTS } from "../../../../../constants/rolling_options";
import { useCategoryContext } from "../../../../../hooks/useCategory";

import "./styles.scss";

export default function ParentOrder({ parentOrderOptions }) {
  const [selectedList, setSelectedList] = useState(null);
  const [isShowCartBoard, setIsShowCartBoard] = useState(false);
  const [isShowChildrenOrder, setIsShowChildrenOrder] = useState(false);
  const [isChildrenOrderInfo, setIsChildrenOrderInfo] = useState(false);

  const { category } = useCategoryContext();

  const filterCategory = () => {
    if (!category?.selectCategoryID && parentOrderOptions) {
      return parentOrderOptions;
    } else {
      const filteredCategory = parentOrderOptions.filter((option) => {
        return option.categoryNameID === category?.selectCategoryID;
      });
      return filteredCategory;
    }
  };

  const filterProduct = () => {
    const childrenOrderData = parentOrderOptions.map((product) => {
      return product.childrenOrder;
    });

    return childrenOrderData?.filter((orderData) => {
      if (selectedList?.selectProductID === orderData.selectProductID) {
        return orderData?.childrenOrderData;
      } else if (selectedList?.selectProductID === "allProducts") {
        return orderData?.childrenOrderData;
      }
    });
  };

  const showCategoryResult = () => {
    const category = filterCategory();
    const product = filterProduct();
    const isCheckCategory = category && typeof category === "object";
    if (!isCheckCategory) return;

    return category.map((option, index) => (
      <>
        <div
          key={index}
          className="parent_order_box"
          onClick={() => setIsShowChildrenOrder(option)}
        >
          <div className="parent_order_img">
            <img src={option.url} alt="" />
          </div>
          <div className="parent_order_info">
            <p>Street: {option.street}</p>
            <p>Phone: {option.phone}</p>
            <p>Rating: {option.rating}</p>
          </div>
        </div>
        {isShowChildrenOrder && !isChildrenOrderInfo ? (
          <div className="product_box">
            <SelectList
              selectOptions={PRODUCTS}
              setSelectedList={setSelectedList}
            />
            <ChildrenOrder
              childrenOrderOptions={product}
              setIsChildrenOrderInfo={setIsChildrenOrderInfo}
            />
          </div>
        ) : isChildrenOrderInfo && !isShowCartBoard ? (
          <ChildrenOrderInfo setIsShowCartBoard={setIsShowCartBoard} />
        ) : (
          isShowCartBoard && <CartBoard />
        )}
      </>
    ));
  };

  return <div className="parent_order_container">{showCategoryResult()}</div>;
}
