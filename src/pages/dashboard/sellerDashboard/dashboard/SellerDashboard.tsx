import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  XAxis,
  Tooltip,
  YAxis,
} from "recharts";
import { useCurrentUser } from "../../../../redux/features/auth/authSlice";
import { useProductsQuery } from "../../../../redux/features/products/prouductManagement.api";
import { useAppSelector } from "../../../../redux/hooks";
import { TProduct } from "../../../../types/product.type";
import PieChart from "../../../../components/chart/PieChart";

const SellerDashboard = () => {
  const { email } = useAppSelector(useCurrentUser);
  const { data } = useProductsQuery(email);

  const availableQuantity = data?.data.reduce(
    (acc: number, product: TProduct) => acc + product.quantity,
    0
  );
  const flashSale = data?.data.filter(
    (product: TProduct) => product.flashSale == true
  );
  const soldProducts = data?.data.filter(
    (product: TProduct) => product.sold > 0
  );

  const totalSold = soldProducts?.reduce(
    (acc: number, product: TProduct) => acc + product.sold,
    0
  );
  const soldAmount = soldProducts?.reduce(
    (acc: number, product: TProduct) => acc + product.sold * +product.price,
    0
  );
  console.log(soldAmount);

  const infos = [
    {
      name: "Total Product",
      product: data?.data?.length,
    },

    {
      name: "Already Sold",
      product: soldProducts?.length,
    },
    {
      name: "Flash Sale",
      product: flashSale?.length,
    },
    {
      name: "Unsold",
      product: data?.data?.length - soldProducts?.length,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">My Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-primary text-white">
          <h1 className=" text-2xl font-medium">{availableQuantity} Product</h1>
          <p>quantity available for sale</p>
        </div>
        <div className="p-4 rounded-lg bg-primary text-white">
          <h1 className=" text-2xl font-medium">{totalSold} Product</h1>
          <p>quantity already sold</p>
        </div>
        <div className="p-4 rounded-lg bg-primary text-white">
          <h1 className=" text-2xl font-medium">${soldAmount} amount</h1>
          <p>already sold</p>
        </div>
        <div className="p-4 rounded-lg bg-primary text-white">
          <h1 className=" text-2xl font-medium">13% discounrt</h1>
          <p>provided for flash sale</p>
        </div>
      </div>
      <h1 className="text-2xl font-medium py-4">Overview</h1>
      {data?.data?.length > 0 ? (
        <div className="w-[100%] col-span-3 flex gap-1">
          <BarChart
            width={550}
            height={420}
            data={infos}
            margin={{
              top: 5,
              right: 15,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* <Bar
            dataKey="pv"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          /> */}
            <Bar
              dataKey="product"
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
          <PieChart></PieChart>
        </div>
      ) : (
        <p className="text-xl font-semibold text-primary">
          No Product Added Yet
        </p>
      )}
    </div>
  );
};

export default SellerDashboard;
