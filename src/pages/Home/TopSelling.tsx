import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import { useProductsQuery } from "../../redux/features/products/prouductManagement.api";
import { TProduct } from "../../types/product.type";
import Button from "../../components/ui/Button";

const TopSelling = () => {
  const { data } = useProductsQuery("");
  const soldData = data?.data?.filter(
    (sold: { sold: number }) => sold.sold > 0
  );

  return (
    <div className="px-3 md:px-14 my-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl">Top Selling Products</h1>
        <Link to="/products">
          <Button buttonName="See More"></Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {soldData
          ?.sort((a: { sold: number }, b: { sold: number }) => b.sold - a.sold)
          .slice(0, 5)
          .map((product: TProduct) => (
            <Card key={product._id} product={product}></Card>
          ))}
      </div>
    </div>
  );
};

export default TopSelling;
