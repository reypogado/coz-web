import Menu from "./pages/Menu";
import { CartProvider } from "./state/cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartScreen from "./pages/Cart";
import ReportScreen from "./pages/Report";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/reports" element={<ReportScreen />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
