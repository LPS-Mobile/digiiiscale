/* eslint-disable array-callback-return */
import { useState } from "react";
import SelectList from "../../../../shared/Select";
import "./styles.scss";
import { getProductsAction } from "../../../../../actions/actions";
// import ChildrenOrderInfo from "../childrenOrderInfo";
import CartBoard from "../../../cartBoard";
import ChildrenOrder from "../childrenOrder";
import ProductDetail from "../../productDetail";
import { useProductContext } from "../../../../../hooks/useSelectedProduct";
import Loading from "../../../../shared/Loading";

export default function ParentOrder({ parentOrderOptions }) {
  // const [productId, setProductId] = useState(null)


  //   const { category } = useCategoryContext();

  //   const filterCategory = () => {
  //     if (!category?.selectCategoryID && parentOrderOptions) {
  //       return parentOrderOptions;
  //     } else {
  //       const filteredCategory = parentOrderOptions.filter((option) => {
  //         return option.categoryNameID === category?.selectCategoryID;
  //       });
  //       return filteredCategory;
  //     }
  //   };

  //   const filterProduct = () => {
  //     const childrenOrderData = parentOrderOptions.map((product) => {
  //       return product.childrenOrder;
  //     });

  //     return childrenOrderData?.filter((orderData) => {
  //       if (selectedList?.selectProductID === orderData.selectProductID) {
  //         return orderData?.childrenOrderData;
  //       } else if (selectedList?.selectProductID === "allProducts") {
  //         return orderData?.childrenOrderData;
  //       }
  //     });
  //   };
  //   console.log(loading)
  //   const showCategoryResult = () => {
  //     const category = filterCategory();
  //     const product = filterProduct();
  //     const isCheckCategory = category && typeof category === "object";
  //     if (!isCheckCategory) return;

  return <>{parentOrderOptions.map((option, index) => (
    <Product option={option} index={index} key={index} />
  ))}
  </>
};

const Product = ({ index, option }) => {
  const [selectedList, setSelectedList] = useState(null);
  const [isShowCartBoard, setIsShowCartBoard] = useState(false);
  const [isShowChildrenOrder, setIsShowChildrenOrder] = useState(false);
  const [isChildrenOrderInfo, setIsChildrenOrderInfo] = useState(false);
  const { product } = useProductContext();

  const [products, setProducts] = useState([])
  const [productLoading, setProductLoading] = useState(false)

  const getProducts = () => {
    setProductLoading(true)
    getProductsAction(({ data, error }) => {
      if (error) {
      } else {
        setProducts(data);
      }
      setProductLoading(false)
    });
  };
  return <>
    <div key={index} className="parent_order_box"
      onClick={() => {
        getProducts()
        setIsShowChildrenOrder(option)
      }}>
      <div className="parent_order_img">
        <img src={option.image} alt="" />
      </div>
      <div className="parent_order_info">
        <p>Street: {option.street}</p>
        <p>Phone: {option.phone}</p>
        <p>Rating: {option.rating}</p>
      </div>
    </div>
    {productLoading ? <Loading /> : (isShowChildrenOrder && !isChildrenOrderInfo ? (
      <div className="product_box">
        <SelectList
          selectOptions={products}
          selectedList={selectedList}
          setSelectedList={setSelectedList}
        />

        <ChildrenOrder
          childrenOrderOptions={products}
          setIsChildrenOrderInfo={setIsChildrenOrderInfo}
        />
      </div>
    ) : isChildrenOrderInfo && !isShowCartBoard ? (
      <ProductDetail setIsShowCartBoard={setIsShowCartBoard} product={product} />
    ) : (
      isShowCartBoard && <CartBoard />
    ))}
  </>
}