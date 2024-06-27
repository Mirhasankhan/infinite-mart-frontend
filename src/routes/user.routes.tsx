import MyOrders from "../pages/dashboard/userDashboard/watchList/MyOrders";
import MyWatchList from "../pages/dashboard/userDashboard/watchList/MyWatchList";
import UserDashboard from "../pages/dashboard/userDashboard/watchList/UserDashboard";

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard></UserDashboard>,
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
  {
    name: "Manage Profile",
    path: "manage-profile",
    element: "MyWatchList></MyWatchList>,",
  },
];
