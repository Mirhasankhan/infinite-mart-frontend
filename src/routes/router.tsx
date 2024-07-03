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
import DashboardLayout from "../components/layout/DashboardLayout";
import { routeGenerator } from "../utils/routeGenerator";
import { userPaths } from "./user.routes";
import { sellerPaths } from "./seller.routes";
import ProceedPayment from "../pages/payment/ProceedPayment";
import Categories from "../pages/Home/Categories/Categories";
import UserRoutes from "./UserRoutes";
import SellerRoutes from "./SellerRoute";
import ContactUs from "../pages/contactUS/ContactUs";

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
      {
        path: "register-seller",
        element: <SellerRegister></SellerRegister>,
      },
      {
        path: "contact-us",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "about-us",
        element: <About></About>,
      },
      {
        path: "/user",
        element: (
          <UserRoutes>
            <DashboardLayout></DashboardLayout>
          </UserRoutes>
        ),
        children: routeGenerator(userPaths),
      },
      {
        path: "/seller",
        element: (
          <SellerRoutes>
            <DashboardLayout></DashboardLayout>
          </SellerRoutes>
        ),
        children: routeGenerator(sellerPaths),
      },
    ],
  },
]);

export default router;
