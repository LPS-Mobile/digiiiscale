/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Digiscale from "./components/feature/digiscale";
import OrderProvider from "./components/feature/orderProvider";
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

function App() {
  const [profile, setProfile] = useState(null)
  const [cart, setCart] = useState([])

  const token = getToken()
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
      }
    }, token);
  }

  const getCart = () => {
    getCartAction(({ data, error }) => {
      if (error) {
      } else {
        setCart(data);
      }
    }, token);
  }

  const value = useMemo(
    () => ({ profile, setProfile, cart, setCart }),
    [profile, cart]
  );

  return (<AppContext.Provider value={value}>
    <Router>
      <Layout>
        <Routes>
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="/" element={<Digiscale />} />
          <Route path="/self-destruct" element={<SelfDestruct />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/apply/code" element={<ApplyCode />} />
          <Route path="/payment-info" element={<PaymentInfo />} />
          <Route path="/card-info" element={<CardInfo />} />

          <Route path="/digiscale-delivery" element={<Delivery />} />
          <Route path="/pickups" element={<Pickups />} />
          <Route path="/prev-pickups" element={<PreviousPickups />} />


          <Route path="/register" element={<DigiscaleForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order" element={<OrderProvider />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/digiscale-partners" element={<DigiscalePartners />} />
          <Route path="/state-of-laws" element={<StateOfLaws />} />
        </Routes>
      </Layout>
    </Router>
  </AppContext.Provider>
  );
}

export default App;
