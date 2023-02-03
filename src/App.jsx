import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Digiscale from "./components/feature/digiscale";
import SelfDestruct from "./components/feature/selfDestruct";
import DigiscaleForm from "./components/feature/digiscaleForm";
import OrderProvider from "./components/feature/orderProvider";
import Layout from "./components/layout";

import "./App.scss";
import "./global.scss"
import Location from "./components/feature/location";
import Confirmation from "./components/feature/confirmation";
import Verification from "./components/feature/Verification";
import PickupRegistration from "./components/feature/pickupRegistration";
import Cart from "./components/feature/orderProvider/placeOrder/cart";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Digiscale />} />
          <Route path="/self-destruct" element={<SelfDestruct />} />
          <Route path="/set-location" element={<Location />} />
          <Route path="/digiscale-form" element={<DigiscaleForm />} />
          <Route path="/order" element={<OrderProvider />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/register-pickup" element={<PickupRegistration />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
