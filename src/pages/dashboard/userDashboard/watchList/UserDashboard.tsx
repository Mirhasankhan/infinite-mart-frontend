import LineChart from "../../../../components/chart/LineChart";
import { useCurrentUser } from "../../../../redux/features/auth/authSlice";
import { useCartsQuery } from "../../../../redux/features/cart/cartManagement.api";
import { usePurchasedProductsQuery } from "../../../../redux/features/purchase/purchase.api";
import { useWatchListQuery } from "../../../../redux/features/watchList/watchList.api";
import { useAppSelector } from "../../../../redux/hooks";
import {
  FiShoppingCart,
  FiHeart,
  FiPackage,
  FiTrendingUp,
  FiStar,
  FiGift,
} from "react-icons/fi";

const statCards = [
  {
    icon: <FiShoppingCart size={20} />,
    label: "Items in Cart",
    iconBg: "#dbeafe",
    iconColor: "#2563eb",
    accent: "#2563eb",
    lightBg: "#eff6ff",
  },
  {
    icon: <FiHeart size={20} />,
    label: "Wishlist Items",
    iconBg: "#fce7f3",
    iconColor: "#db2777",
    accent: "#db2777",
    lightBg: "#fdf2f8",
  },
  {
    icon: <FiPackage size={20} />,
    label: "Orders Placed",
    iconBg: "#d1fae5",
    iconColor: "#059669",
    accent: "#059669",
    lightBg: "#ecfdf5",
  },
];

const quickLinks = [
  { icon: <FiTrendingUp size={16} />, label: "Track Orders", color: "#7c3aed", bg: "#ede9fe" },
  { icon: <FiStar size={16} />,       label: "My Reviews",   color: "#d97706", bg: "#fef3c7" },
  { icon: <FiGift size={16} />,       label: "Offers",       color: "#db2777", bg: "#fce7f3" },
];

const UserDashboard = () => {
  const { email } = useAppSelector(useCurrentUser);
  const { data: cart }     = useCartsQuery(email);
  const { data: purchase } = usePurchasedProductsQuery(email);
  const { data: wishlist } = useWatchListQuery(email);

  const counts = [
    cart?.data?.length     ?? 0,
    wishlist?.data?.length ?? 0,
    purchase?.data?.length ?? 0,
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-xs text-gray-400 mt-0.5">Welcome back! Here's your overview.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        {statCards.map((card, i) => (
          <div
            key={i}
            className="rounded-2xl p-5 flex items-center gap-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
            style={{ backgroundColor: card.lightBg }}
          >
            {/* Icon */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: card.iconBg, color: card.iconColor }}
            >
              {card.icon}
            </div>
            {/* Text */}
            <div>
              <p
                className="text-3xl font-extrabold leading-none"
                style={{ color: card.accent }}
              >
                {counts[i]}
              </p>
              <p className="text-xs text-gray-500 mt-1 font-medium">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-sm font-bold text-gray-700 mb-3">Quick Actions</p>
        <div className="flex flex-wrap gap-3">
          {quickLinks.map((link, i) => (
            <button
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 hover:opacity-80 active:scale-95"
              style={{ backgroundColor: link.bg, color: link.color }}
            >
              {link.icon}
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      {/* <PieChart></PieChart> */}
      <LineChart />
    </div>
  );
};

export default UserDashboard;
