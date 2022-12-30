import Header from "./component/Header";
import { isAdmin, isLoggedIn } from "./services/Data";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Product from "./component/Product";
import Cart from "./component/Cart";
import Addproduct from "./component/Addproduct";
import Login from "./component/Login";
import Regis from "./component/Regis";
import EditProduct from "./component/EditProduct";
import Viewproduct from "./component/Viewproduct";
function ProtectRoute({ children }) {
  const auth = isLoggedIn();

  return auth ? children : <Navigate to="/" />;
}
function ProtectAdminRoute({ children }) {
  const auth = isLoggedIn();
  const adminauth = isAdmin();
  return auth && adminauth ? children : <Navigate to="/" />;
}
function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Routes>
          <Route path="" element={<Login />} />
          <Route path="regis" element={<Regis />} />
          <Route
            path="products"
            element={
              <ProtectRoute>
                <Product />
              </ProtectRoute>
            }
          />
          <Route
            path="viewproduct/:id"
            element={
              <ProtectRoute>
                <Viewproduct />
              </ProtectRoute>
            }
          />
          <Route
            path="cart"
            element={
              <ProtectRoute>
                <Cart />
              </ProtectRoute>
            }
          />
          <Route
            path="/addproduct"
            element={
              <ProtectAdminRoute>
                <Addproduct />
              </ProtectAdminRoute>
            }
          />
          <Route
            path="/editproduct/:id"
            element={
              <ProtectAdminRoute>
                <EditProduct />
              </ProtectAdminRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
