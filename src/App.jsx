import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Digiscale from "./components/feature/digiscale";
import DigiscaleForm from "./components/feature/digiscaleForm";
import Layout from "./components/layout";

import "./App.scss";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Digiscale />} />
          <Route path="/digiscale-form" element={<DigiscaleForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
