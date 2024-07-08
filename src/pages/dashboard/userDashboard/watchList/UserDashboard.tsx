import bg1 from "../../../../assets/images/dash1.jpeg";
import bg2 from "../../../../assets/images/dash2.jpeg";
import bg3 from "../../../../assets/images/dash3.jpeg";
import LineChart from "../../../../components/chart/LineChart";
import { useCurrentUser } from "../../../../redux/features/auth/authSlice";
import { useCartsQuery } from "../../../../redux/features/cart/cartManagement.api";
import { usePurchasedProductsQuery } from "../../../../redux/features/purchase/purchase.api";
import { useWatchListQuery } from "../../../../redux/features/watchList/watchList.api";
import { useAppSelector } from "../../../../redux/hooks";

const UserDashboard = () => {
  const { email } = useAppSelector(useCurrentUser);
  const { data: cart } = useCartsQuery(email);
  const { data: purchase } = usePurchasedProductsQuery(email);
  const { data: wishlist } = useWatchListQuery(email);
  return (
    <div>
      <h1 className="text-xl font-medium mb-3">Dashboard</h1>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
        <div
          style={{ backgroundImage: `url(${bg1})` }}
          className="bg-cover bg-center rounded-md h-40 w-full text-white p-6"
        >
          <h1 className="text-3xl font-bold">{cart?.data.length} Product</h1>
          <p>in your cart</p>
        </div>
        <div
          style={{ backgroundImage: `url(${bg2})` }}
          className="bg-cover bg-center h-40 rounded-md w-full p-6 text-white"
        >
          <h1 className="text-3xl font-bold">
            {wishlist?.data.length} Product
          </h1>
          <p>in your wishlist</p>
        </div>
        <div
          style={{ backgroundImage: `url(${bg3})` }}
          className="bg-cover bg-center h-40 rounded-md w-full p-6 text-white"
        >
          <h1 className="text-3xl font-bold">
            {purchase?.data.length} Product
          </h1>
          <p>you ordered</p>
        </div>
      </div>
      {/* <PieChart></PieChart> */}
      <LineChart></LineChart>
    </div>
  );
};

export default UserDashboard;
