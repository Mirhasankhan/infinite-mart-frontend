import { Button } from "antd";
import { useCurrentUser } from "../../../../redux/features/auth/authSlice";
import { usePurchasedProductsQuery } from "../../../../redux/features/purchase/purchase.api";
import { useAppSelector } from "../../../../redux/hooks";
import { TProduct } from "../../../../types/product.type";
import { useState } from "react";
import Modal from "../../../../components/ui/Modal";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { email } = useAppSelector(useCurrentUser);
  const { data } = usePurchasedProductsQuery(email);
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);

  const openModal = (product: TProduct) => {
    setSelectedProduct(product);
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    modal?.showModal();
  };

  return (
    <div>
      <h1 className="text-xl font-medium">My Orders</h1>
      <div>
        {data?.data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table mt-6">
              <thead className="bg-primary text-white">
                <tr>
                  <th>Product Detail</th>
                  <th>Seller Detail</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total Cost</th>
                  <th>Status</th>
                  <th>Add Review</th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map((order: TProduct) => (
                  <tr key={order._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={order.image.imageUrl}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{order.productName}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {order.email}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        {order.seller}
                      </span>
                    </td>
                    <td>{order.cartQuantity}</td>
                    <td>${order.price}</td>
                    <td>${order.totalCost}</td>
                    <th>
                      <h1 className="bg-gray-200 rounded-md p-1 font-normal">
                        {order.status}
                      </h1>
                    </th>
                    <th>
                      <Button
                        className="bg-primary text-white"
                        onClick={() => openModal(order)}
                        disabled={order.status == "processing"}
                      >
                        Review
                      </Button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
            <Modal selectedProduct={selectedProduct}></Modal>
          </div>
        ) : (
          <div className="bg-white p-4 mt-4 border-t-4 border-blue-600 flex justify-between">
            <div className="flex items-center gap-2">
              <MdCheckBoxOutlineBlank className="text-blue-300 text-xl"></MdCheckBoxOutlineBlank>
              <h1>You have no order for proceed</h1>
            </div>
            <Link to={"/"}>
              <Button className="bg-primary">Browse Products</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
