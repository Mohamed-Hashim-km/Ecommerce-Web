import { Container } from "react-bootstrap";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./screens/Homepage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./registration/Login";
import RegisterScreen from "./registration/SignUp";
import Loader from "./components/Loader";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import CheckoutSteps from "./components/CheckoutSteps";
import PrivetRoutes from "./components/PrivetRoutes";
import PlaceOrderScreen from "./screens/PlaceOrder";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AdminRoutes from "./components/AdminRoutes";
import OrderListScreen from "./screens/Admin/OrderListScreen";
import ProductListScreen from "./screens/Admin/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import UserListScreen from "./screens/Admin/UserListScreen";
import UserEditScreen from "./screens/Admin/UserEditScreen";
import SearchBox from "./components/SearchBox";

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/sign" element={<RegisterScreen />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/page/:pageNumber" element={<Homepage />} />
            <Route path="/search/:keyword" element={<Homepage />} />
            <Route path="/search/:keyword/page/:pageNumber" element={<Homepage />} />
            <Route path="/productscreen/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            {/* privet routes */}
            <Route path="" element={<PrivetRoutes />}>
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
            </Route>
            {/* adminRoutes */}
            <Route path="" element={<AdminRoutes />}>
              <Route path="/admin/orderlist" element={<OrderListScreen />} />
              <Route path="/admin/productlist" element={<ProductListScreen />} />
              <Route path="/admin/userlist" element={<UserListScreen />} />
              <Route path="/admin/useredit/:id" element={<UserEditScreen />} />
            </Route>
            <Route path="/checkoutSteps" element={<CheckoutSteps />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/editproducts/:id" element={<ProductEditScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
