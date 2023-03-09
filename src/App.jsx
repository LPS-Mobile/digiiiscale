/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";

import "./App.scss";
import "./global.scss"
import Login from "./pages/login";
import DigiscaleForm from "./pages/register";
import SelfDestruct from "./pages/selfDestruct";
import DigiscalePartners from "./pages/digiscalePartners";
import StateOfLaws from "./pages/stateOfLaws";
import { useEffect, useMemo, useState } from "react";
import { AppContext } from "./AppContext";
import { getToken } from "./constants/constent";
import { getCartAction, getProfileAction } from "./actions/actions";
import Verification from "./pages/verification";
import Apply from "./pages/apply";
import PaymentInfo from "./pages/paymentInfo";
import ApplyCode from "./pages/applyCode";
import CardInfo from "./pages/cardInfo";
import Settings from "./pages/settings";
import PageNotFound from "./pages/pageNotFound";
import Cart from "./pages/cart";
import PreviousPickups from "./pages/pickups/previousPickups";
import Delivery from "./pages/delivery";
import Pickups from "./pages/pickups/pickups";
import Dispensaries from "./pages/dispensaries/dispensaries";
import Products from "./pages/dispensaries/products";
import ProductDetail from "./pages/dispensaries/productDetail";
import Home from "./pages/home/Home";
import AvailableDeliveries from "./pages/pickups/availableDeliveries";
import Orders from "./pages/orders/orders";

function App() {
  const [profile, setProfile] = useState(null)
  const token = getToken()
  const [cart, setCart] = useState([])
  useEffect(() => {
    if (token) {
      getProfile()
      getCart()
    }
  }, [token])

  const getProfile = () => {
    getProfileAction(({ data, error }) => {
      if (error) {
      } else {
        setProfile(data);
        localStorage.setItem("id", data._id)
      }
    }, token);
  }

  const getCart = () => {
    getCartAction(({ data, error }) => {
      if (error) {
      } else {
        setCart(data);
      }
    });
  }
  const value = useMemo(
    () => ({
      profile, setProfile, cart, setCart: (arr) => {
        setCart(a => [...arr])
      }
    }),
    [profile, cart]
  );

  return (<AppContext.Provider value={value}>
    <Router>
      <Layout>
        <Routes>
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/self-destruct" element={<SelfDestruct />} />
          <Route path="/register" element={<DigiscaleForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/state-of-laws" element={<StateOfLaws />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/apply/code" element={<ApplyCode />} />
          <Route path="/payment-info" element={<PaymentInfo />} />
          <Route path="/card-info" element={<CardInfo />} />
          <Route path="/dispensaries" element={<Dispensaries />} />
          <Route path="/:id/products" element={<Products />} />
          <Route path="/:dispendaryId/product/:productId" element={<ProductDetail />} />
          <Route path="/digiscale-delivery" element={<Delivery />} />
          <Route path="/pickups" element={<Pickups />} />
          <Route path="/prev-pickups" element={<PreviousPickups />} />
          <Route path="/available-deliveries" element={<AvailableDeliveries />} />
          <Route path="/my-orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/digiscale-partners" element={<DigiscalePartners />} />
        </Routes>
      </Layout>
    </Router>
  </AppContext.Provider>
  );
}

export default App;
