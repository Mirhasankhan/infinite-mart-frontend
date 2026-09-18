import { useCurrentUser } from "../../../../redux/features/auth/authSlice";
import { usePurchasedProductsQuery } from "../../../../redux/features/purchase/purchase.api";
import { useAppSelector } from "../../../../redux/hooks";
import { TProduct } from "../../../../types/product.type";
import { useState } from "react";
import Modal from "../../../../components/ui/Modal";
import { Link } from "react-router-dom";
import {
  FiPackage,
  FiArrowRight,
  FiStar,
  FiShoppingBag,
  FiClock,
  FiCheckCircle,
  FiTruck,
} from "react-icons/fi";

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string; icon: React.ReactNode }
> = {
  processing: {
    label: "Processing",
    color: "#d97706",
    bg: "#fef3c7",
    icon: <FiClock size={12} />,
  },
  shipped: {
    label: "Shipped",
    color: "#2563eb",
    bg: "#dbeafe",
    icon: <FiTruck size={12} />,
  },
  delivered: {
    label: "Delivered",
    color: "#16a34a",
    bg: "#dcfce7",
    icon: <FiCheckCircle size={12} />,
  },
};

const getStatusConfig = (status: string) =>
  statusConfig[status?.toLowerCase()] ?? {
    label: status ?? "Unknown",
    color: "#6b7280",
    bg: "#f3f4f6",
    icon: <FiPackage size={12} />,
  };

const MyOrders = () => {
  const { email } = useAppSelector(useCurrentUser);
  const { data } = usePurchasedProductsQuery(email);
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);

  const openModal = (product: TProduct) => {
    setSelectedProduct(product);
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    modal?.showModal();
  };

  const orderCount = data?.data?.length ?? 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
            style={{
              background: "linear-gradient(135deg, #874f6a 0%, #c27ba0 100%)",
            }}
          >
            <FiShoppingBag className="text-white text-lg" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">My Orders</h1>
            <p className="text-xs text-gray-400">
              {orderCount} {orderCount === 1 ? "order" : "orders"} placed
            </p>
          </div>
        </div>
        {orderCount > 0 && (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
            {orderCount} total
          </span>
        )}
      </div>

      {/* Content */}
      {orderCount > 0 ? (
        <div className="space-y-3">
          {data?.data.map((order: TProduct) => {
            const status = getStatusConfig(order.status);
            const isProcessing = order.status?.toLowerCase() === "processing";

            return (
              <div
                key={order._id}
                className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200"
              >
                {/* Product Image */}
                <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={order.image.imageUrl}
                    alt={order.productName}
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-1 group-hover:text-primary transition-colors">
                    {order.productName}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Sold by{" "}
                    <span className="text-gray-600 font-medium">
                      {order.seller}
                    </span>
                  </p>
                  {/* Price breakdown */}
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span
                      className="text-sm font-extrabold tracking-tight"
                      style={{
                        background:
                          "linear-gradient(135deg, #874f6a 0%, #c27ba0 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      ${order.price}
                    </span>
                    <span className="text-xs text-gray-400">
                      × {order.cartQuantity}
                    </span>
                    <span className="text-xs font-bold text-gray-700">
                      = ${order.totalCost}
                    </span>
                  </div>
                </div>

                {/* Right Section: Status + Action */}
                <div className="flex items-center gap-3 flex-shrink-0 self-end sm:self-center">
                  {/* Status Badge */}
                  <span
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      color: status.color,
                      backgroundColor: status.bg,
                    }}
                  >
                    {status.icon}
                    {status.label}
                  </span>

                  {/* Review Button */}
                  <button
                    onClick={() => !isProcessing && openModal(order)}
                    disabled={isProcessing}
                    title={
                      isProcessing ? "Available after delivery" : "Add Review"
                    }
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95"
                    style={
                      isProcessing
                        ? {
                            backgroundColor: "#f3f4f6",
                            color: "#9ca3af",
                            cursor: "not-allowed",
                          }
                        : {
                            background:
                              "linear-gradient(135deg, #874f6a 0%, #a8688c 100%)",
                            color: "#fff",
                            boxShadow: "0 3px 12px rgba(135,79,106,0.25)",
                          }
                    }
                  >
                    <FiStar className="text-sm" />
                    <span className="hidden sm:inline">Review</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 gap-5 text-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
              <FiPackage className="text-4xl text-gray-300" />
            </div>
            <div
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center shadow-md"
              style={{
                background: "linear-gradient(135deg, #874f6a 0%, #c27ba0 100%)",
              }}
            >
              <span className="text-white text-sm font-bold">0</span>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">No orders yet</h2>
            <p className="text-sm text-gray-400 mt-1">
              Start shopping and your orders will appear here.
            </p>
          </div>
          <Link to="/">
            <button
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 active:scale-95 hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #874f6a 0%, #a8688c 100%)",
                boxShadow: "0 4px 16px rgba(135,79,106,0.3)",
              }}
            >
              Browse Products
              <FiArrowRight className="text-sm" />
            </button>
          </Link>
        </div>
      )}

      {/* Review Modal */}
      <Modal selectedProduct={selectedProduct} />
    </div>
  );
};

export default MyOrders;
