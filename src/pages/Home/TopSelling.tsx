import Card from "../../components/ui/Card";
import { useProductsQuery } from "../../redux/features/products/prouductManagement.api";
import { TProduct } from "../../types/product.type";

const TopSelling = () => {
  const { data } = useProductsQuery("");
  const soldData = data?.data?.filter(
    (sold: { sold: number }) => sold.sold > 0
  );

  return (
    <div className="px-6 md:px-14 my-12">
      <h1 className="text-2xl font-medium pb-6">Top Selling Products</h1>
      <div className="grid grid-cols-5 gap-3">
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
