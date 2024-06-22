import MyOrders from "../pages/dashboard/userDashboard/watchList/MyOrders";
import MyWatchList from "../pages/dashboard/userDashboard/watchList/MyWatchList";

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: "daksdflsd dashboard",
  },
  {
    name: "My Cart",
    path: "cart",
    element: "cart",
  },
  {
    name: "My Orders",
    path: "my-orders",
    element: <MyOrders></MyOrders>,
  },
  {
    name: "My Wishlist",
    path: "my-wishlist",
    element: <MyWatchList></MyWatchList>,
  },
];
