import { Button } from "antd";
import { useCurrentUser } from "../../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../../redux/hooks";
import { TProduct } from "../../../../types/product.type";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { Link } from "react-router-dom";
import moment from "moment";

import {
  useOrderedProductsQuery,
  useUpdatePurchaseStatusMutation,
} from "../../../../redux/features/purchase/purchase.api";

const ManageOrders = () => {
  const { email } = useAppSelector(useCurrentUser);
  const { data } = useOrderedProductsQuery(email);
  const [updateStatus] = useUpdatePurchaseStatusMutation();

  return (
    <div>
      <h1 className="text-xl font-medium">Manage Orders</h1>
      <div>
        {data?.data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table mt-6">
              <thead className="bg-cyan-500 text-white">
                <tr>
                  <th>Product Detail</th>
                  <th>Delivery Address</th>
                  <th>Order Date</th>
                  <th>Category Detail</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="bg-white">
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
                      <h1>
                        {order.address.city},{order.address.province},
                        {order.address.street}
                      </h1>
                    </td>
                    <th>
                      <h1>
                        {moment(order.date).format("MMMM Do YYYY, h:mm a")}
                      </h1>
                    </th>
                    <th>
                      <h1>
                        {order.category} &gt; {order.subCategory}
                      </h1>
                    </th>
                    <th>
                      <h1 className="bg-gray-100 rounded-md p-1 font-normal">
                        {order.status}
                      </h1>
                    </th>
                    <th>
                      <Button
                        onClick={() => updateStatus(order._id)}
                        className="bg-green-400 text-white font-medium"
                        disabled={order.status == "delivered"}
                      >
                        {order.status == "delivered"
                          ? "Delivered"
                          : "Confirm Delivery"}
                      </Button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white p-4 mt-4 border-t-4 border-blue-600 flex justify-between">
            <div className="flex items-center gap-2">
              <MdCheckBoxOutlineBlank className="text-blue-300 text-xl"></MdCheckBoxOutlineBlank>
              <h1>You have no order for proceed</h1>
            </div>
            <Link to={"/"}>
              <Button className="bg-green-400">Browse Products</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;
