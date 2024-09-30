import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Fashion from "./pages/Fashion";
import Jewelry from "./pages/Jewelry";
import Packaging from "./pages/Packaging";
import BulkOrders from "./pages/BulkOrders";
import HandmadeGifts from "./pages/HandmadeGifts";
import Women from "./pages/Women";
import Men from "./pages/Men";
import Children from "./pages/Children";

function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="py-8 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fashion" element={<Fashion />} />
            <Route path="/jewelry" element={<Jewelry />} />
            <Route path="/packaging" element={<Packaging />} />
            <Route path="/bulkorders" element={<BulkOrders />} />
            <Route path="/handmadegifts" element={<HandmadeGifts />} />
            <Route path="/women" element={<Women />} />
            <Route path="/men" element={<Men />} />
            <Route path="/children" element={<Children />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
