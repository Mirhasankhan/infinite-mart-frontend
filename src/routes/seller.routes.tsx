import AddProduct from "../pages/dashboard/sellerDashboard/addProduct/AddProduct";
import MyProducts from "../pages/dashboard/sellerDashboard/myProducts/MyProducts";

export const sellerPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: "seller dashboard",
  },
  {
    name: "Add Product",
    path: "add-proudct",
    element: <AddProduct></AddProduct>,
  },
  {
    name: "My Proudcts",
    path: "my-products",
    element: <MyProducts></MyProducts>,
  },
];
