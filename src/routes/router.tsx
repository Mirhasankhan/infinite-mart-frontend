import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import About from "../pages/about/About";
import FlashSale from "../pages/flash-sale/FlashSale";
import Cart from "../pages/cart/Cart";
import Products from "../pages/products/Products";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";

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
        path: "/checkout",
        element: "checkout",
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
]);

export default router;
