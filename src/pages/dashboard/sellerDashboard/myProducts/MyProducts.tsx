import { Button } from "antd";
import { useCurrentUser } from "../../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../../redux/hooks";
import { TProduct } from "../../../../types/product.type";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  useProductsQuery,
  useUpdateFlashMutation,
} from "../../../../redux/features/products/prouductManagement.api";

const MyProducts = () => {
  const { email } = useAppSelector(useCurrentUser);
  const { data } = useProductsQuery(email);
  const [addToFlash] = useUpdateFlashMutation();

  const handleAddToFlash = (_id: string) => {
    addToFlash({ _id, discountPercentage: 5 });
  };

  return (
    <div>
      <h1 className="text-xl font-medium">My Products</h1>
      <div>
        {data?.data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table mt-6">
              <thead className="bg-black text-white">
                <tr>
                  <th>Product Detail</th>
                  <th>Seller Detail</th>
                  <th>Available Quantity</th>
                  <th>Price</th>
                  <th>Sold</th>
                  <th>Category Detail</th>
                  <th>Actions</th>
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
                    <td>{order.quantity}</td>
                    <td>${order.price}</td>
                    <td>{order.sold || 0}</td>

                    <th>
                      <h1>
                        {order.category} &gt; {order.subCategory}
                      </h1>
                    </th>
                    <td>
                      {!order.flashSale ? (
                        <Button onClick={() => handleAddToFlash(order._id)}>
                          Add To Flash
                        </Button>
                      ) : (
                        <h1>Up for flash sale</h1>
                      )}
                    </td>
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

export default MyProducts;
