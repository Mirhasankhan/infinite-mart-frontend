import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import About from "../pages/about/About";
import FlashSale from "../pages/flash-sale/FlashSale";
import Cart from "../pages/cart/Cart";
import Products from "../pages/products/Products";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import ProductDetails from "../pages/products/ProductDetails";
import SellerRegister from "../pages/seller-registraton/SellerRegister";
import SellerLayout from "../components/layout/SellerLayout";
import DashboardLayout from "../components/layout/DashboardLayout";
import { routeGenerator } from "../utils/routeGenerator";
import { userPaths } from "./user.routes";
import { sellerPaths } from "./seller.routes";
import ProceedPayment from "../pages/payment/ProceedPayment";
import Categories from "../pages/Home/Categories/Categories";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/flash-sale",
        element: <FlashSale></FlashSale>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/products",
        element: <Products></Products>,
      },
      {
        path: "/products/:id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "/checkout",
        element: <ProceedPayment></ProceedPayment>,
      },
      {
        path: "/categories",
        element: <Categories></Categories>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "/seller",
    element: <SellerLayout></SellerLayout>,
    children: [
      {
        path: "register-seller",
        element: <SellerRegister></SellerRegister>,
      },
    ],
  },
  {
    path: "/user",
    element: <DashboardLayout></DashboardLayout>,
    children: routeGenerator(userPaths),
  },
  {
    path: "/seller",
    element: <DashboardLayout></DashboardLayout>,
    children: routeGenerator(sellerPaths),
  },
]);

export default router;
