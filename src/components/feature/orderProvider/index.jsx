import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SelectList from "../../shared/Select";
import Hamburger from "../../shared/hamburger";
import ParentOrder from "./component/parentOrder";
import { ROLLING_OPTIONS } from "../../../constants/rolling_options";
import { HAMBURGER_ITEMS } from "../../../constants/hamburger_items";
import { PARENT_ORDER_OPTIONS } from "../../../constants/parent_order_options";
import { useCategoryContext } from "../../../hooks/useCategory";
import cart from "../../../public/icons/cart.png";

import "./styles.scss";

export default function OrderProvider() {
  const [selectedList, setSelectedList] = useState(null);

  const { setCategory } = useCategoryContext();

  const selectOptions = ROLLING_OPTIONS;
  const parentOrderOptions = PARENT_ORDER_OPTIONS;

  const createHamburgerItems = () => {
    const items = HAMBURGER_ITEMS;
    if (!items) return;
    const ignoreFild = Object.values(items);
    const resultIgnore = ignoreFild.filter((fild) => {
      return fild.name !== "Kg";
    });

    return resultIgnore.map((item, index) => (
      <Link key={index} to={item.href}>
        {item.name}
      </Link>
    ));
  };

  useEffect(() => {
    setCategory(selectedList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedList]);

  return (
    <>
      <div className="order_provider_container">
        <Hamburger>{createHamburgerItems()}</Hamburger>
        <SelectList
          selectOptions={selectOptions}
          setSelectedList={setSelectedList}
        />
        <div className="card_box">
          <img src={cart} alt="" />
        </div>
      </div>
      <div className="ordering_box">
        <ParentOrder parentOrderOptions={parentOrderOptions} />
      </div>
    </>
  );
}
