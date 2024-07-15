import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Sidenav1 from "./Component/sidenav";
import Overview from "./Component/Overview";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import AddProduct from "./Component/AddProduct";
import ProductView from "./Component/ProductView";
import Order from "./Component/Order";
import CouponComponent from "./Component/Coupon";

export default function App() {
  const location = useLocation();
  const excludeRoutes = ["/", "/Signup"];
  const shouldRenderSidenav = !excludeRoutes.includes(location.pathname);

  
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <>
      <div className="App">
        {shouldRenderSidenav && (
          <div className="sidenav-container">
            <Sidenav1 />
          </div>
        )}
        <main>
          <Routes>
            <Route path="/product" element={<AddProduct />} />
            {userData && (
              <>
                <Route path="/dashboard" element={<Overview />} />
                <Route path="/viewdetails" element={<ProductView />} />
                <Route path="/order" element={<Order />} />
                <Route path="/coupon" element={<CouponComponent />} />
              </>
            )}

            <Route path="/" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
          </Routes>
        </main>{" "}
      </div>
    </>
  );
}
