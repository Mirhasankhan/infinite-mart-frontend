import AddProduct from "../pages/dashboard/sellerDashboard/addProduct/AddProduct";
import SellerDashboard from "../pages/dashboard/sellerDashboard/dashboard/SellerDashboard";
import MyProducts from "../pages/dashboard/sellerDashboard/myProducts/MyProducts";
import ManageProfile from "../pages/dashboard/userDashboard/watchList/ManageProfile";

export const sellerPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <SellerDashboard></SellerDashboard>,
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
  {
    name: "Manage Profile",
    path: "manage-profile",
    element: <ManageProfile></ManageProfile>,
  },
];
