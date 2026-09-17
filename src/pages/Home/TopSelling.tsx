import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import { useProductsQuery } from "../../redux/features/products/prouductManagement.api";
import { TProduct } from "../../types/product.type";
import Button from "../../components/ui/Button";
import { IoFlameOutline } from "react-icons/io5";

const TopSelling = () => {
  const { data, isLoading } = useProductsQuery("");
  const soldData = data?.data?.filter(
    (item: { sold: number }) => item.sold > 0
  );

  // Fallback to top products if sold count is 0 across mock data
  const displayProducts = (
    soldData && soldData.length > 0
      ? [...soldData].sort((a, b) => b.sold - a.sold)
      : data?.data || []
  ).slice(0, 4);

  return (
    <div className="px-3 md:px-14 2xl:px-60 my-10 md:my-14">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 md:mb-8 pb-4 border-b border-gray-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-50 text-amber-700 border border-amber-200/60 mb-2">
            <IoFlameOutline className="text-sm text-amber-600" />
            <span>Customer Favorites</span>
          </div>
          <h2 className="text-xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            Top Selling Products
          </h2>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Our most popular and highly rated essentials this month
          </p>
        </div>
        <Link to="/products" className="self-start sm:self-auto">
          <Button buttonName="View All" />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-80 rounded-2xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : displayProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayProducts.map((product: TProduct) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-2xl">
          <p className="text-sm text-gray-500">No products available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default TopSelling;

