import { useState, useEffect, useContext } from "react";
import SelectList from "../../shared/Select";
import ParentOrder from "./component/parentOrder";
import { ROLLING_OPTIONS, } from "../../../constants/constArray";
import { useCategoryContext } from "../../../hooks/useCategory";
import cartImage from "../../../public/icons/cart.png";

import "./styles.scss";
import { getDispensariesAction } from "../../../actions/actions";
import Button from "../../shared/Button";
import { Link } from "react-router-dom";
import Loading from "../../shared/Loading";
import { AppContext } from "../../../AppContext";

export default function OrderProvider() {
  const { cart } = useContext(AppContext)
  const [selectedList, setSelectedList] = useState(null);
  const [dispensaries, setDispensaries] = useState([])
  const [loading, setLoading] = useState(true)
  const { setCategory } = useCategoryContext();


  useEffect(() => {
    getDispensaries()
  }, [])
  const getDispensaries = () => {
    setLoading(true)
    getDispensariesAction(({ data, error }) => {
      if (error) {
      } else {
        setDispensaries(data);
      }
      setLoading(false)
    });
  };

  const selectOptions = ROLLING_OPTIONS;
  const parentOrderOptions = dispensaries;
  useEffect(() => {
    setCategory(selectedList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedList]);

  return (
    <>
      <div className="order_provider_container">
        <div className="digiscale_header" style={{ padding: 0 }}>
          <Button className="close_btn" style={{ color: "green" }}><Link to="/self-destruct" style={{ color: "green" }}>◁</Link></Button>
        </div>
        <SelectList
          selectOptions={selectOptions}
          setSelectedList={setSelectedList}
        />
        <div className="card_box" style={{ position: "relative" }}>
          <Link to="/cart">
            <img src={cartImage} alt="" />
            {cart && cart.length > 0 && <div className="cart_icon">{cart.length}</div>}
          </Link>
        </div>
      </div>
      <div className="ordering_box">
        {loading ? <Loading /> :
          (parentOrderOptions && parentOrderOptions.length > 0 ? <ParentOrder parentOrderOptions={parentOrderOptions} /> : <h2 style={{ color: "white" }}>No Data</h2>)}
      </div>
    </>
  );
}
