import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import Login from "./pages/Login";

// Seller
import SellerDashboard from "./pages/seller/SellerDashboard";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import DeliveryAgents from "./pages/admin/DeliveryAgents";

// Buyer
import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import CreateOrder from "./pages/buyer/CreateOrder";

// Auth
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '12px',
            background: '#1e293b',
            color: '#f8fafc',
            fontSize: '14px',
          },
        }}
      />
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Protected Seller Routes */}
        <Route element={<RequireAuth allowedRoles={["seller"]} />}>
          <Route path="/seller" element={<SellerDashboard />} />
          <Route path="/seller/add-product" element={<AddProduct />} />
          <Route path="/seller/products" element={<ProductList />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/delivery-agents" element={<DeliveryAgents />} />
        </Route>

        {/* Protected Buyer Routes */}
        <Route element={<RequireAuth allowedRoles={["buyer"]} />}>
          <Route path="/buyer" element={<BuyerDashboard />} />
          <Route path="/buyer/create-order" element={<CreateOrder />} />
        </Route>

        {/* 404 catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;