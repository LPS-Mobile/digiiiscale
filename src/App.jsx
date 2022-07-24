import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Digiscale from "./components/feature/digiscale";
import SelfDestruct from "./components/feature/selfDestruct";
import DigiscaleForm from "./components/feature/digiscaleForm";
import OrderProvider from "./components/feature/orderProvider";
import Layout from "./components/layout";

import "./App.scss";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Digiscale />} />
          <Route path="/self-destruct" element={<SelfDestruct />} />
          <Route path="/digiscale-form" element={<DigiscaleForm />} />
          <Route path="/order" element={<OrderProvider />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
