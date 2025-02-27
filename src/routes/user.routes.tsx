import ManageProfile from "../pages/dashboard/userDashboard/watchList/ManageProfile";
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
    name: "Chats",
    path: "chat",
    element: "Coming Soon!!!!",
  },
  {
    name: "Manage Profile",
    path: "manage-profile",
    element: <ManageProfile></ManageProfile>,
  },
];
